import React from "react";
import { Button, Flex } from "@chakra-ui/react";

const ComInfoEnter = ({ ownerCount, handleClick_chat }) => {
  return (
    <Flex justifyContent="center" p="20px">
      <Button
        w="600px"
        h="60px"
        bg={ownerCount > 0 ? "#00A29D" : "grey"}
        borderRadius="xl"
        variant="none"
        fontSize="lg"
        fontWeight="bold"
        color="white"
        onClick={handleClick_chat}
      >
        커뮤니티 참여하기
      </Button>
    </Flex>
  );
};

export default ComInfoEnter;
