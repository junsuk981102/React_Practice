import React from "react";
import { Flex, Heading, Text, Image } from "@chakra-ui/react";

const ComInfoBasic = ({ state }) => {
  //커뮤니티 카테고리 2개 이상일 때 구분
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
      <Flex flexDirection="column" p="25px">
        {/* 커뮤니티 이름 */}
        <Heading size="lg">{state.com_name}</Heading>
        {/* 커뮤니티 카테고리 */}
        <Flex flexDirection="row">
          {comCategory.map((category, index) => (
            <Flex
              key={index}
              justifyContent="center"
              p="5px 10px"
              m="10px 5px 10px 0"
              bg="#00A29D"
              borderRadius="xl"
              fontSize="sm"
              color="white"
            >
              {category}
            </Flex>
          ))}
        </Flex>
        {/* 커뮤니티 설명 */}
        <Text fontSize="md">{state.com_info}</Text>
      </Flex>
    </Flex>
  );
};

export default ComInfoBasic;

//23.07.27 1차 코드 수정
