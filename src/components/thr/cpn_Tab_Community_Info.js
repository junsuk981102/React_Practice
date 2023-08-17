import React from "react";
import TabCommunityInfoBasic from "./info/cpn_Tab_Community_Info_Basic";
import TabCommunityInfoInvest from "./info/cpn_Tab_Community_Info_Invest";
import TabCommunityInfoTicket from "./info/cpn_Tab_Community_Info_Ticket";
import TabCommunityInfoFavor from "./info/cpn_Tab_Community_Info_Favor";
import { Flex } from "@chakra-ui/react";

const TabCommunityInfo = ({ state, userId, ownerCount }) => {
  return (
    <>
      <Flex flexDirection="column" p="10px">
        {/* 커뮤니티 기본 정보 섹션 */}
        <TabCommunityInfoBasic state={state} />
        {/* 커뮤니티 투자 정보 섹션 */}
        <TabCommunityInfoInvest state={state} />
        {/* 커뮤니티 티켓 섹션 */}
        <TabCommunityInfoTicket
          state={state}
          userId={userId}
          ownerCount={ownerCount}
        />
        {/* 커뮤니티 관심회사 섹션 */}
        <TabCommunityInfoFavor />
      </Flex>
    </>
  );
};

export default TabCommunityInfo;

//23.08.16 1차 코드 수정
