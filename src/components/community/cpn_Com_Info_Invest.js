import React from "react";
import { Text, Box } from "@chakra-ui/react";

const ComInfoInvest = ({ state }) => {
  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  return (
    <Box mt="30px" ml="20px">
      <Text mr="20px" fontWeight="bold" fontSize="lg">
        투자 목표 금액
      </Text>
      <Text fontWeight="bold" fontSize="lg" color="#00A29D">
        {(state.com_now_investment / state.com_total_investment) * 100}% 달성
      </Text>
      {/* 커뮤니티 투자 목표 금액 그래프 */}
      <Box position="relative" mt="20px">
        {/* 목표 금액 그래프 */}
        <Box
          //위치 및 정렬
          position="absolute"
          top="0"
          left="0"
          //크기
          w="90%"
          h="45px"
          //배경
          bg="white"
          border="1px solid #00A29D"
          borderRadius="3xl"
        />
        {/* 현재 금액 그래프 */}
        <Box
          //위치 및 정렬
          position="absolute"
          top="0"
          left="0"
          //크기
          w={(state.com_now_investment / state.com_total_investment) * 90 + "%"}
          h="45px"
          //배경
          bg={"linear-gradient(to right, #00A29D, #FFFFFF)"}
          border="1px solid #00A29D"
          borderRadius="3xl"
        />
      </Box>
      {/* 투자 목표 금액 텍스트 */}
      <Box position="relative" color="#00A29D">
        {/* 목표 금액 텍스트 */}
        <Box position="absolute" top="55" left="85%">
          <Text as="b">
            <NumberFormat number={state.com_total_investment} />원
          </Text>
        </Box>
        {/* 현재 금액 텍스트 */}
        <Box
          position="absolute"
          top="55"
          left={
            (state.com_now_investment / state.com_total_investment) * 80 + "%"
          }
        >
          <Text fontWeight="bold">
            <NumberFormat number={state.com_now_investment} />원
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ComInfoInvest;
