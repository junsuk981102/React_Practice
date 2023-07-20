import React from "react";
import { Box, Image, Button, useBreakpointValue, Text } from "@chakra-ui/react";

function Footer() {
  // 양쪽 여백
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });

  return (
    <>
      {/* Footer 전체 화면 */}

      {/* Footer 전체 화면 배경 */}
      <Box
        //정렬
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        //여백
        pt="25px"
        pb="25px"
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        //배경
        bg="white"
        borderTop="1px solid #00A29D"
      >
        {/* Footer 왼쪽 섹션 */}
        <Box
          //정렬
          display="flex"
          flexDirection="column"
          alignContent="start"
        >
          {/* 로고 사진 */}
          <Image
            //사진 위치
            src="image/stot_minilogo.png"
            //크기 및 여백
            w="143px"
            h="48px"
            mb="10px"
          />
          {/* 기타 정보 */}
          <Text
            //여백
            mb="10px"
          >
            STOT - Security to Token
          </Text>
          <Text>
            서울 강남구 도산대로 15길 22 {"("}브루클린버거 지하{"("}
          </Text>
        </Box>

        {/* Footer 오른쪽 섹션 */}
        <Box
          // 위치 및 정렬
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          {/* 연락처 정보 */}
          <Button
            //여백
            mr="32px"
            //글자
            fontSize="md"
            fontWeight="bold"
            //배경
            variant="none"
          >
            Twitter
          </Button>
          <Button
            //여백
            mr="32px"
            //글자
            fontSize="md"
            fontWeight="bold"
            //배경
            variant="none"
          >
            Instagram
          </Button>
          <Text
            //여백
            mr="32px"
            //글자
            as="b"
            fontSize="md"
          >
            Email.
          </Text>
          <Text
            //여백
            mr="32px"
            //글자
            as="b"
            fontSize="md"
          >
            Tel.
          </Text>
          <Button
            //배경
            variant="link"
          >
            이용약관
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
