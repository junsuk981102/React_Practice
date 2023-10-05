import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Image } from "@chakra-ui/react";
import { dbService, firebase } from "../../firebase-config";

const ComInfoTicket = ({ state, userId }) => {
  const [sellCount, setSellCount] = useState(0);
  const [userTicket, setUserTicket] = useState(0);
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
  //보유 티켓 현황 가져오기
  useEffect(() => {
    const communityUid = state.id;

    const fetchUserTicket = async () => {
      if (userId) {
        const userColRef = dbService
          .collection("user_list")
          .doc(userId)
          .collection("ticket_list");
        const userDoc = await userColRef.doc(communityUid).get();
        const fetchedUserTicket = userDoc.data()?.ticket || 0;
        setUserTicket(fetchedUserTicket);
      }
    };
    fetchUserTicket();
  }, [userId, state.id]);
  //티켓 구매 갯수 증가
  const handleClick_plus = () => {
    if (
      userTicket + sellCount < state.com_ticket_max &&
      state.com_ticket_price * sellCount <
        state.com_total_investment - currentInvestment
    ) {
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
  const handleClick_sell = async () => {
    if (sellCount > 0 && userId) {
      //티텟 첫 구매시 com_member+1 & firstvote,secondvote 세팅
      const communityUid = state.id;

      if (userTicket === 0) {
        const updatedMember = state.com_member + 1;
        await dbService.collection("community_list").doc(communityUid).update({
          com_member: updatedMember,
        });
        await dbService.collection("user_list").doc(userId).update({
          firstvote: 0,
          secondvote: 0,
        });
      }
      const updatedTicket = userTicket + sellCount;
      await dbService
        .collection("user_list")
        .doc(userId)
        .collection("ticket_list")
        .doc(communityUid)
        .update({
          ticket: updatedTicket,
        });
      const updatedInvestment =
        state.com_now_investment + sellCount * state.com_ticket_price;
      await dbService.collection("community_list").doc(communityUid).update({
        com_now_investment: updatedInvestment,
      });
      await dbService
        .collection("user_list")
        .doc(userId)
        .update({
          funds: firebase.firestore.FieldValue.increment(
            -sellCount * state.com_ticket_price
          ),
        });
      setUserTicket(updatedTicket);
      setSellCount(0);
    }
  };

  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  return (
    <Flex flexDirection="column" mr="50px">
      {/* 티켓 구매하기 */}
      <Text fontWeight="bold" fontSize="lg">
        티켓 구매하기
      </Text>
      <Flex mt="20px">
        {/* 왼쪽 섹션 */}
        <Flex flexDirection="column">
          {/* 티켓 사진 */}
          <Image
            src={
              userTicket > 0
                ? "../image/ticket/icon_color_ticket.png"
                : "../image/ticket/icon_grey_ticket.png"
            }
            w="150px"
            h="150px"
            mb="15px"
          />
          {/* 현재 티켓 보유 현황 */}
          <Flex
            justifyContent="center"
            p="5px"
            bg="#E5F2F2"
            border="1px solid black"
            borderRadius="3xl"
            fontSize="xs"
          >
            현재 보유한 티켓 수: {userTicket}매
          </Flex>
        </Flex>
        {/* 오른쪽 섹션 */}
        <Flex
          flexDirection="column"
          textAlign="center"
          ml="30px"
          fontWeight="bold"
        >
          {/* 티켓 가격 */}
          <Text fontSize="xl">
            <NumberFormat number={state.com_ticket_price} />원
          </Text>
          {/* 티켓 개수 조절 버튼 */}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            textAlign="center"
            w="120px"
            h="40px"
            m="15px 0"
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
            <Text>{sellCount}</Text>
            {/* + 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
              color={
                userTicket + sellCount < state.com_ticket_max &&
                state.com_ticket_price * sellCount <
                  state.com_total_investment - state.com_now_investment
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
            {userTicket > 0 ? "추가 구매하기" : "구매하기"}
          </Button>
          {/* 최대 구매 개수 */}
          <Text mt="5px" fontSize="2xs" color="lightgrey">
            * 최대 {state.com_ticket_max}매까지 구매 가능
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ComInfoTicket;

//23.08.07 1차 코드 수정
