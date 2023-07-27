import React from "react";
import { Box, Text } from "@chakra-ui/react";

const ComInfoInvest = ({ state }) => {
  //금액 표시 형식 변경(ex.10000->10,000)
  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  return (
    <Box m="30px 0 0 20px">
      <Text m="0 20px 0 0" fontSize="lg" fontWeight="bold">
        투자 목표 금액
      </Text>
      {/* 커뮤니티 투자 달성 현황 */}
      <Text fontSize="lg" fontWeight="bold" color="#00A29D">
        {(state.com_now_investment / state.com_total_investment) * 100}% 달성
      </Text>
      {/* 커뮤니티 투자 목표 금액 그래프 */}
      <Box position="relative" m="20px 0 0 0">
        {/* 목표 금액 그래프 */}
        <Box
          position="absolute"
          w="90%"
          h="45px"
          bg="white"
          border="1px solid #00A29D"
          borderRadius="3xl"
        />
        {/* 현재 금액 그래프 */}
        <Box
          position="absolute"
          w={(state.com_now_investment / state.com_total_investment) * 90 + "%"}
          h="45px"
          bg={"linear-gradient(to right, #00A29D, #FFFFFF)"}
          border="1px solid #00A29D"
          borderRadius="3xl"
        />
      </Box>
      {/* 커뮤니티 투자 목표 금액 텍스트 */}
      <Box position="relative" color="#00A29D">
        {/* 목표 금액 텍스트 */}
        <Box position="absolute" top="55" left="85%">
          <NumberFormat number={state.com_total_investment} />원
        </Box>
        {/* 현재 금액 텍스트 */}
        <Box
          position="absolute"
          top="55"
          left={
            (state.com_now_investment / state.com_total_investment) * 80 + "%"
          }
        >
          <NumberFormat number={state.com_now_investment} />원
        </Box>
      </Box>
    </Box>
  );
};

export default ComInfoInvest;

//23.07.27 1차 코드 수정
