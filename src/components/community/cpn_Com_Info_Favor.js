import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

const ComInfoFavor = () => {
  return (
    <Box>
      {/* 커뮤니티 관심있는 회사 */}
      <Text m="0 0 15px 0" fontSize="lg" fontWeight="bold">
        관심있는 회사
      </Text>
      {/* 커뮤니티 관심있는 회사 리스트 */}
      <Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          m="0 10px 0 10px"
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
          <Text m="5px 0 0 0" fontSize="sm">
            펫프랜즈
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          m="0 10px 0 10px"
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
          <Text m="5px 0 0 0" fontSize="sm">
            페오펫
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          m="0 10px 0 10px"
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
          <Text m="5px 0 0 0" fontSize="sm">
            핏펫
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ComInfoFavor;

//23.07.27 1차 코드 수정
