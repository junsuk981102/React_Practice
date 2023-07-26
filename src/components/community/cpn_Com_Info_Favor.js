import React from "react";
import { Text, Box, Flex, Image } from "@chakra-ui/react";

const ComInfoFavor = () => {
  return (
    <Box>
      <Text mb="15px" fontSize="lg" fontWeight="bold">
        관심있는 회사
      </Text>
      <Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          marginX="10px"
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
          marginX="20px"
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
          marginX="10px"
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
    </Box>
  );
};

export default ComInfoFavor;
