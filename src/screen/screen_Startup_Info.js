import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

const ScreenStartupInfo = () => {
  const boxPaddingLeft = useBreakpointValue({ base: "50px", xl: "500px" });
  const boxPaddingRight = useBreakpointValue({ base: "10px", xl: "500px" });
  const { state } = useLocation();

  return (
    <>
      <Box
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        h="100vh"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Heading
          //위치
          mt="30px"
          mb="30px"
          //크기
          as="h1"
          size="lg"
        >
          스타트업 소개
        </Heading>

        <Box
          w="1000px"
          h="1000px"
          p="30px"
          bg="white"
          border="3px solid #00A29D"
          borderRadius="lg"
        >
          <Box display="flex" position="relative" alignItems="center">
            <Image
              src={state.sup_logo}
              alt="logo"
              w="200px"
              h="200px"
              borderRadius="lg"
            />
            <Text
              //위치
              ml="20px"
              //크기
              as="b"
              fontSize="5xl"
            >
              {state.sup_name}
            </Text>
          </Box>

          <Box
            mt="15px"
            w="200px"
            bg="#00A29D"
            borderRadius="lg"
            p="5px"
            textAlign="center"
          >
            <Text as="b" color="white" fontSize="lg">
              {state.sup_category}
            </Text>
          </Box>

          <Box mt="30px">
            <Text as="b" fontSize="2xl">
              {state.sup_info}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScreenStartupInfo;
