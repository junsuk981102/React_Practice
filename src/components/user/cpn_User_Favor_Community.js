import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

const FavorCommunity = ({ id, com_profileImg, com_name }) => {
  return (
    <Flex
      key={id}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100px"
      h="110px"
      border="1px solid black"
      borderRadius="xl"
    >
      <Image
        src={com_profileImg}
        w="100px"
        h="80px"
        p="5px"
        borderRadius="xl"
        objectFit="cover"
      />
      <Text fontSize="xs">{com_name}</Text>
    </Flex>
  );
};

export default FavorCommunity;
