import React from "react";
import User from "../components/cpn_User";
import ScreenMyGovernance from "./screen_My_Governance";
import { Box, Heading, useBreakpointValue } from "@chakra-ui/react";

const ScreenProfile = () => {
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
  return (
    <>
      <Box
        //정렬
        display="flex"
        flexDirection="column"
        justifyContent="center"
        //크기
        h="auto"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Box
          //정렬
          flexDirection="column"
          //여백
          pr={boxPaddingRight}
          pl={boxPaddingLeft}
        >
          <Heading
            //여백
            mt="30px"
            mb="30px"
            //글자
            as="h1"
            size="lg"
          >
            마이페이지
          </Heading>
          <Box
            //정렬
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            textAlign="center"
            //크기
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
