import React from "react";
import { Box, Text, Image, useBreakpointValue } from "@chakra-ui/react";

const ScreenNewsletter = (props) => {
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20x", xl: "200px" });
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
