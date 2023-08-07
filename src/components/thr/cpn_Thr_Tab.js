import React, { useState, useEffect } from "react";
import TabVotingFirstBefore from "./cpn_Tab_Voting_First_Before";
import TabVotingFirstAfter from "./cpn_Tab_Voting_First_After";
import TabVotingSecondBefore from "./cpn_Tab_Voting_Second_Before";
import TabVotingSecondAfter from "./cpn_Tab_Voting_Second_After";
import TabCommunityInfo from "./cpn_Tab_Community_Info";
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

function ThrTab({ state, userId, ownerCount, userObj }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAlternateComponent, setShowAlternateComponent] = useState(false);

  // TabPanel의 높이를 설정
  const tabPanelHeight = "100vh";

  useEffect(() => {
    // 5초 후에 showAlternateComponent 상태를 true로 변경
    const timer = setTimeout(() => {
      setShowAlternateComponent(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
          투표
        </Tab>
        <Tab
          fontSize="sm"
          fontWeight="bold"
          color={selectedTab === 2 ? "#00A29D" : "black"}
        >
          정보
        </Tab>
      </TabList>
      <TabIndicator m="-1.5px 0 0 100px" maxWidth="50px" h="2px" bg="#00A29D" />

      <Divider />

      {/* 정보창 */}
      <TabPanels>
        {/* 스레드 */}
        <TabPanel>
          <Flex
            flexDirection="column"
            p="10px"
            h={tabPanelHeight}
            overflowY={selectedTab === 0 ? "auto" : "hidden"}
          >
            <Threads userObj={userObj} />
          </Flex>
        </TabPanel>
        {/* 투표 */}
        <TabPanel>
          {state.com_fall === state.com_ticket_max ? (
            showAlternateComponent ? (
              state.com_sall === state.com_ticket_max ? (
                <TabVotingSecondAfter state={state} />
              ) : (
                <TabVotingSecondBefore
                  state={state}
                  userId={userId}
                  ownerCount={ownerCount}
                />
              )
            ) : (
              <TabVotingFirstAfter state={state} />
            )
          ) : (
            <TabVotingFirstBefore
              state={state}
              userId={userId}
              ownerCount={ownerCount}
            />
          )}
        </TabPanel>
        {/* 정보 */}
        <TabPanel>
          <TabCommunityInfo
            state={state}
            userId={userId}
            ownerCount={ownerCount}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ThrTab;

//23.07.27 1차 코드 수정
