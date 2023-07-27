import React, { useState } from "react";
import ThrFirstVotingBef from "./cpn_Thr_First_Voting_Before";
import ThrFirstVotingAft from "./cpn_Thr_First_Voting_After";
import ThrSecondVotingBef from "./cpn_Thr_Second_Voting_Before";
import ThrSecondVotingAft from "./cpn_Thr_Second_Voting_After";
import ThrTabInfo from "./cpn_Thr_Tab_Info";
import Chat from "../../components/chat/cpn_Chat";
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

function ThrTab({ state, ownerCount, setOwnerCount }) {
  const [selectedTab, setSelectedTab] = useState(0);

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
          <Flex flexDirection="column" p="10px">
            <Chat />
          </Flex>
        </TabPanel>
        {/* 1차 투표 */}
        <TabPanel>
          <ThrFirstVotingBef
            state={state}
            ownerCount={ownerCount}
            setOwnerCount={setOwnerCount}
          />
        </TabPanel>
        {/* 1차 결과 */}
        <TabPanel>
          <ThrFirstVotingAft state={state} />
        </TabPanel>
        {/* 2차 투표 */}
        <TabPanel>
          <ThrSecondVotingBef
            state={state}
            ownerCount={ownerCount}
            setOwnerCount={setOwnerCount}
          />
        </TabPanel>
        {/* 2차 결과 */}
        <TabPanel>
          <ThrSecondVotingAft state={state} />
        </TabPanel>
        {/* 정보 */}
        <TabPanel>
          <ThrTabInfo
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
