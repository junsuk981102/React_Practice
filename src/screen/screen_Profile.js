import React from "react";
import User from "../components/cpn_User";
import ScreenMyGovernance from "./screen_My_Governance";
import { Flex } from "@chakra-ui/react";

const ScreenProfile = () => {
  return (
    <>
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
        {/* 마이페이지 섹션 */}
        <User />
        {/* 지갑&티켓 섹션 */}
        <ScreenMyGovernance />
      </Flex>
    </>
  );
};

export default ScreenProfile;

//23.07.24 1차 코드 수정 완료
