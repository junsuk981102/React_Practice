import React from "react";
import { useState } from "react";
import { Flex, Text, Button, Image } from "@chakra-ui/react";

const TabVotingFirstBefore = ({ state, ownerCount, setOwnerCount }) => {
  const [votefirstBefore, setVoteFirstBefore] = useState(0); //1차 투표 여부
  const [vote1, setVote1] = useState(0); //후보 1번 투표
  const [vote2, setVote2] = useState(0); //후보 2번 투표
  const [vote3, setVote3] = useState(0); //후보 3번 투표
  const percent1 = 531; // 1번 득표
  const percent2 = 135; // 2번 득표
  const percent3 = 223; // 3번 득표
  const percentA = percent1 + percent2 + percent3; // 총 득표
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
      setOwnerCount(0);
    }
  };

  const votingFirstButton = () => {
    if (votefirstBefore === 0) {
      return (
        <>
          <Flex justifyContent="center" m="60px 0 0 0">
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
              fontSize="lg"
              color="white"
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
      <Flex flexDirection="column" p="10px">
        {/* 제목 */}
        <Flex m="0 0 15px 0">
          <Text fontSize="2xl" fontWeight="bold" m="0 15px 0 0">
            1차 투표 중
          </Text>
          <Image src="../image/community/icon_voting.png" w="30px" h="30px" />
        </Flex>
        {/* 설명 */}
        <Text>
          {state.com_name} 1차 투표 기간입니다. {"("}
          2023.07.23~2023.07.31{")"}
          <br />
          원하는 기업에 보유한 티켓 개수만큼 투표해주세요.
        </Text>
        {/* 보유 티켓 */}
        <Text m="15px 0">현재 보유한 티켓 수 : {ownerCount}매</Text>
      </Flex>
      {/* 1차 투표 */}
      <Flex justifyContent="center">
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
              color={vote1 > 0 ? "#00A29D" : "lightgrey"}
              onClick={handleClick_minus_v1}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text w="30px">{vote1}</Text>
            {/* 플러스 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
              color={
                vote1 + vote2 + vote3 < ownerCount ? "#00A29D" : "lightgrey"
              }
              onClick={handleClick_plus_v1}
            >
              +
            </Button>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          p="5px"
          m="0 60px"
          borderRadius="xl"
          boxShadow="0 0 5px #00A29D"
        >
          <Image
            src="../image/community/company_ex2.png"
            w="150px"
            h="150px"
            borderRadius="xl"
          />
          <Text m="5px 0" fontWeight="bold">
            페오펫
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
              color={vote2 > 0 ? "#00A29D" : "lightgrey"}
              onClick={handleClick_minus_v2}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text w="40px">{vote2}</Text>
            {/* 플러스 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
              color={
                vote1 + vote2 + vote3 < ownerCount ? "#00A29D" : "lightgrey"
              }
              onClick={handleClick_plus_v2}
            >
              +
            </Button>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
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
          <Text m="5px 0" fontWeight="bold">
            핏펫
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
              color={vote3 > 0 ? "#00A29D" : "lightgrey"}
              onClick={handleClick_minus_v3}
            >
              -
            </Button>
            {/* 구매 갯수 */}
            <Text w="30px">{vote3}</Text>
            {/* 플러스 버튼 */}
            <Button
              variant="none"
              fontSize="2xl"
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

export default TabVotingFirstBefore;

//23.07.27 1차 코드 수정