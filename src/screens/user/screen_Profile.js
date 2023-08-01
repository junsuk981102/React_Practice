import React, { useEffect, useState } from "react";
import User from "../../components/user/cpn_User";
import ScreenMyGovernance from "../ticket/screen_My_Governance";
import { Flex } from "@chakra-ui/react";

const ScreenProfile = () => {
  const [account, setAccount] = useState(""); // State to store the user's Metamask account address

  const getAccountAddress = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.error("No account found in Metamask");
        }
      } catch (error) {
        console.error("Error while connecting to Metamask:", error);
      }
    } else {
      console.error("Metamask not detected");
    }
  };

  useEffect(() => {
    // Call the function to get the initial account address
    getAccountAddress();

    // Subscribe to changes in connected accounts
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          window.location.reload();
        } else {
          setAccount(""); // If no account available, reset the account state
        }
      });
    }
  }, []);

  return (
    <>
      <Flex
        //정렬
        flexDirection="column"
        alignItems="center"
        //크기 및 여백
        h="auto"
        pb="200px"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 마이페이지 섹션 */}
        <User />
        {/* 지갑&티켓 섹션 */}
        <ScreenMyGovernance account={account} />
      </Flex>
    </>
  );
};

export default ScreenProfile;
