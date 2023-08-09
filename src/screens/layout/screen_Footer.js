import React from "react";
import { Flex, Text, Image, useBreakpointValue } from "@chakra-ui/react";

function Footer() {
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); // 양쪽 여백

  return (
    <>
      {/* Footer 전체 화면 */}

      {/* Footer 전체 화면 배경 */}
      <Flex
        justifyContent="space-between"
        px={boxPadding}
        py="30px"
        bg="white"
        borderTop="1px solid #00A29D"
      >
        {/* Footer 왼쪽 섹션 */}
        <Flex flexDirection="column">
          {/* 로고 사진 */}
          <Image src="image/main/logo_stot.png" w="143px" h="48px" mb="10px" />
          {/* 기타 정보 */}
          <Text>
            STOT - Security to Token <br />
            서울 강남구 도산대로 15길 22 {"("}브루클린버거 지하{")"}
          </Text>
        </Flex>

        {/* Footer 오른쪽 섹션 */}
        <Flex alignItems="center">
          {/* 연락처 정보 */}
          <Text mr="30px" as="button">
            Twitter
          </Text>
          <Text mr="30px" as="button">
            Instagram
          </Text>
          <Text mr="30px">Email.</Text>
          <Text mr="30px">Tel.</Text>
          <Text as="button">이용약관</Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Footer;

//23.07.21 1차 코드 수정 완료
//23.08.09 2차 코드 수정 완료
