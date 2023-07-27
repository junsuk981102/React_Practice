import React from "react";
import { useState } from "react";

import { Button, Text, Flex, Image, Box } from "@chakra-ui/react";

const TabCommunityInfo = ({ state, ownerCount, setOwnerCount }) => {
  // com_createAt을 YYYY-MM-DD 형식으로 출력
  const timestamp = state.com_createAt;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}년 ${month}월 ${day}일`;
  //숫자 쉼표 표시 코드
  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  const [sellCount, setSellCount] = useState(0); //티켓 구매 갯수

  //티켓 구매 갯수 증가
  const handleClick_plus = () => {
    if (ownerCount + sellCount < state.com_ticket_max) {
      setSellCount(sellCount + 1);
    }
  };
  //티켓 구매 갯수 감소
  const handleClick_minus = () => {
    if (sellCount > 0) {
      setSellCount(sellCount - 1);
    }
  };
  //티켓 구매
  const handleClick_sell = () => {
    setOwnerCount(ownerCount + sellCount);
    setSellCount(0);
  };

  return (
    <>
      {" "}
      <Flex flexDirection="column" p="10px">
        {/* 커뮤니티 생성일 */}
        <Text mb="30px">커뮤니티 생성일 : {formattedDate}</Text>
        {/* 커뮤니티 참여인원 */}
        <Text mb="30px">커뮤니티 참여인원 : {state.com_member}명</Text>
        {/* 투자금 현황 */}
        <Flex mb="20px">
          <Text>투자금 현황 : </Text>
          <Text fontWeight="bold" color="#00A29D">
            &nbsp;
            {(state.com_now_investment / state.com_total_investment) * 100}%
            달성
          </Text>
        </Flex>

        {/* 커뮤니티 투자 목표 금액 그래프 */}
        <Box position="relative" w="650px">
          {/* 목표 금액 그래프 */}
          <Box
            //위치 및 정렬
            position="absolute"
            top="0"
            left="0"
            //크기
            w="100%"
            h="45px"
            //배경
            bg="white"
            border="1px solid #00A29D"
            borderRadius="22.5px"
          />
          {/* 현재 금액 그래프 */}
          <Box
            //위치 및 정렬
            position="absolute"
            top="0"
            left="0"
            //크기
            w={
              (state.com_now_investment / state.com_total_investment) * 100 +
              "%"
            }
            h="45px"
            //배경
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
            <Text>
              <NumberFormat number={state.com_total_investment} />원
            </Text>
          </Box>
          {/* 현재 금액 텍스트 */}
          <Box
            //위치 및 정렬
            position="absolute"
            top="55"
            left={
              (state.com_now_investment / state.com_total_investment) * 80 + "%"
            }
          >
            <Text>
              <NumberFormat number={state.com_now_investment} />원
            </Text>
          </Box>
        </Box>

        {/* 티켓 정보 */}
        <Text mt="120px" mb="20px">
          티켓정보
        </Text>
        <Flex mb="25px">
          <Image
            src="../image/ticket/icon_color_ticket.png"
            w="150px"
            h="150px"
            marginX="10px"
          />

          <Flex flexDirection="column">
            <Text fontSize="sm" mb="5px">
              티켓 가격 :&nbsp;
              <NumberFormat number={state.com_ticket_price} />원
            </Text>
            <Text fontSize="sm" mb="5px">
              현재 보유한 티켓 수 : {ownerCount}매
            </Text>
            {/* 구매 갯수 안내 */}
            <Text
              //글자
              fontSize="2xs"
              color="lightgrey"
              mb="10px"
            >
              * 최대 {state.com_ticket_max}매까지 구매 가능
            </Text>

            {/* 티켓 구매 버튼 */}
            <Flex
              //정렬
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              //크기
              w="140px"
              h="30px"
              mb="10px"
              //배경
              border="1px solid #00A29D"
              borderRadius="xl"
            >
              {/* 마이너스 버튼 */}
              <Button
                //크기
                w="30px"
                //배경
                variant="none"
                //글자
                fontSize="25px"
                fontWeight="bold"
                color={sellCount > 0 ? "#00A29D" : "lightgrey"}
                //기능
                onClick={handleClick_minus}
              >
                -
              </Button>
              {/* 구매 갯수 */}
              <Text
                //크기
                w="40px"
              >
                {sellCount}
              </Text>
              {/* 플러스 버튼 */}
              <Button
                //크기
                w="30px"
                //배경
                variant="none"
                //글자
                fontSize="25px"
                fontWeight="bold"
                color={
                  ownerCount + sellCount < state.com_ticket_max
                    ? "#00A29D"
                    : "lightgrey"
                }
                //기능
                onClick={handleClick_plus}
              >
                +
              </Button>
            </Flex>
            {/* 티켓 구매 버튼 */}
            <Button
              //크기 및 여백
              w="140px"
              h="40px"
              //배경
              bg={sellCount > 0 ? "#00A29D" : "lightgrey"}
              borderRadius="xl"
              variant="none"
              //글자
              fontSize="sm"
              color="white"
              //기능
              onClick={handleClick_sell}
            >
              추가 구매하기
            </Button>
          </Flex>
        </Flex>

        {/* 관심있는 회사 */}
        <Text mb="20px">관심있는 회사 </Text>
        <Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            marginX="10px"
            p="5px"
            borderRadius="xl"
            boxShadow="0 0 5px #00A29D"
          >
            <Image
              src="../image/community/company_ex1.png"
              w="100px"
              h="100px"
              borderRadius="xl"
            />
            <Text mt="5px" fontSize="sm">
              펫프랜즈
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            marginX="20px"
            p="5px"
            borderRadius="xl"
            boxShadow="0 0 5px #00A29D"
          >
            <Image
              src="../image/community/company_ex2.png"
              w="100px"
              h="100px"
              borderRadius="xl"
            />
            <Text mt="5px" fontSize="sm">
              페오펫
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            marginX="10px"
            p="5px"
            borderRadius="xl"
            boxShadow="0 0 5px #00A29D"
          >
            <Image
              src="../image/community/company_ex3.png"
              w="100px"
              h="100px"
              borderRadius="xl"
            />
            <Text mt="5px" fontSize="sm">
              핏펫
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default TabCommunityInfo;
