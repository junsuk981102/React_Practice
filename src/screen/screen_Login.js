import Login from "../components/cpn_Login";
import { Box } from "@chakra-ui/react";

function ScreenLogin() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        h="auto"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
        pb="200px"
      >
        <Box w="700px">
          <Login />
        </Box>
      </Box>
    </>
  );
}

export default ScreenLogin;
