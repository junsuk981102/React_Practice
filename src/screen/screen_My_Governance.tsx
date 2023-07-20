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
  //양쪽여백
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });

  const [saleStatus, setSaleStatus] = useState<boolean>(false);
  const [governanceCardArray, setGovernanceCardArray] =
    useState<IMyGovernanceCard[]>();

  //토큰 정보 가져오기
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

  //토큰 판매 가능 여부 등록
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

  //토큰 판매 가능 여부 변경
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
      {/* 지갑 & 토큰 전체 화면 */}

      {/* 지갑 & 토큰 전체 배경 화면 */}
      <Box
        //크기 및 여백
        h="auto"
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        mb="200px"
        //배경
        bg="#E5F2F2"
      >
        {/* 지갑 섹션 */}
        <Heading
          //여백
          mt="30px"
          mb="30px"
          //글자
          as="h1"
          size="lg"
        >
          내 지갑
        </Heading>
        <Box
          //정렬
          display="flex"
          alignItems="center"
          //크기 및 여백
          w="670px"
          h="70px"
          px="10px"
          py="20px"
          //배경
          bg="#00A29D"
          borderRadius="lg"
        >
          <Image
            //사진 위치
            src="/image/metamaskicon.png"
            //크기 및 여백
            w="36px"
            h="45px"
            m="20px"
          />
          <Text
            //글자
            as="b"
            fontSize="lg"
            color="white"
          >
            내 지갑 주소 : {account}
          </Text>
        </Box>

        {/* 티켓 판매 가능 여부 변경 섹션 */}
        <Heading
          //여백
          mt="30px"
          mb="30px"
          //글자
          as="h1"
          size="lg"
        >
          내 티켓
        </Heading>
        <Box
          //정렬
          display="flex"
          alignItems="center"
        >
          <Heading
            //글자
            as="h2"
            size="md"
          >
            티켓 판매 상태 : {saleStatus ? "판매 가능" : "판매 불가능"}
          </Heading>
          <Button
            //크기 및 여백
            w="auto"
            h="auto"
            p="5px"
            ml="10px"
            //배경
            bg={saleStatus ? "red" : "blue"}
            //글자
            as="b"
            fontSize="sm"
            color="white"
            //기능
            onClick={onClickApproveToggle}
          >
            {saleStatus ? "상태 변경" : "상태 변경"}
          </Button>
        </Box>

        {/* 티켓 리스트 섹션 */}
        <Heading
          //여백
          mt="20px"
          mb="10px"
          //글자
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
