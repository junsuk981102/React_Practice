import React from "react";
import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";

const ComInfoBasic = ({ state }) => {
  const comCategory = Array.isArray(state.com_category)
    ? state.com_category
    : state.com_category.split(",");

  return (
    <Flex alignItems="center">
      {/* 커뮤니티 프로필 사진 */}
      <Image
        src={state.com_profileImg}
        w="200px"
        h="200px"
        borderRadius="50%"
        objectFit="cover"
      />
      {/* 커뮤니티 기본 정보 */}
      <Flex flexDirection="column" ml="25px">
        {/* 커뮤니티 이름 */}
        <Heading size="lg">{state.com_name}</Heading>
        {/* 커뮤니티 카테고리 */}
        <Flex flexDirection="row">
          {comCategory.map((category, index) => (
            <Box
              key={index}
              textAlign="center"
              w="100px"
              p="5px"
              marginY="10px"
              mr="5px"
              bg="#00A29D"
              borderRadius="xl"
              fontSize="md"
              fontWeight="bold"
              color="white"
            >
              {category}
            </Box>
          ))}
        </Flex>
        {/* 커뮤니티 설명 */}
        <Text fontWeight="bold" fontSize="md">
          {state.com_info}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ComInfoBasic;

//23.07.27 1차 코드 수정
