import React from "react";
import { useState } from "react";

import { Button, Text, Flex, Image } from "@chakra-ui/react";

const ThrFirstVotingBef = ({ state, ownerCount }) => {
  const [votefirstBefore, setVoteFirstBefore] = useState(0);
  const [vote1, setVote1] = useState(0); //후보 1번 투표
  const [vote2, setVote2] = useState(0); //후보 2번 투표
  const [vote3, setVote3] = useState(0); //후보 3번 투표
  const percent1 = 531;
  const percent2 = 135;
  const percent3 = 223;
  const percentA = percent1 + percent2 + percent3;

  //후보 1번 투표
  const handleClick_plus_v1 = () => {
    if (vote1 + vote2 + vote3 < ownerCount) {
      setVote1(vote1 + 1);
    }
  };
  const handleClick_minus_v1 = () => {
    if (vote1 > 0) {
      setVote1(vote1 - 1);
    }
  };
  //후보 2번 투표
  const handleClick_plus_v2 = () => {
    if (vote1 + vote2 + vote3 < ownerCount) {
      setVote2(vote2 + 1);
    }
  };
  const handleClick_minus_v2 = () => {
    if (vote2 > 0) {
      setVote2(vote2 - 1);
    }
  };
  //후보 3번 투표
  const handleClick_plus_v3 = () => {
    if (vote1 + vote2 + vote3 < ownerCount) {
      setVote3(vote3 + 1);
    }
  };
  const handleClick_minus_v3 = () => {
    if (vote3 > 0) {
      setVote3(vote3 - 1);
    }
  };
  //1차 투표
  const votingFirst = () => {
    if (vote1 + vote2 + vote3 === ownerCount) {
      setVoteFirstBefore(1);
      setVote1(0);
      setVote2(0);
      setVote3(0);
      ownerCount = 0;
    }
  };

  const votingFirstButton = () => {
    if (votefirstBefore === 0) {
      return (
        <>
          <Flex justifyContent="center" mt="60px">
            <Button
              w="300px"
              h="50px"
              borderRadius="3xl"
              bg={
                vote1 + vote2 + vote3 === ownerCount && ownerCount > 0
                  ? "#00A29D"
                  : "lightgrey"
              }
              variant="none"
              color="white"
              fontSize="lg"
              onClick={votingFirst}
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
                w={(percent1 / percentA) * 100 + "%"}
                h="60px"
                bg="#FF4181" //핑크색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percent1 / percentA) * 100).toFixed(1) + "%"}
              </Flex>
              <Flex
                w={(percent2 / percentA) * 100 + "%"}
                h="60px"
                bg="#00ACED" //하늘색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percent2 / percentA) * 100).toFixed(1) + "%"}
              </Flex>

              <Flex
                w={(percent3 / percentA) * 100 + "%"}
                h="60px"
                bg="#0050FF" //파란색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percent3 / percentA) * 100).toFixed(1) + "%"}
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
            1차 투표 중
          </Text>
          <Image src="../image/community/icon_voting.png" w="30px" h="30px" />
        </Flex>
        {/* 설명 */}
        <Text fontSize="xl" fontWeight="bold" mb="15px">
          {state.com_name} 1차 투표 기간입니다. {"("}
          2023.07.23~2023.07.31{")"}
          <br />
          원하는 기업에 보유한 티켓 개수만큼 투표해주세요.
        </Text>
        {/* 보유 티켓 */}
        <Text fontSize="lg" mb="5px">
          현재 보유한 티켓 수 : {ownerCount}매
        </Text>
      </Flex>
      {/* 1차 투표 */}
      <Flex justifyContent="center">
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
            w="150px"
            h="150px"
            borderRadius="xl"
          />
          <Text marginY="5px" fontSize="md" fontWeight="bold">
            펫프랜즈
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
              color={vote1 > 0 ? "#00A29D" : "lightgrey"}
              //기능
              onClick={handleClick_minus_v1}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text
              //크기
              w="40px"
            >
              {vote1}
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
                vote1 + vote2 + vote3 < ownerCount ? "#00A29D" : "lightgrey"
              }
              //기능
              onClick={handleClick_plus_v1}
            >
              +
            </Button>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          marginX="40px"
          p="5px"
          borderRadius="xl"
          boxShadow="0 0 5px #00A29D"
        >
          <Image
            src="../image/community/company_ex2.png"
            w="150px"
            h="150px"
            borderRadius="xl"
          />
          <Text mt="5px" fontSize="md" fontWeight="bold">
            페오펫
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
              color={vote2 > 0 ? "#00A29D" : "lightgrey"}
              //기능
              onClick={handleClick_minus_v2}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text
              //크기
              w="40px"
            >
              {vote2}
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
                vote1 + vote2 + vote3 < ownerCount ? "#00A29D" : "lightgrey"
              }
              //기능
              onClick={handleClick_plus_v2}
            >
              +
            </Button>
          </Flex>
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
            w="150px"
            h="150px"
            borderRadius="xl"
          />
          <Text mt="5px" fontSize="md" fontWeight="bold">
            핏펫
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
              color={vote3 > 0 ? "#00A29D" : "lightgrey"}
              //기능
              onClick={handleClick_minus_v3}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text
              //크기
              w="40px"
            >
              {vote3}
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
                vote1 + vote2 + vote3 < ownerCount ? "#00A29D" : "lightgrey"
              }
              //기능
              onClick={handleClick_plus_v3}
            >
              +
            </Button>
          </Flex>
        </Flex>
      </Flex>
      {/* 투표하기 버튼 */}
      {votingFirstButton()}
    </>
  );
};

export default ThrFirstVotingBef;
