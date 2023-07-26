import { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../../components/chat/cpn_Chat";
import "../../chat.css";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";

import ThrFirstVotingBef from "../../components/community/cpn_Thr_First_Voting_Before";
import ThrFirstVotingAft from "../../components/community/cpn_Thr_First_Voting_After";
import ThrSecondVotingBef from "../../components/community/cpn_Thr_Second_Voting_Before";
import ThrSecondVotingAft from "../../components/community/cpn_Thr_Second_Voting_After";
import ThrInformation from "../../components/community/cpn_Thr_Information";

function ScreenChat() {
  const { state } = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);

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
          {/* 커뮤니티 사진 */}
          <Image
            src="../image/community/communitybg_ex.png"
            w="750px"
            h="200px"
          ></Image>
          {/* 커뮤니티 정보 */}
          <Flex flexDirection="column" h="150px" p="20px" bg="#00A29D">
            <Flex>
              {/* 커뮤니티 이름 */}
              <Heading
                //글자
                size="md"
                color="white"
              >
                {state.com_name}
              </Heading>
              {/* 커뮤니티 카테고리 */}
              <Flex>
                {comCategory.map((category, index) => (
                  <Box
                    key={index}
                    //정렬
                    textAlign="center"
                    justifyContent="center"
                    //크기 및 여백
                    w="auto"
                    p="5px"
                    ml="10px"
                    //배경
                    bg="#E5F2F2"
                    borderRadius="lg"
                    //글자
                    fontSize="xs"
                    color="black"
                  >
                    {category}
                  </Box>
                ))}
              </Flex>
            </Flex>
            {/* 커뮤니티 설명 */}
            <Text
              //여백
              mt="20px"
              //글자
              fontSize="sm"
              color="white"
            >
              {state.com_info}
            </Text>
          </Flex>
          {/* 커뮤니티 활동 */}
          <Tabs
            size="lg"
            isFitted
            position="relative"
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
            <TabIndicator
              mt="-1.5px"
              ml="40px"
              maxWidth="50px"
              h="2px"
              bg="#00A29D"
              borderRadius="1px"
            />
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
                <ThrInformation
                  state={state}
                  ownerCount={ownerCount}
                  setOwnerCount={setOwnerCount}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
}

export default ScreenChat;
