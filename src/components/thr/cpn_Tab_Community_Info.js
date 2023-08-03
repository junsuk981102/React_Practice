import React from "react";
import TabCommunityInfoBasic from "./info/cpn_Tab_Community_Info_Basic";
import TabCommunityInfoInvest from "./info/cpn_Tab_Community_Info_Invest";
import TabCommunityInfoTicket from "./info/cpn_Tab_Community_Info_Ticket";
import TabCommunityInfoFavor from "./info/cpn_Tab_Community_Info_Favor";
import { Flex } from "@chakra-ui/react";

const TabCommunityInfo = ({ state, ownerCount, setOwnerCount }) => {
  return (
    <>
      <Flex flexDirection="column" p="10px">
        {/* 커뮤니티 기본 정보 섹션 */}
        <TabCommunityInfoBasic state={state} memberCount={state.com_member} />
        {/* 커뮤니티 투자 정보 섹션 */}
        <TabCommunityInfoInvest
          state={state}
          nowInvestment={state.com_now_investment}
          totalInvestment={state.com_total_investment}
        />
        {/* 커뮤니티 티켓 섹션 */}
        <TabCommunityInfoTicket
          ownerCount={ownerCount}
          setOwnerCount={setOwnerCount}
          state={state}
        />
        {/* 커뮤니티 관심회사 섹션 */}
        <TabCommunityInfoFavor />
      </Flex>
    </>
  );
};

export default TabCommunityInfo;
