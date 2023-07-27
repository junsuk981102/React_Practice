import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

const TabVotingFirstAfter = ({ state }) => {
  const percent1 = 531; // 1번 득표
  const percent2 = 135; // 2번 득표
  const percent3 = 223; // 3번 득표
  const percentA = percent1 + percent2 + percent3; // 총 득표

  return (
    <>
      {/* 정보 */}
      <Flex flexDirection="column" p="10px">
        {/* 제목 */}
        <Flex m="0 0 15px 0">
          <Text fontSize="2xl" fontWeight="bold" m="0 15px 0 0">
            1차 투표 종료
          </Text>
          <Image src="../image/community/icon_voting.png" w="30px" h="30px" />
        </Flex>
        {/* 설명 */}
        <Text m="0 0 15px 0">
          {state.com_name} 1차 투표가 종료되었습니다. <br />
          3일 뒤{"("}23.07.26{")"}에 2차 투표가 시작됩니다.
        </Text>
        {/* 결과 */}
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
              <Text m="5px 0">페오펫</Text>
              <Text>{((percent2 / percentA) * 100).toFixed(1) + "%"}</Text>
            </Flex>
            <Flex
              flexDirection="column"
              alignSelf="flex-end"
              textAlign="center"
              m="0 40px 0 40px"
            >
              <Image
                src="../image/community/company_ex1.png"
                w="250px"
                h="250px"
              />
              <Text fontSize="2xl" fontWeight="bold" m="5px 0">
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
              <Text m="5px 0">핏펫</Text>
              <Text>{((percent3 / percentA) * 100).toFixed(1) + "%"}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default TabVotingFirstAfter;

//23.07.27 1차 코드 수정
