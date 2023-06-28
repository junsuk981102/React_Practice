import React, { FC, useState, ChangeEvent, useEffect } from "react";

import { saleGovernanceTokenContract, web3 } from "../web3Config";
import GovernanceCard from "./GovernanceCard";

export interface IMyGovernanceCard {
  GNT_Id: string;
  GNT_name: string;
  GNT_Initial_Price: string;
  GNT_Sale_Price: string;
  GNT_Address: string;
}

interface MyGovernanceCardProps extends IMyGovernanceCard {
  saleStatus: boolean;
  account: string;
}

const MyGovernanceCard: FC<MyGovernanceCardProps> = ({
  GNT_Id,
  GNT_name,
  GNT_Initial_Price,
  GNT_Sale_Price,
  GNT_Address,
  saleStatus,
  account,
}) => {
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myGovernanceSalePrice, setMyGovernanceSalePrice] = useState<string>(GNT_Sale_Price);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;

      const response = await saleGovernanceTokenContract.methods
        .setForSaleGovernanceToken(
          GNT_Id,
          web3.utils.toWei(sellPrice, "ether")
        )
        .send({ from: account });

      if (response.status) {
        setMyGovernanceSalePrice(web3.utils.toWei(sellPrice, "ether"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "300px",
          height: "270px",
          backgroundColor: "white",
          border: "3px solid #00A29D",
          padding: "10px",
          margin: "10px",
          alignItems: "center",
          display: "flex",
          position: "relative",
          borderRadius: "15px",
          fontSize: "15px",
          fontWeight: "bold" // 상위 요소를 기준으로 배치
        }}
      >
        <img
          src='../image/ticketicon.png' // 이미지 파일 경로
          alt="Ticket Icon"
          style={{
            position: "absolute", // 상위 요소 내에서 위치를 조정
            top: 10,
            left : 100,
            width: "100px", // 이미지 너비 조정
            height: "100px", // 이미지 높이 조정
          }}
        />
        <div style={{ marginTop: 20,top:120,position: "absolute"}}>
        <h3>NFT 이름 : <GovernanceCard GNT_name={GNT_name} /></h3>
          {saleStatus ? (
            myGovernanceSalePrice === "0" ? (
              // 판매가능&판매이전
              <>
                <h3>NFT ID : {GNT_Id}</h3>
                <h3>초기 가격 : {GNT_Initial_Price} ETH</h3>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={onChangeSellPrice}
                  placeholder="판매가격을 입력하세요."
                  style={{
                    width: "160px",
                    fontSize: "15px",
                    textAlign: "center",
                    backgroundColor: "#E5F2F2",
                    color: "black",
                    borderBottom: "3px solid #00A29D",
                  }}
                />
                <span> ETH</span>
                <button
                  style={{
                    width: "auto",
                    height: "auto",
                    fontSize: "10px",
                    fontWeight: "bold",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "5px 5px",
                    borderRadius: "10px",
                    marginLeft: "10px",
                  }}
                  onClick={onClickSell}
                >
                  판매 등록
                </button>
              </>
            ) : (
              // 판매가능&판매이후
              <>
                <p>NFT ID : {GNT_Id}</p>
                <p>초기가격 : {web3.utils.fromWei(GNT_Initial_Price)} ETH</p>
                <p>판매가격 : {web3.utils.fromWei(myGovernanceSalePrice)} ETH</p>
              </>
            )
          ) : myGovernanceSalePrice === "0" ? (
            // 판매불가&판매이전
            <>
              <p>NFT ID : {GNT_Id}</p>
              <p>초기 가격 : {GNT_Initial_Price} ETH</p>
            </>
          ) : (
            // 판매불가&판매이후
            <>
              <p>NFT ID : {GNT_Id}</p>
              <p>초기가격 : {web3.utils.fromWei(GNT_Initial_Price)} ETH</p>
              <p>판매가격 : {web3.utils.fromWei(myGovernanceSalePrice)} ETH</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGovernanceCard;