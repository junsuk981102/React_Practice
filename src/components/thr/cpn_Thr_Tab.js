import React, { useState } from "react";
import TabVotingFirstBefore from "./cpn_Tab_Voting_First_Before";
import TabVotingFirstAfter from "./cpn_Tab_Voting_First_After";
import TabVotingSecondBefore from "./cpn_Tab_Voting_Second_Before";
import TabVotingSecondAfter from "./cpn_Tab_Voting_Second_After";
import TabCommunityInfo from "./cpn_Tab_Community_Info";
import Chat from "../chat/cpn_Chat";
import "../../chat.css";
import {
  Flex,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import Threads from "./cpn_Threads";

function ThrTab({ userObj, state, ownerCount, setOwnerCount }) {
  const [selectedTab, setSelectedTab] = useState(0);
  // TabPanel의 높이를 설정
  const tabPanelHeight = "100vh";

  return (
    <Tabs
      isFitted
      position="relative"
      size="lg"
      variant="unstyled"
      index={selectedTab} // 현재 선택된 탭의 인덱스를 지정
      onChange={(index) => setSelectedTab(index)} // 탭이 변경될 때 상태를 업데이트
    >
      <TabList>
        {/* 탭 버튼 */}
        <Tab
          fontSize="sm"
          fontWeight="bold"
          color={selectedTab === 0 ? "#00A29D" : "black"}
        >
          스레드
        </Tab>
        <Tab
          fontSize="sm"
          fontWeight="bold"
          color={selectedTab === 1 ? "#00A29D" : "black"}
        >
          1차 투표
        </Tab>
        <Tab
          fontSize="sm"
          fontWeight="bold"
          color={selectedTab === 2 ? "#00A29D" : "black"}
        >
          1차 결과
        </Tab>
        <Tab
          fontSize="sm"
          fontWeight="bold"
          color={selectedTab === 3 ? "#00A29D" : "black"}
        >
          2차 투표
        </Tab>
        <Tab
          fontSize="sm"
          fontWeight="bold"
          color={selectedTab === 4 ? "#00A29D" : "black"}
        >
          2차 결과
        </Tab>
        <Tab
          fontSize="sm"
          fontWeight="bold"
          color={selectedTab === 5 ? "#00A29D" : "black"}
        >
          정보
        </Tab>
      </TabList>
      <TabIndicator m="-1.5px 0 0 40px" maxWidth="50px" h="2px" bg="#00A29D" />

      <Divider />

      {/* 정보창 */}
      <TabPanels>
        {/* 스레드 */}
        <TabPanel>
          <Flex
            flexDirection="column"
            p="10px"
            h={tabPanelHeight}
            overflowY="auto"
          >
            <Threads userObj={userObj} />
          </Flex>
        </TabPanel>
        {/* 1차 투표 */}
        <TabPanel>
          <TabVotingFirstBefore
            state={state}
            ownerCount={ownerCount}
            setOwnerCount={setOwnerCount}
          />
        </TabPanel>
        {/* 1차 결과 */}
        <TabPanel>
          <TabVotingFirstAfter state={state} />
        </TabPanel>
        {/* 2차 투표 */}
        <TabPanel>
          <TabVotingSecondBefore
            state={state}
            ownerCount={ownerCount}
            setOwnerCount={setOwnerCount}
          />
        </TabPanel>
        {/* 2차 결과 */}
        <TabPanel>
          <TabVotingSecondAfter state={state} />
        </TabPanel>
        {/* 정보 */}
        <TabPanel>
          <TabCommunityInfo
            state={state}
            ownerCount={ownerCount}
            setOwnerCount={setOwnerCount}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ThrTab;

//23.07.27 1차 코드 수정
