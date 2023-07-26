import React from "react";
import { Flex, Heading, Image, Text, Box } from "@chakra-ui/react";

function ThrComInfo({ state, comCategory }) {
  return (
    <Flex flexDirection="column">
      {/* 커뮤니티 사진 */}
      <Image
        src="../image/community/communitybg_ex.png"
        w="750px"
        h="200px"
      ></Image>
      {/* 커뮤니티 정보 */}
      <Flex flexDirection="column" h="150px" p="20px" bg="#00A29D">
        <Flex>
          {/* 커뮤니티 이름 */}
          <Heading
            //글자
            size="md"
            color="white"
          >
            {state.com_name}
          </Heading>
          {/* 커뮤니티 카테고리 */}
          <Flex>
            {comCategory.map((category, index) => (
              <Box
                key={index}
                //정렬
                textAlign="center"
                justifyContent="center"
                //크기 및 여백
                w="auto"
                p="5px"
                ml="10px"
                //배경
                bg="#E5F2F2"
                borderRadius="lg"
                //글자
                fontSize="xs"
                color="black"
              >
                {category}
              </Box>
            ))}
          </Flex>
        </Flex>
        {/* 커뮤니티 설명 */}
        <Text
          //여백
          mt="20px"
          //글자
          fontSize="sm"
          color="white"
        >
          {state.com_info}
        </Text>
      </Flex>
    </Flex>
  );
}

export default ThrComInfo;
