import Chat from "../components/cpn_Chat";
import { Box, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import "../chat.css";

function ScreenChat() {
  const { state } = useLocation();
  return (
    <>
      <Box
        //크기
        h="100vh"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
        display="flex"
        justifyContent="center"
      >
        <Box p="50px">
          <Heading
            //위치
            mb="30px" //margin bottom
            //크기
            as="h1"
            size="lg"
          >
            {state.com_name} 채팅방
          </Heading>
          <Chat />
        </Box>
      </Box>
    </>
  );
}

export default ScreenChat;
