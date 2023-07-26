import React from "react";
import { Flex, Heading, Image, Box, Text } from "@chakra-ui/react";

const VCInfoBasic = ({ state }) => {
  return (
    <Flex alignItems="center" h="auto">
      <Image
        src={state.vc_logo}
        w="200px"
        h="200px"
        borderRadius="xl"
        objectFit="cover"
      />
      <Flex flexDirection="column" ml="25px">
        <Heading size="lg">{state.vc_name}</Heading>
        <Box
          textAlign="center"
          w="100px"
          p="5px"
          marginY="10px"
          bg="#00A29D"
          borderRadius="xl"
          fontWeight="bold"
          fontSize="md"
          color="white"
        >
          {state.vc_category}{" "}
        </Box>
        <Text fontSize="md">{state.vc_info}</Text>
      </Flex>
    </Flex>
  );
};

export default VCInfoBasic;
