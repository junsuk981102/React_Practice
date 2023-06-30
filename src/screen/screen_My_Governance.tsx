import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  mintGovernanceTokenContract,
  saleGovernanceTokenAddress,
} from "../web3Config";
import MyGovernanceCard, {
  IMyGovernanceCard,
} from "../components/MyGovernanceCard";

interface MyGovernanceProps {
  account: string;
}

const ScreenMyGovernance: FC<MyGovernanceProps> = ({ account }) => {
  const [governanceCardArray, setGovernanceCardArray] =
    useState<IMyGovernanceCard[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const getGovernanceTokens = async () => {
    try {
      const balanceLength = await mintGovernanceTokenContract.methods
        .balanceOf(account)
        .call();

      if (balanceLength === "0") return;

      const tempGovernanceCardArray: IMyGovernanceCard[] = [];

      const response = await mintGovernanceTokenContract.methods
        .getGovernanceTokens(account)
        .call();

      response.map((v: IMyGovernanceCard) => {
        tempGovernanceCardArray.push({
          GNT_Id: v.GNT_Id,
          GNT_name: v.GNT_name,
          GNT_Initial_Price: v.GNT_Initial_Price,
          GNT_Sale_Price: v.GNT_Sale_Price,
          GNT_Address: v.GNT_Address,
        });
      });

      setGovernanceCardArray(tempGovernanceCardArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await mintGovernanceTokenContract.methods
        .isApprovedForAll(account, saleGovernanceTokenAddress)
        .call();

      if (response.status) {
        setSaleStatus(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) return;

      const response = await mintGovernanceTokenContract.methods
        .setApprovalForAll(saleGovernanceTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  // const onClickRoom = async () => {
  //     try{
  //         if(!account) return;

  //         const balanceLength = await mintGovernanceTokenContract.methods
  //             .balanceOf(account)
  //             .call();

  //         if(balanceLength==="0"){
  //             alert("You cannot enter the room because you don't have NFTs for this room.");
  //             return;
  //         }

  //         alert("You can enter the room because you have NFTs for this room.");
  //         navigate("/screen_token_gating");
  //     } catch (error) {
  //         console.error(error);
  //     }
  // }

  useEffect(() => {
    if (!account) return;

    getIsApprovedForAll();
    getGovernanceTokens();
  }, [account]);

  useEffect(() => {
    console.log(governanceCardArray);
  }, [governanceCardArray]);

  return (
    <>
      {/* <button style={{ fontSize: '14px', color: 'green', marginTop: '8px' }} onClick={onClickRoom}>
                Room
            </button> */}
      <div
        style={{
          backgroundColor: "#E5F2F2",
          minHeight: "100vh",
          borderTop: "1px solid #00A29D",
        }}
      >
        <div
          style={{
            paddingLeft: `${windowWidth > 1700 ? "500px" : "50px"}`,
            paddingRight: `${windowWidth > 1700 ? "500px" : "10px"}`,
          }}
        >
          <div>
            <h3
              style={{
                margin: "0",
                paddingTop: "50px",
                marginBottom: "30px",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              내 지갑
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "700px",
                height: "75px",
                fontSize: "20px",
                fontWeight: "bold",
                backgroundColor: "#00A29D",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "45px",
              }}
            >
              <img
                src="/image/metamaskicon.png"
                alt="Metamask"
                style={{ width: "36px", height: "45px", marginRight: "20px" }}
              />
              <h3> 내 지갑 주소 : {account} </h3>
            </div>
          </div>

          <h3
            style={{
              margin: "0",
              paddingTop: "50px",
              marginBottom: "30px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            내 티켓
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <span>
              {" "}
              티켓 판매 상태 : {saleStatus ? "판매 가능" : "판매 불가능"}
            </span>
            <button
              style={{
                width: "auto",
                height: "auto",
                fontSize: "10px",
                fontWeight: "bold",
                backgroundColor: saleStatus ? "red" : "blue",
                color: "white",
                border: "none",
                padding: "5px 5px",
                borderRadius: "10px",
                marginLeft: "10px",
              }}
              onClick={onClickApproveToggle}
            >
              {saleStatus ? "상태 변경" : "상태 변경"}
            </button>
          </div>

          <h3
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            티켓 리스트
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
            }}
          >
            {governanceCardArray &&
              governanceCardArray.map((v, i) => {
                return (
                  <MyGovernanceCard
                    key={i}
                    GNT_Id={v.GNT_Id}
                    GNT_name={v.GNT_name}
                    GNT_Initial_Price={v.GNT_Initial_Price}
                    GNT_Sale_Price={v.GNT_Sale_Price}
                    GNT_Address={v.GNT_Address}
                    saleStatus={saleStatus}
                    account={account}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default ScreenMyGovernance;
