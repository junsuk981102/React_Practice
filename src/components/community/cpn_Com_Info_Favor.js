import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

const ComInfoFavor = () => {
  return (
    <Flex flexDirection="column">
      {/* 커뮤니티 관심있는 회사 */}
      <Text mb="15px " fontSize="lg" fontWeight="bold">
        관심있는 회사
      </Text>
      {/* 커뮤니티 관심있는 회사 리스트 */}
      <Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          m="0 10px"
          p="5px"
          borderRadius="xl"
          boxShadow="0 0 5px #00A29D"
        >
          <Image
            src="../image/community/company_ex1.png"
            w="100px"
            h="100px"
            borderRadius="xl"
          />
          <Text mt="5px" fontSize="sm">
            펫프랜즈
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          m="0 10px"
          p="5px"
          borderRadius="xl"
          boxShadow="0 0 5px #00A29D"
        >
          <Image
            src="../image/community/company_ex2.png"
            w="100px"
            h="100px"
            borderRadius="xl"
          />
          <Text mt="5px" fontSize="sm">
            페오펫
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          m="0 10px"
          p="5px"
          borderRadius="xl"
          boxShadow="0 0 5px #00A29D"
        >
          <Image
            src="../image/community/company_ex3.png"
            w="100px"
            h="100px"
            borderRadius="xl"
          />
          <Text mt="5px" fontSize="sm">
            핏펫
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ComInfoFavor;

//23.07.27 1차 코드 수정
//23.08.07 2차 코드 수정
