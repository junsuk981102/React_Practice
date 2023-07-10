import Login from "../components/cpn_Login";
import { Box } from "@chakra-ui/react";

function ScreenLogin() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        h="100vh"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Box w="700px">
          <Login />
        </Box>
      </Box>
    </>
  );
}

export default ScreenLogin;
