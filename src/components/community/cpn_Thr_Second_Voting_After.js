import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

const ThrFirstVotingAft = ({ state }) => {
  const percentyes = 642; // 찬성 득표
  const percentno = 424; // 반대 득표
  const percentyesorno = percentyes + percentno; // 총 득표

  return (
    <>
      {/* 정보 */}
      <Flex flexDirection="column" p="10px">
        {/* 제목 */}
        <Flex m="0 0 15px 0">
          <Text fontSize="2xl" fontWeight="bold" m="0 15px 0 0">
            2차 투표 종료
          </Text>
          <Image src="../image/community/icon_voting.png" w="30px" h="30px" />
        </Flex>
        {/* 설명 */}
        <Text m="0 0 15px 0">
          {state.com_name} 2차 투표가 모두 종료되었습니다. <br />
          투표 결과에 따라, 1주일 이내에 {"["}펫프렌즈{"]"}에 대한 투자 계약이
          시작됩니다.
        </Text>

        <Flex flexDirection="column" alignItems="center">
          <Text m="25px" fontSize="lg" fontWeight="bold">
            {"<"}투표 결과{">"}
          </Text>
          <Flex flexDirection="column" textAlign="center">
            <Image
              src="../image/community/company_ex1.png"
              w="250px"
              h="250px"
            />
            <Text fontSize="2xl" fontWeight="bold" m="5px 0">
              펫프렌즈
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="#00A29D">
              {((percentyes / percentyesorno) * 100).toFixed(1) + "%"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ThrFirstVotingAft;

//23.07.27 1차 코드 수정
