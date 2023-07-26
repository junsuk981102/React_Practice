import React from "react";

import { Text, Flex, Image } from "@chakra-ui/react";

const ThrFirstVotingAft = ({ state }) => {
  const percentyes = 642;
  const percentno = 424;
  const percentyesorno = percentyes + percentno;

  return (
    <>
      {/* 정보 */}
      <Flex flexDirection="column" p="10px" mb="30px">
        {/* 제목 */}
        <Flex mb="15px">
          <Text fontSize="2xl" fontWeight="bold" mr="15px">
            2차 투표 종료
          </Text>
          <Image src="../image/community/icon_voting.png" w="30px" h="30px" />
        </Flex>
        {/* 설명 */}
        <Text fontSize="xl" fontWeight="bold" mb="15px">
          {state.com_name} 2차 투표가 모두 종료되었습니다. <br />
          투표 결과에 따라, 1주일 이내에 {"["}펫프렌즈{"]"}에 대한 투자 계약이
          시작됩니다.
        </Text>

        <Flex flexDirection="column" alignItems="center">
          <Text m="25px" fontSize="lg" fontWeight="bold">
            {"<"}투표 결과{">"}
          </Text>
          <Flex flexDirection="column" textAlign="center" marginX="40px">
            <Image
              src="../image/community/company_ex1.png"
              w="250px"
              h="250px"
            />
            <Text fontSize="2xl" fontWeight="bold" marginY="5px">
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
