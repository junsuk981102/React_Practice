import Chat from "../components/cpn_Chat";
import { Box } from "@chakra-ui/react";

function ScreenChat() {
  return (
    <>
      <Box
        //크기
        h="100vh"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Box p="50px">
          <Chat />
        </Box>
      </Box>
    </>
  );
}

export default ScreenChat;
