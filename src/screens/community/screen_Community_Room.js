import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";

import ThrTab from "../../components/community/cpn_Thr_Tab";
import ThrComInfo from "../../components/community/cpn_Thr_Com_Info";

function ScreenChat() {
  const { state } = useLocation();
  const [ownerCount, setOwnerCount] = useState(state.com_owner); //티켓 소유 갯수

  let comCategory = [];
  if (typeof state.com_category === "string") {
    comCategory = state.com_category.split(",");
  } else if (Array.isArray(state.com_category)) {
    comCategory = state.com_category;
  } else {
    console.error("Invalid category format");
  }

  return (
    <>
      {/* 커뮤니티 전체 화면 */}

      {/* 커뮤니티 전체 화면 배경 */}
      <Flex
        //정렬
        flexDirection="column"
        alignItems="center"
        //크기 및 여백
        h="auto"
        pb="200px"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 커뮤니티 이름 */}
        <Heading
          //크기 및 여백
          size="md"
          mt="30px"
          mb="30px"
        >
          {state.com_name}
        </Heading>
        {/* 커뮤니티 구조 */}
        <Flex
          flexDirection="column"
          w="750px"
          h="auto"
          maxH="1500px"
          pb="50px"
          bg="white"
          border="1px solid black"
        >
          {/* 커뮤니티 정보 섹션 */}
          <ThrComInfo state={state} comCategory={comCategory} />

          {/* 커뮤니티 Tab */}
          <ThrTab
            state={state}
            ownerCount={ownerCount}
            setOwnerCount={setOwnerCount}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default ScreenChat;
