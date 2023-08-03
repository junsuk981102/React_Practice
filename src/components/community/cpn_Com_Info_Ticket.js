import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { auth, dbService } from "../../firebase-config";

const ComInfoTicket = ({ state }) => {
  const [sellCount, setSellCount] = useState(0);
  const [userUid, setUserUid] = useState("");
  const [userTicket, setUserTicket] = useState(0);

  useEffect(() => {
    const getUserUid = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserUid(user.uid);
        }
      } catch (error) {
        console.log("사용자 UID 가져오기 실패:", error);
      }
    };

    getUserUid();
  }, []);

  useEffect(() => {
    const fetchUserTicket = async () => {
      if (userUid) {
        const communityUid = state.id;
        const userColRef = dbService
          .collection("user_list")
          .doc(userUid)
          .collection("ticket_list");
        const userDoc = await userColRef.doc(communityUid).get();
        const fetchedUserTicket = userDoc.data()?.ticket || 0;
        setUserTicket(fetchedUserTicket);
      }
    };

    fetchUserTicket();
  }, [userUid, state.id]);

  const handleClick_plus = () => {
    if (userTicket + sellCount < state.com_ticket_max) {
      setSellCount(sellCount + 1);
    }
  };

  const handleClick_minus = () => {
    if (sellCount > 0) {
      setSellCount(sellCount - 1);
    }
  };

  const handleClick_sell = async () => {
    if (sellCount > 0 && userUid) {
      const communityUid = state.id;
      const userColRef = dbService
        .collection("user_list")
        .doc(userUid)
        .collection("ticket_list");

      if (userTicket === 0) {
        state.com_member = state.com_member + 1;
        const updatedMember = state.com_member;
        await dbService.collection("community_list").doc(communityUid).update({
          com_member: updatedMember,
        });
      }

      const updatedTicket = userTicket + sellCount;
      userColRef.doc(communityUid).set({
        ticket: updatedTicket,
      });

      state.com_now_investment =
        state.com_now_investment + sellCount * state.com_ticket_price;
      const updatedInvestment = state.com_now_investment;
      await dbService.collection("community_list").doc(communityUid).update({
        com_now_investment: updatedInvestment,
      });

      setUserTicket(updatedTicket);

      setSellCount(0);
    }
  };

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
              userTicket > 0
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
            현재 보유한 티켓 수: {userTicket}매
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
                userTicket + sellCount < state.com_ticket_max
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
          <Text m="5px 0 0 0" fontSize="2xs" color="lightgrey">
            * 최대 {state.com_ticket_max}매까지 구매 가능
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ComInfoTicket;
