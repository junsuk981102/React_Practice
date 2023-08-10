import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

const StartupInfoProduct = ({ state }) => {
  return (
    <>
      {/* 스타트업 서비스/제품 */}
      <Flex flexDirection="column" m="20px">
        <Text fontWeight="bold" fontSize="lg">
          서비스/제품
        </Text>
        <Flex m="15px">
          <Image
            src={state.sup_logo}
            w="60px"
            h="60px"
            borderRadius="50%"
            objectFit="cover"
          />
          <Flex flexDirection="column" m="7px">
            <Text fontSize="lg">{state.sup_name}</Text>
            <Text fontSize="sm" color="#00A29D">
              간편 모바일 반려동물등록 서비스
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default StartupInfoProduct;

//23.07.27 1차 코드 수정
//23.08.08 2차 코드 수정
