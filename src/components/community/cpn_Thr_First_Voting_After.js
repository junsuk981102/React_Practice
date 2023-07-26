import React from "react";

import { Text, Flex, Image } from "@chakra-ui/react";

const ThrFirstVotingAft = ({ state }) => {
  const percent1 = 531;
  const percent2 = 135;
  const percent3 = 223;
  const percentA = percent1 + percent2 + percent3;

  return (
    <>
      {/* 정보 */}
      <Flex flexDirection="column" p="10px" mb="30px">
        {/* 제목 */}
        <Flex mb="15px">
          <Text fontSize="2xl" fontWeight="bold" mr="15px">
            1차 투표 종료
          </Text>
          <Image src="../image/community/icon_voting.png" w="30px" h="30px" />
        </Flex>
        {/* 설명 */}
        <Text fontSize="xl" fontWeight="bold" mb="15px">
          {state.com_name} 1차 투표가 종료되었습니다. <br />
          3일 뒤{"("}23.07.26{")"}에 2차 투표가 시작됩니다.
        </Text>

        <Flex flexDirection="column" alignItems="center">
          <Text m="25px" fontSize="lg" fontWeight="bold">
            {"<"}투표 결과{">"}
          </Text>
          <Flex>
            <Flex
              flexDirection="column"
              alignSelf="flex-end"
              textAlign="center"
            >
              <Image
                src="../image/community/company_ex2.png"
                w="150px"
                h="150px"
              />
              <Text fontSize="sm" marginY="5px">
                페오펫
              </Text>
              <Text fontSize="sm">
                {((percent2 / percentA) * 100).toFixed(1) + "%"}
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              alignSelf="flex-end"
              textAlign="center"
              marginX="40px"
            >
              <Image
                src="../image/community/company_ex1.png"
                w="250px"
                h="250px"
              />
              <Text fontSize="2xl" fontWeight="bold" marginY="5px">
                펫프렌즈
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="#00A29D">
                {((percent1 / percentA) * 100).toFixed(1) + "%"}
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              alignSelf="flex-end"
              textAlign="center"
            >
              <Image
                src="../image/community/company_ex3.png"
                w="150px"
                h="150px"
              />
              <Text fontSize="sm" marginY="5px">
                핏펫
              </Text>
              <Text fontSize="sm">
                {((percent3 / percentA) * 100).toFixed(1) + "%"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ThrFirstVotingAft;
