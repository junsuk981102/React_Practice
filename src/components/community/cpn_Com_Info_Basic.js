import React from "react";
import { Heading, Text, Flex, Box, Image } from "@chakra-ui/react";

const ComInfoBasic = ({ state }) => {
  const comCategory = Array.isArray(state.com_category)
    ? state.com_category
    : state.com_category.split(",");

  return (
    <Flex position="relative" alignItems="center">
      {/* 커뮤니티 프로필 사진 */}
      <Image
        src={state.com_profileImg}
        w="200px"
        h="200px"
        borderRadius="50%"
        objectFit="cover"
      />
      {/* 커뮤니티 기본 정보 */}
      <Box ml="25px">
        {/* 커뮤니티 이름 */}
        <Heading size="lg">{state.com_name}</Heading>
        {/* 커뮤니티 카테고리 */}
        <Flex flexDirection="row">
          {comCategory.map((category, index) => (
            <Box
              key={index}
              textAlign="center"
              w="100px"
              h="auto"
              p="5px"
              marginY="10px"
              mr="5px"
              bg="#00A29D"
              borderRadius="xl"
            >
              <Text fontWeight="bold" fontSize="md" color="white">
                {category}
              </Text>
            </Box>
          ))}
        </Flex>
        {/* 커뮤니티 설명 */}
        <Box>
          <Text fontWeight="bold" fontSize="md">
            {state.com_info}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default ComInfoBasic;
