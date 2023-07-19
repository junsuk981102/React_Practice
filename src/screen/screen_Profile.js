import React from "react";
import User from "../components/cpn_User";
import { Box, Heading, useBreakpointValue } from "@chakra-ui/react";
import ScreenMyGovernance from "./screen_My_Governance";

const ScreenProfile = () => {
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        h="auto"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Box flexDirection="column" pr={boxPaddingRight} pl={boxPaddingLeft}>
          <Heading
            //위치
            mt="30px"
            mb="30px"
            //크기
            as="h1"
            size="lg"
          >
            마이페이지
          </Heading>
          <Box
            display="flex"
            textAlign="center"
            justifyContent="space-between"
            flexDirection="column"
            w="700px"
          >
            <User />
          </Box>
        </Box>
        <ScreenMyGovernance />
      </Box>
    </>
  );
};

export default ScreenProfile;
