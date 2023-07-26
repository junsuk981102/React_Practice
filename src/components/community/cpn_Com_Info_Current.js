import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const ComInfoCurrent = ({ state }) => {
  return (
    <Flex textAlign="center" justifyContent="center" mt="100px">
      <Flex
        alignItems="center"
        justifyContent="center"
        w="120px"
        h="30px"
        bg="#E5F2F2"
        border="1px solid black"
        borderRadius="xl"
        fontSize="md"
        fontWeight="bold"
      >
        <Text>{state.com_member}명 참여중</Text>
      </Flex>
    </Flex>
  );
};

export default ComInfoCurrent;
