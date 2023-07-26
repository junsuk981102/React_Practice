import React, { useState } from "react";
import { Button, Flex, Box, Image, Text } from "@chakra-ui/react";

const ComInfoTicket = ({ state, ownerCount, onClickSell }) => {
  const [sellCount, setSellCount] = useState(0); //티켓 구매 갯수

  const handleClick_plus = () => {
    if (ownerCount + sellCount < state.com_ticket_max) {
      setSellCount(sellCount + 1);
    }
  };

  const handleClick_minus = () => {
    if (sellCount > 0) {
      setSellCount(sellCount - 1);
    }
  };

  const handleClick_sell = () => {
    onClickSell(sellCount); // 부모 컴포넌트로 티켓 구매 갯수를 전달
    setSellCount(0); // sellCount 초기화
  };

  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  return (
    <Box mr="50px">
      <Text fontWeight="bold" fontSize="lg">
        티켓 구매하기
      </Text>
      <Flex mt="20px">
        {/* 왼쪽 섹션 */}
        <Box>
          <Image
            src={
              ownerCount > 0
                ? "../image/ticket/icon_color_ticket.png"
                : "../image/ticket/icon_grey_ticket.png"
            }
            w="150px"
            h="150px"
            mb="15px"
          />
          <Box
            textAlign="center"
            w="150px"
            h="25px"
            p="5px"
            bg="#E5F2F2"
            border="1px solid black"
            borderRadius="3xl"
            fontSize="xs"
            color="#00A29D"
          >
            <Text>현재 보유한 티켓 수: {ownerCount}매</Text>
          </Box>
        </Box>
        {/* 오른쪽 섹션 */}
        <Box textAlign="center" ml="30px" fontWeight="bold">
          <Text mb="15px" fontSize="xl">
            <NumberFormat number={state.com_ticket_price} />원
          </Text>
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            w="120px"
            h="40px"
            border="1px solid #00A29D"
            borderRadius="xl"
          >
            <Button
              w="40px"
              h="40px"
              borderRadius="50%"
              variant="none"
              fontSize="25px"
              fontWeight="bold"
              color={sellCount > 0 ? "#00A29D" : "grey"}
              onClick={handleClick_minus}
            >
              -
            </Button>
            <Text w="30px">{sellCount}</Text>
            <Button
              w="40px"
              h="40px"
              borderRadius="50%"
              variant="none"
              fontSize="25px"
              fontWeight="bold"
              color={
                ownerCount + sellCount < state.com_ticket_max
                  ? "#00A29D"
                  : "grey"
              }
              onClick={handleClick_plus}
            >
              +
            </Button>
          </Flex>
          <Button
            w="120px"
            h="35px"
            p="10px"
            mt="15px"
            bg={sellCount > 0 ? "#00A29D" : "grey"}
            borderRadius="3xl"
            variant="none"
            fontSize="sm"
            color="white"
            onClick={handleClick_sell}
          >
            {ownerCount > 0 ? "추가 구매하기" : "구매하기"}
          </Button>
          <Text mt="5px" fontSize="2xs" color="grey">
            * 최대 {state.com_ticket_max}매까지 구매 가능
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ComInfoTicket;
