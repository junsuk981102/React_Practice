import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

const ScreenNewsletter = (props) => {
  return (
    <>
      <Box h="100vh" bg="#EAE7DE" display="flex" justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
        >
          <Image src="../image/newneek.png" />
          <Text>기사내용</Text>
        </Box>
      </Box>
    </>
  );
};

export default ScreenNewsletter;
