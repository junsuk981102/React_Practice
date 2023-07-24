import React from "react";
import Login from "../components/cpn_Login";
import { Flex } from "@chakra-ui/react";

function ScreenLogin() {
  return (
    <>
      {/* 로그인 전체 화면 */}

      {/* 로그인 전체 화면 배경 */}
      <Flex
        //정렬
        justifyContent="center"
        //크기 및 여백
        h="auto"
        pb="200px"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 로그인 창 */}
        <Login />
      </Flex>
    </>
  );
}

export default ScreenLogin;

//23.07.21 1차 코드 수정 완료
