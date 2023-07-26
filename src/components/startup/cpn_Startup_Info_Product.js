import React from "react";
import { Text, Image, Flex } from "@chakra-ui/react";

const StartupInfoProduct = ({ state }) => {
  return (
    <Flex flexDirection="column" m="20px">
      <Text fontWeight="bold" fontSize="lg">
        서비스/제품
      </Text>
      <Flex m="15px">
        <Image
          src={state.sup_logo}
          w="60px"
          h="60px"
          borderRadius="3xl"
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
  );
};

export default StartupInfoProduct;
