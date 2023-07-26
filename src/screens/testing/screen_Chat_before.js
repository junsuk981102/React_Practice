import { useLocation } from "react-router-dom";
import Chat from "../../components/chat/cpn_Chat";
import "../chat.css";
import { Box, Heading } from "@chakra-ui/react";

function ScreenChat() {
  const { state } = useLocation();

  return (
    <>
      {/* 채팅방 전체 화면 */}

      {/* 채팅방 전체 화면 배경 */}
      <Box
        //정렬
        display="flex"
        justifyContent="center"
        //크기 및 여백
        h="auto"
        pb="100px"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 채팅방 이름 & 채팅 화면 */}
        <Box>
          {/* 채팅방 이름 */}
          <Heading
            //크기 및 여백
            as="h1"
            size="lg"
            mt="30px"
            mb="30px"
          >
            {state.com_name} 채팅방
          </Heading>
          {/* 채팅 화면 */}
          <Chat />
        </Box>
      </Box>
    </>
  );
}

export default ScreenChat;
