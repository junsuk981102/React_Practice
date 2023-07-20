import Login from "../components/cpn_Login";
import { Box } from "@chakra-ui/react";

function ScreenLogin() {
  return (
    <>
      {/* 로그인 전체 화면 */}

      {/* 로그인 전체 화면 배경 */}
      <Box
        //정렬
        display="flex"
        justifyContent="center"
        //크기 및 여백
        h="auto"
        pb="200px"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 로그인 창 */}
        <Box
          //크기
          w="700px"
        >
          <Login />
        </Box>
      </Box>
    </>
  );
}

export default ScreenLogin;
