import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const ScreenWalletConnect = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText] = useState("내 MetaMask 지갑과 연결하기");
  const navi = useNavigate();
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

  function handleClick(text) {
    navi(`${text}`);
  }

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
      handleClick("/screen_my_governance");
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  return (
    <div
      className="walletCard"
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
        <h3
          style={{
            margin: "0",
            paddingTop: "50px",
            marginBottom: "30px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          내 지갑 연결하기
        </h3>
        <button
          onClick={connectWalletHandler}
          style={{
            display: "flex",
            alignItems: "center",
            width: "400px",
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
          {connButtonText}
        </button>
      </div>
    </div>
  );
};

export default ScreenWalletConnect;
