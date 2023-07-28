import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

const TabCommunityInfoInvest = ({ nowInvestment, totalInvestment }) => {
  return (
    <>
      {/* 커뮤니티 투자 정보 섹션 */}
      {/* 투자금 현황 */}
      <Flex mb="20px">
        <Text>투자금 현황 : </Text>
        <Text fontWeight="bold" color="#00A29D">
          &nbsp;{(nowInvestment / totalInvestment) * 100}% 달성
        </Text>
      </Flex>
      {/* 커뮤니티 투자 목표 금액 그래프 */}
      <Box position="relative" w="650px">
        {/* 목표 금액 그래프 */}
        <Box
          position="absolute"
          w="100%"
          h="45px"
          bg="white"
          border="1px solid #00A29D"
          borderRadius="3xl"
        />
        {/* 현재 금액 그래프 */}
        <Box
          position="absolute"
          w={(nowInvestment / totalInvestment) * 100 + "%"}
          h="45px"
          bg={"linear-gradient(to right, #00A29D, #FFFFFF)"}
          border="1px solid #00A29D"
          borderRadius="3xl"
        />
      </Box>
      {/* 커뮤니티 투자 목표 금액 텍스트 */}
      <Box
        //위치 및 정렬
        position="relative"
        //글자
        color="#00A29D"
      >
        {/* 목표 금액 텍스트 */}
        <Box
          //위치 및 정렬
          position="absolute"
          top="55"
          left="85%"
        >
          <Text>{totalInvestment.toLocaleString()}원</Text>
        </Box>
        {/* 현재 금액 텍스트 */}
        <Box
          //위치 및 정렬
          position="absolute"
          top="55"
          left={(nowInvestment / totalInvestment) * 80 + "%"}
        >
          <Text>{nowInvestment.toLocaleString()}원</Text>
        </Box>
      </Box>
    </>
  );
};

export default TabCommunityInfoInvest;
