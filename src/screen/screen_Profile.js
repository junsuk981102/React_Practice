import React from "react";
import User from "../components/cpn_User";
import { Box, Heading } from "@chakra-ui/react";

const ScreenProfile = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        h="100vh"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Box flexDirection="column">
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
      </Box>
    </>
  );
};

export default ScreenProfile;
