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
      <GovernanceCard GNT_name={GNT_name} />
      <div style={{ marginTop: 2 }}>
        {saleStatus ? (
          myGovernanceSalePrice === "0" ? (
            // 판매가능&판매이전
            <>
              <p>NFT ID : {GNT_Id}</p>
              <p>초기 가격 : {GNT_Initial_Price} ETH</p>
              <input type="number" value={sellPrice} onChange={onChangeSellPrice} placeholder="판매가격을 입력하세요.(단위:ETH)" style={{
                width: '153px',
                fontSize: '10px',
                backgroundColor: '#E5F2F2',
                color: 'white',
                borderBottom: "3px solid #00A29D",
              }} />
              <span> ETH</span>
              <button style={{
                width: 'auto',
                height: 'auto',
                fontSize: '10px',
                fontWeight: 'bold',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                padding: '5px 5px',
                borderRadius: '10px',
                marginLeft: '10px' }} onClick={onClickSell}>
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
        ) : (
          myGovernanceSalePrice === "0" ? (
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
          )
        )}
      </div>
    </div>
  );
};

export default MyGovernanceCard;