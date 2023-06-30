import React, { useState } from "react";
// import {ethers} from 'ethers';
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Web3 from "web3";

import ScreenMyGovernance from "./screen_My_Governance";

const ScreenWalletToken = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  // const [defaultAccount, setDefaultAccount] = useState(null);
  const [setDefaultAccount] = useState(null);
  // const [userBalance, setUserBalance] = useState(null);
  const [connButtonText] = useState("Connect Wallet");
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
      //walletID.add({ID: defaultAccount});
      handleClick("/screen_wallet_token");
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const [address, setAddress] = useState("");

  useEffect(() => {
    async function getAddress() {
      // Check if MetaMask is installed and enabled
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Get the current address
          const currentAddress = await web3.eth.getAccounts();
          setAddress(currentAddress[0]);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("MetaMask is not installed or enabled");
      }
    }
    getAddress();
  }, []);

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    //walletID.doc("myWallet").update({ID: defaultAccount});
    //walletID.add({ID: defaultAccount});
    // getUserBalance(newAccount.toString());
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  // const getUserBalance = (address) => {
  //     window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
  //     .then(balance => {
  //         setUserBalance(ethers.utils.formatEther(balance));
  //     })
  // }

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
        <div className="accountDisplay">
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
            <h3> Address: {address} </h3>
          </div>
        </div>
        {/* <div className='balanceDisplay'>
                <h3>Balance: {userBalance}</h3>
            </div> */}
        {errorMessage}
        <ScreenMyGovernance />
      </div>
    </div>
  );
};

export default ScreenWalletToken;
