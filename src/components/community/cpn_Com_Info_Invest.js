import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { dbService } from "../../firebase-config";

const ComInfoInvest = ({ state }) => {
  const [currentInvestment, setCurrentInvestment] = useState(
    state.com_now_investment
  );
  //state.com_now_investment의 값이 바뀔 때마다 업데이트
  useEffect(() => {
    const communityUid = state.id;

    const communityDocRef = dbService
      .collection("community_list")
      .doc(communityUid);
    const unsubscribe = communityDocRef.onSnapshot((doc) => {
      if (doc.exists) {
        const newData = doc.data();
        setCurrentInvestment(newData.com_now_investment);
      }
    });
    return () => {
      unsubscribe(); // Unsubscribe from the real-time updates when component unmounts
    };
  }, [state.id]);
  //금액 표시 형식 변경(ex.10000->10,000)
  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  return (
    <Box m="30px 0 0 20px">
      <Text mr="20px" fontSize="lg" fontWeight="bold">
        투자 목표 금액
      </Text>
      {/* 커뮤니티 투자 달성 현황 */}
      <Text fontSize="lg" fontWeight="bold" color="#00A29D">
        {((currentInvestment / state.com_total_investment) * 100).toFixed(1)}%
        달성
      </Text>
      {/* 커뮤니티 투자 목표 금액 그래프 */}
      <Box position="relative" mt="20px">
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
          w={(currentInvestment / state.com_total_investment) * 90 + "%"}
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
          left={(currentInvestment / state.com_total_investment) * 80 + "%"}
        >
          <NumberFormat number={currentInvestment} />원
        </Box>
      </Box>
    </Box>
  );
};

export default ComInfoInvest;

//23.07.27 1차 코드 수정
//23.08.07 2차 코드 수정
