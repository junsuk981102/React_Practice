import React from "react";
import { Flex } from "@chakra-ui/react";

const ComInfoCurrent = ({ state }) => {
  return (
    <Flex justifyContent="center" m="100px 0 0 0">
      {/* 커뮤니티 참여인원 */}
      <Flex
        alignItems="center"
        justifyContent="center"
        w="120px"
        h="30px"
        bg="#E5F2F2"
        border="1px solid black"
        borderRadius="xl"
        fontSize="md"
      >
        {state.com_member}명 참여중
      </Flex>
    </Flex>
  );
};

export default ComInfoCurrent;

//23.07.27 1차 코드 수정
