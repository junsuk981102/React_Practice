import React from "react";
import Register from "../../components/user/cpn_Register";
import { Flex } from "@chakra-ui/react";

function ScreenRegister() {
  return (
    <>
      {/* 회원가입 전체 화면 */}

      {/* 회원가입 전체 배경 화면 */}
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
        {/* 회원가입 창 */}
        <Register />
      </Flex>
    </>
  );
}

export default ScreenRegister;

//23.07.24 1차 코드 수정 완료
