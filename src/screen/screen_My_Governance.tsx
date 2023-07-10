import React, { FC, useEffect, useState } from "react";
import {
  mintGovernanceTokenContract,
  saleGovernanceTokenAddress,
} from "../web3Config";
import MyGovernanceCard, {
  IMyGovernanceCard,
} from "../components/MyGovernanceCard";
import {
  Box,
  Button,
  Text,
  Grid,
  Heading,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

interface MyGovernanceProps {
  account: string;
}

const ScreenMyGovernance: FC<MyGovernanceProps> = ({ account }) => {
  const boxPaddingLeft = useBreakpointValue({ base: "50px", xl: "500px" });
  const boxPaddingRight = useBreakpointValue({ base: "10px", xl: "500px" });
  const [saleStatus, setSaleStatus] = useState<boolean>(false);
  const [governanceCardArray, setGovernanceCardArray] =
    useState<IMyGovernanceCard[]>();

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
      <Box
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        h="100vh"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Heading
          //위치
          mt="30px"
          mb="30px"
          //크기
          as="h1"
          size="lg"
        >
          내 지갑
        </Heading>
        <Box
          display="flex"
          alignItems="center"
          w="670px"
          h="70px"
          bg="#00A29D"
          px="10px"
          py="20px"
          borderRadius="lg"
        >
          <Image
            src="/image/metamaskicon.png"
            alt="Metamask"
            w="36px"
            h="45px"
            m="20px"
          />
          <Text as="b" color="white" fontSize="lg">
            내 지갑 주소 : {account}{" "}
          </Text>
        </Box>
        <Heading
          //위치
          mt="30px"
          mb="30px"
          //크기
          as="h1"
          size="lg"
        >
          내 티켓
        </Heading>
        <Box display="flex" alignItems="center">
          <Heading
            //크기
            as="h2"
            size="md"
          >
            티켓 판매 상태 : {saleStatus ? "판매 가능" : "판매 불가능"}
          </Heading>
          <Button
            ml="10px"
            w="auto"
            h="auto"
            p="5px"
            as="b"
            color="white"
            fontSize="sm"
            bg={saleStatus ? "red" : "blue"}
            onClick={onClickApproveToggle}
          >
            {saleStatus ? "상태 변경" : "상태 변경"}
          </Button>
        </Box>

        <Heading
          mt="20px"
          mb="10px"
          //크기
          as="h2"
          size="md"
        >
          티켓 리스트
        </Heading>

        <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))">
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
        </Grid>
      </Box>
    </>
  );
};
export default ScreenMyGovernance;
