import React, { useState } from "react";
import { Button, Text, Flex, Image } from "@chakra-ui/react";

const TabCommunityInfoTicket = ({ ownerCount, setOwnerCount, state }) => {
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
      {/* 커뮤니티 티켓 섹션 */}
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
            티켓 가격 :&nbsp;{state.com_ticket_price.toLocaleString()}원
          </Text>
          <Text fontSize="sm" mb="5px">
            현재 보유한 티켓 수 : {ownerCount}매
          </Text>
          {/* 구매 갯수 안내 */}
          <Text fontSize="2xs" color="lightgrey" mb="10px">
            * 최대 {state.com_ticket_max}매까지 구매 가능
          </Text>

          {/* 티켓 구매 버튼 */}
          <Flex
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            w="140px"
            h="30px"
            mb="10px"
            border="1px solid #00A29D"
            borderRadius="xl"
          >
            {/* 마이너스 버튼 */}
            <Button
              w="30px"
              variant="none"
              fontSize="25px"
              fontWeight="bold"
              color={sellCount > 0 ? "#00A29D" : "lightgrey"}
              onClick={handleClick_minus}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text w="40px">{sellCount}</Text>
            {/* 플러스 버튼 */}
            <Button
              w="30px"
              variant="none"
              fontSize="25px"
              fontWeight="bold"
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
          {/* 티켓 구매 버튼 */}
          <Button
            w="140px"
            h="40px"
            bg={sellCount > 0 ? "#00A29D" : "lightgrey"}
            borderRadius="xl"
            variant="none"
            fontSize="sm"
            color="white"
            onClick={handleClick_sell}
          >
            추가 구매하기
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default TabCommunityInfoTicket;
