import Chat from "../components/cpn_Chat";
import { Box, Heading } from "@chakra-ui/react";
import "../chat.css";

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
          <Heading
            //위치
            mt="30px"
            mb="30px"
            //크기
            as="h1"
            size="lg"
          >
            커뮤니티 채팅방
          </Heading>
          <Chat />
        </Box>
      </Box>
    </>
  );
}

export default ScreenChat;
