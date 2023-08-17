import React from "react";
import { Text, Flex, Image } from "@chakra-ui/react";

const TabCommunityInfoFavor = () => {
  return (
    <>
      <Text mb="20px">관심있는 회사 </Text>
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
    </>
  );
};

export default TabCommunityInfoFavor;

//23.08.16 1차 코드 수정
