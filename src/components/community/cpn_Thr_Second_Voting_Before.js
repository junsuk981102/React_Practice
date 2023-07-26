import React from "react";
import { useState } from "react";

import { Button, Text, Flex, Image } from "@chakra-ui/react";

const ThrFirstVotingBef = ({ state, ownerCount }) => {
  const [votesecondBefore, setVoteSecondBefore] = useState(0);

  const [voteyes, setVoteYes] = useState(0); //찬성 투표
  const [voteno, setVoteNo] = useState(0); //반대 투표

  const percentyes = 642;
  const percentno = 424;
  const percentyesorno = percentyes + percentno;

  //찬성 투표
  const handleClick_plus_vyes = () => {
    if (voteyes + voteno < ownerCount) {
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
    if (voteyes + voteno < ownerCount) {
      setVoteNo(voteno + 1);
    }
  };
  const handleClick_minus_vno = () => {
    if (voteno > 0) {
      setVoteNo(voteno - 1);
    }
  };
  //2차 투표
  const votingSecond = () => {
    if (voteyes + voteno === ownerCount) {
      setVoteSecondBefore(1);
      setVoteYes(0);
      setVoteNo(0);
      ownerCount = 0;
    }
  };
  const votingSecondButton = () => {
    if (votesecondBefore === 0) {
      return (
        <>
          <Flex justifyContent="center" mt="60px">
            <Button
              w="300px"
              h="50px"
              borderRadius="3xl"
              bg={
                voteyes + voteno === ownerCount && ownerCount > 0
                  ? "#00A29D"
                  : "lightgrey"
              }
              variant="none"
              color="white"
              fontSize="lg"
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
          <Flex flexDirection="column" alignItems="center" mt="60px">
            <Flex flexDirection="column" w="550px" textAlign="start">
              <Text fontWeight="bold">
                {"<"}투표 현황{">"}
              </Text>
              <Text fontSize="2xs" color="grey">
                투표 종료까지 D - 2일 16시간
              </Text>
            </Flex>
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
      <Flex flexDirection="column" p="10px" mb="30px">
        {/* 제목 */}
        <Flex mb="15px">
          <Text fontSize="2xl" fontWeight="bold" mr="15px">
            2차 투표 중
          </Text>
          <Image src="../image/community/icon_voting.png" w="30px" h="30px" />
        </Flex>
        {/* 설명 */}
        <Text fontSize="xl" fontWeight="bold" mb="15px">
          {state.com_name} 2차 투표 기간입니다. {"("}
          2023.07.23~2023.07.31{")"}
          <br />
          해당 기업에 투자할지 여부를 찬/반 투표해 주세요.
        </Text>
        {/* 보유 티켓 */}
        <Text fontSize="lg" mb="5px">
          현재 보유한 티켓 수 : {ownerCount}매
        </Text>
      </Flex>
      {/* 2차 투표 */}
      <Flex justifyContent="center">
        {/* 찬성 투표 */}
        <Flex
          flexDirection="column"
          alignItems="center"
          marginX="30px"
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
          <Text mt="5px" fontSize="md" fontWeight="bold">
            펫프랜즈
          </Text>
          <Text mb="5px" fontSize="lg" fontWeight="bold" color="#6200EE">
            찬성
          </Text>
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
              color={voteyes > 0 ? "#00A29D" : "lightgrey"}
              //기능
              onClick={handleClick_minus_vyes}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text
              //크기
              w="40px"
            >
              {voteyes}
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
              color={voteyes + voteno < ownerCount ? "#00A29D" : "lightgrey"}
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
          marginX="30px"
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
          <Text mt="5px" fontSize="md" fontWeight="bold">
            펫프랜즈
          </Text>
          <Text mb="5px" fontSize="lg" fontWeight="bold" color="#FF0000">
            반대
          </Text>
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
              color={voteno > 0 ? "#00A29D" : "lightgrey"}
              //기능
              onClick={handleClick_minus_vno}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text
              //크기
              w="40px"
            >
              {voteno}
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
              color={voteyes + voteno < ownerCount ? "#00A29D" : "lightgrey"}
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

export default ThrFirstVotingBef;
