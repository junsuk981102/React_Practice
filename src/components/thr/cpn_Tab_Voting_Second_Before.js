import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Image } from "@chakra-ui/react";
import { dbService } from "../../firebase-config";

const TabVotingSecondBefore = ({ state, userId, ownerCount }) => {
  const [voteyes, setVoteYes] = useState(0); //찬성 투표
  const [voteno, setVoteNo] = useState(0); //반대 투표
  const percentyes = state.com_syes; // 찬성 득표
  const percentno = state.com_sno; // 반대 득표
  const percentyesorno = state.com_sall; // 총 득표
  const [userTicket, setUserTicket] = useState(ownerCount);
  const [secondvote, setSecondVote] = useState(0);

  useEffect(() => {
    const fetchUserTicket = async () => {
      if (userId) {
        const communityUid = state.id;
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

  useEffect(() => {
    const fetchUserVote = async () => {
      if (userId) {
        const communityUid = state.id;
        const userColRef = dbService
          .collection("user_list")
          .doc(userId)
          .collection("ticket_list");
        const userDoc = await userColRef.doc(communityUid).get();
        const fetchedUserVote = userDoc.data()?.secondvote || 0;
        setSecondVote(fetchedUserVote);
      }
    };
    fetchUserVote();
  }, [userId, state.id]);

  useEffect(() => {
    if (userId) {
      const communityUid = state.id;
      const userColRef = dbService
        .collection("user_list")
        .doc(userId)
        .collection("ticket_list")
        .doc(communityUid);

      const unsubscribe = userColRef.onSnapshot((doc) => {
        if (doc.exists) {
          const newData = doc.data();
          setUserTicket(newData.ticket);
        }
      });

      return () => {
        unsubscribe(); // Unsubscribe from the real-time updates when component unmounts
      };
    }
  }, [userId, state.id]);

  useEffect(() => {
    if (userId) {
      const communityUid = state.id;
      const userColRef = dbService
        .collection("user_list")
        .doc(userId)
        .collection("ticket_list")
        .doc(communityUid);

      const unsubscribe = userColRef.onSnapshot((doc) => {
        if (doc.exists) {
          const newData = doc.data();
          setSecondVote(newData.secondvote);
        }
      });

      return () => {
        unsubscribe(); // Unsubscribe from the real-time updates when component unmounts
      };
    }
  }, [userId, state.id]);

  //찬성 투표
  const handleClick_plus_vyes = () => {
    if (voteyes + voteno < userTicket && secondvote === 0) {
      setVoteYes(voteyes + 1);
    }
  };
  const handleClick_minus_vyes = () => {
    if (voteyes > 0) {
      setVoteYes(voteyes - 1);
    }
  };
  //반대 투표
  const handleClick_plus_vno = () => {
    if (voteyes + voteno < userTicket && secondvote === 0) {
      setVoteNo(voteno + 1);
    }
  };
  const handleClick_minus_vno = () => {
    if (voteno > 0) {
      setVoteNo(voteno - 1);
    }
  };
  //2차 투표
  const votingSecond = async () => {
    if (voteyes + voteno === userTicket && secondvote === 0) {
      const communityUid = state.id;

      state.com_syes = state.com_syes + voteyes;
      const updatedsyes = state.com_syes;
      await dbService.collection("community_list").doc(communityUid).update({
        com_syes: updatedsyes,
      });

      state.com_sno = state.com_sno + voteno;
      const updatedsno = state.com_sno;
      await dbService.collection("community_list").doc(communityUid).update({
        com_sno: updatedsno,
      });

      state.com_sall = state.com_sall + voteyes + voteno;
      const updatedsall = state.com_sall;
      await dbService.collection("community_list").doc(communityUid).update({
        com_sall: updatedsall,
      });

      await dbService
        .collection("user_list")
        .doc(userId)
        .collection("ticket_list")
        .doc(communityUid)
        .update({
          secondvote: 1,
        });

      setVoteYes(0);
      setVoteNo(0);
    }
  };

  const votingSecondButton = () => {
    if (secondvote === 0) {
      return (
        <>
          <Flex justifyContent="center" m="60px 0 0 0">
            <Button
              w="300px"
              h="50px"
              borderRadius="3xl"
              bg={
                voteyes + voteno === userTicket && userTicket > 0
                  ? "#00A29D"
                  : "lightgrey"
              }
              variant="none"
              fontSize="lg"
              color="white"
              onClick={votingSecond}
            >
              투표하기
            </Button>
          </Flex>
        </>
      );
    } else {
      return (
        <>
          <Flex flexDirection="column" alignItems="center" m="60px 0 0 0">
            {/* 투표 현황 텍스트 */}
            <Flex flexDirection="column" w="550px" textAlign="start">
              <Text fontWeight="bold">
                {"<"}투표 현황{">"}
              </Text>
              <Text fontSize="2xs" color="grey">
                투표 종료까지 D - 2일 16시간
              </Text>
            </Flex>
            {/* 투표 현황 그래프 */}
            <Flex w="550px" border="1px solid white">
              <Flex
                w={(percentyes / percentyesorno) * 100 + "%"}
                h="60px"
                bg="#6200EE" //파란색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percentyes / percentyesorno) * 100).toFixed(1) + "%"}
              </Flex>
              <Flex
                w={(percentno / percentyesorno) * 100 + "%"}
                h="60px"
                bg="#FF0000" //빨간색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percentno / percentyesorno) * 100).toFixed(1) + "%"}
              </Flex>
            </Flex>
          </Flex>
        </>
      );
    }
  };
  return (
    <>
      {/* 정보 */}
      <Flex flexDirection="column" p="10px">
        {/* 제목 */}
        <Flex m="0 0 15px 0">
          <Text fontSize="2xl" fontWeight="bold" m="0 15px 0 0">
            2차 투표 중
          </Text>
          <Image src="../image/community/icon_voting.png" w="30px" h="30px" />
        </Flex>
        {/* 설명 */}
        <Text>
          {state.com_name} 2차 투표 기간입니다. {"("}
          2023.07.23~2023.07.31{")"}
          <br />
          해당 기업에 투자할지 여부를 찬/반 투표해 주세요.
        </Text>
        {/* 보유 티켓 */}
        <Text m="15px 0">현재 보유한 티켓 수 : {userTicket}매</Text>
      </Flex>
      {/* 2차 투표 */}
      <Flex justifyContent="center">
        {/* 찬성 투표 */}
        <Flex
          flexDirection="column"
          alignItems="center"
          p="5px"
          borderRadius="xl"
          boxShadow="0 0 5px #00A29D"
        >
          <Image
            src="../image/community/company_ex1.png"
            w="150px"
            h="150px"
            borderRadius="xl"
          />
          <Text m="5px 0" fontWeight="bold">
            펫프랜즈
          </Text>
          <Text m="0 0 5px 0" fontSize="lg" fontWeight="bold" color="#6200EE">
            찬성
          </Text>
          <Flex
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            w="120px"
            h="30px"
            border="1px solid #00A29D"
            borderRadius="xl"
          >
            {/* 마이너스 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
              color={voteyes > 0 ? "#00A29D" : "lightgrey"}
              onClick={handleClick_minus_vyes}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text w="30px">{voteyes}</Text>
            {/* 플러스 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
              color={
                voteyes + voteno < userTicket && secondvote === 0
                  ? "#00A29D"
                  : "lightgrey"
              }
              //기능
              onClick={handleClick_plus_vyes}
            >
              +
            </Button>
          </Flex>
        </Flex>
        {/* 반대 버튼 */}
        <Flex
          flexDirection="column"
          alignItems="center"
          p="5px"
          m="0 60px"
          borderRadius="xl"
          boxShadow="0 0 5px #00A29D"
        >
          <Image
            src="../image/community/company_ex1.png"
            w="150px"
            h="150px"
            borderRadius="xl"
          />
          <Text m="5px 0" fontWeight="bold">
            펫프랜즈
          </Text>
          <Text m="0 0 5px 0" fontSize="lg" fontWeight="bold" color="#FF0000">
            반대
          </Text>
          <Flex
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            w="120px"
            h="30px"
            border="1px solid #00A29D"
            borderRadius="xl"
          >
            {/* 마이너스 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
              color={voteno > 0 ? "#00A29D" : "lightgrey"}
              //기능
              onClick={handleClick_minus_vno}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text w="30px">{voteno}</Text>
            {/* 플러스 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
              color={
                voteyes + voteno < userTicket && secondvote === 0
                  ? "#00A29D"
                  : "lightgrey"
              }
              //기능
              onClick={handleClick_plus_vno}
            >
              +
            </Button>
          </Flex>
        </Flex>
      </Flex>
      {/* 투표하기 버튼 */}
      {votingSecondButton()}
    </>
  );
};

export default TabVotingSecondBefore;

//23.07.27 1차 코드 수정
