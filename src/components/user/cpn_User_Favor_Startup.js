import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

const FavorStartup = ({ id, sup_logo, sup_name }) => {
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
        src={sup_logo}
        w="100px"
        h="80px"
        p="5px"
        borderRadius="xl"
        objectFit="cover"
      />
      <Text fontSize="xs">{sup_name}</Text>
    </Flex>
  );
};

export default FavorStartup;
