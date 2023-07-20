import React from "react";
import Register from "../components/cpn_Register";
import { Box } from "@chakra-ui/react";

function ScreenRegister() {
  return (
    <>
      {/* 회원가입 전체 화면 */}

      {/* 회원가입 전체 배경 화면 */}
      <Box
        //정렬
        display="flex"
        alignItems="center"
        justifyContent="center"
        //크기 및 여백
        h="auto"
        pb="50px"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 회원가입 창 */}
        <Register />
      </Box>
    </>
  );
}

export default ScreenRegister;
