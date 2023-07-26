import React, { FC, useEffect, useState } from "react";
import {
  mintGovernanceTokenContract,
  saleGovernanceTokenAddress,
} from "../../web3Config";
import MyGovernanceCard, {
  IMyGovernanceCard,
} from "../../components/ticket/MyGovernanceCard";
import { Button, Text, Grid, Heading, Image, Flex } from "@chakra-ui/react";

interface MyGovernanceProps {
  account: string;
}

const ScreenMyGovernance: FC<MyGovernanceProps> = ({ account }) => {
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
      <Flex
        //정렬
        flexDirection="column"
        //크기
        w="700px"
      >
        {/* 지갑 섹션 */}
        <Heading
          //여백
          marginY="30px"
          //글자
          size="lg"
        >
          내 지갑
        </Heading>
        <Flex
          //정렬
          alignItems="center"
          //크기 및 여백
          h="70px"
          p="20px 10px"
          //배경
          bg="#00A29D"
          borderRadius="xl"
        >
          <Image
            //사진 위치
            src="/image/ticket/icon_metamask.png"
            //크기 및 여백
            w="36px"
            h="45px"
            m="20px"
          />
          <Text
            //글자
            fontWeight="bold"
            fontSize="lg"
            color="white"
          >
            내 지갑 주소 : {account}
          </Text>
        </Flex>

        {/* 티켓 판매 가능 여부 변경 섹션 */}
        <Heading
          //여백
          marginY="30px"
          //글자
          size="lg"
        >
          내 티켓
        </Heading>
        <Flex>
          <Heading
            //글자
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
            fontSize="sm"
            color="white"
            //기능
            onClick={onClickApproveToggle}
          >
            {saleStatus ? "상태 변경" : "상태 변경"}
          </Button>
        </Flex>

        {/* 티켓 리스트 섹션 */}
        <Heading
          //여백
          marginY="15px"
          //글자
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
      </Flex>
    </>
  );
};
export default ScreenMyGovernance;

//23.07.24 1차 코드 수정 완료(추가 수정 필수)
