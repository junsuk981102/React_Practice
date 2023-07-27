import React, { useState } from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";

const ComInfoTicket = ({ state, ownerCount, onClickSell }) => {
  const [sellCount, setSellCount] = useState(0); //티켓 구매 개수
  //티켓 개수 +
  const handleClick_plus = () => {
    if (ownerCount + sellCount < state.com_ticket_max) {
      setSellCount(sellCount + 1);
    }
  };
  //티켓 개수 -
  const handleClick_minus = () => {
    if (sellCount > 0) {
      setSellCount(sellCount - 1);
    }
  };
  // 티켓 구매
  const handleClick_sell = () => {
    onClickSell(sellCount);
    setSellCount(0);
  };
  //금액 표시 형식 변경(ex.10000->10,000)
  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  return (
    <Box m="0 50px 0 0">
      {/* 티켓 구매하기 */}
      <Text fontWeight="bold" fontSize="lg">
        티켓 구매하기
      </Text>
      <Flex m="20px 0 0 0">
        {/* 왼쪽 섹션 */}
        <Box>
          {/* 티켓 사진 */}
          <Image
            src={
              ownerCount > 0
                ? "../image/ticket/icon_color_ticket.png"
                : "../image/ticket/icon_grey_ticket.png"
            }
            w="150px"
            h="150px"
            m="0 0 15px 0"
          />
          {/* 현재 티켓 보유 현황 */}
          <Box
            textAlign="center"
            p="5px"
            bg="#E5F2F2"
            border="1px solid black"
            borderRadius="3xl"
            fontSize="xs"
          >
            현재 보유한 티켓 수: {ownerCount}매
          </Box>
        </Box>
        {/* 오른쪽 섹션 */}
        <Box textAlign="center" m="0 0 0 30px" fontWeight="bold">
          {/* 티켓 가격 */}
          <Text fontSize="xl">
            <NumberFormat number={state.com_ticket_price} />원
          </Text>
          {/* 티켓 개수 조절 버튼 */}
          <Flex
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            w="120px"
            h="40px"
            m="15px 0 15px 0"
            border="1px solid #00A29D"
            borderRadius="xl"
          >
            {/* - 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
              color={sellCount > 0 ? "#00A29D" : "lightgrey"}
              onClick={handleClick_minus}
            >
              -
            </Button>
            {/* 개수 */}
            <Text w="30px">{sellCount}</Text>
            {/* + 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
              color={
                ownerCount + sellCount < state.com_ticket_max
                  ? "#00A29D"
                  : "lightgrey"
              }
              onClick={handleClick_plus}
            >
              +
            </Button>
          </Flex>
          {/* 구매하기 버튼 */}
          <Button
            w="120px"
            h="40px"
            bg={sellCount > 0 ? "#00A29D" : "lightgrey"}
            borderRadius="xl"
            variant="none"
            fontSize="sm"
            color="white"
            onClick={handleClick_sell}
          >
            {ownerCount > 0 ? "추가 구매하기" : "구매하기"}
          </Button>
          {/* 최대 구매 개수 */}
          <Text m="5px 0 0 0" fontSize="2xs" color="lightgrey">
            * 최대 {state.com_ticket_max}매까지 구매 가능
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ComInfoTicket;

//23.07.27 1차 코드 수정
