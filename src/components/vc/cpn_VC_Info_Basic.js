import React from "react";
import { Flex, Heading, Text, Image } from "@chakra-ui/react";

const VCInfoBasic = ({ state }) => {
  return (
    <>
      {/* VC 기본정보 */}
      <Flex alignItems="center" h="auto">
        {/* VC 로고 */}
        <Image
          src={state.vc_logo}
          w="200px"
          h="200px"
          borderRadius="xl"
          objectFit="cover"
        />
        <Flex flexDirection="column" ml="25px">
          {/* 스타트업 이름 */}
          <Heading size="lg">{state.vc_name}</Heading>
          {/* 스타트업 카테고리 */}
          <Flex
            justifyContent="center"
            w="100px"
            p="5px"
            m="10px 0"
            bg="#00A29D"
            borderRadius="xl"
            fontSize="sm"
            color="white"
          >
            {state.vc_category}
          </Flex>
          {/* 스타트업 설명 */}
          <Text>{state.vc_info}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default VCInfoBasic;

//23.07.27 1차 코드 수정
