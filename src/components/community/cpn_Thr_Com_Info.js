import React from "react";
import { Flex, Heading, Text, Image } from "@chakra-ui/react";

function ThrComInfo({ state, comCategory }) {
  return (
    <Flex flexDirection="column">
      {/* 커뮤니티 사진 */}
      <Image
        src="../image/community/communitybg_ex.png"
        w="100%"
        h="200px"
      ></Image>
      {/* 커뮤니티 정보 */}
      <Flex flexDirection="column" h="150px" p="20px" bg="#00A29D">
        <Flex>
          {/* 커뮤니티 이름 */}
          <Heading size="md" color="white">
            {state.com_name}
          </Heading>
          {/* 커뮤니티 카테고리 */}
          <Flex>
            {comCategory.map((category, index) => (
              <Flex
                key={index}
                justifyContent="center"
                p="3px 7px"
                m="0 0 0 5px"
                bg="#E5F2F2"
                borderRadius="xl"
                fontSize="xs"
                color="black"
              >
                {category}
              </Flex>
            ))}
          </Flex>
        </Flex>
        {/* 커뮤니티 설명 */}
        <Text m="20px 0" fontSize="sm" color="white">
          {state.com_info}
        </Text>
      </Flex>
    </Flex>
  );
}

export default ThrComInfo;

//23.07.27 1차 코드 수정
