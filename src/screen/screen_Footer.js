import React from "react";
import { Box, Image, Button, useBreakpointValue, Text } from "@chakra-ui/react";

function Header(props) {
  const boxPaddingLeft = useBreakpointValue({ base: "100px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "100px", xl: "200px" });

  return (
    <>
      <Box
        bg="#E5F2F2"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        borderTop="1px solid #00A29D"
        pt="25px"
        pb="25px"
      >
        <Box display="flex" flexDirection="column" alignContent="start">
          <Image
            w="143px"
            h="48px"
            mb="10px"
            src="image/stot_minilogo.png"
            alt="logo"
          />
          <Text mb="10px">STOT - Security to Token</Text>
          <Text>서울 강남구 도산대로 15길 22 (브루클린버거 지하)</Text>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Button mr="32px" fontSize="m" fontWeight="bold" variant="none">
            Twitter
          </Button>

          <Button mr="32px" fontSize="m" fontWeight="bold" variant="none">
            Instagram
          </Button>

          <Text mr="32px" as="b" fontSize="m">
            Email.
          </Text>

          <Text mr="32px" as="b" fontSize="m">
            Tel.
          </Text>

          <Button variant="link">이용약관</Button>
        </Box>
      </Box>
    </>
  );
}

export default Header;
