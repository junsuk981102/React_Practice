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

function ScreenChat() {
  const { state } = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);

  // com_createAt을 YYYY-MM-DD 형식으로 출력
  const timestamp = state.com_createAt;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const [ownerCount, setOwnerCount] = useState(state.com_owner); //티켓 소유 갯수
  const [sellCount, setSellCount] = useState(0); //티켓 구매 갯수

  const percentyes = 642;
  const percentno = 424;
  const percentyesorno = percentyes + percentno;

  //숫자 쉼표 표시 코드
  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  //티켓 구매 갯수 증가
  const handleClick_plus = () => {
    if (ownerCount + sellCount < state.com_ticket_max) {
      setSellCount(sellCount + 1);
    }
  };
  //티켓 구매 갯수 감소
  const handleClick_minus = () => {
    if (sellCount > 0) {
      setSellCount(sellCount - 1);
    }
  };
  //티켓 구매
  const handleClick_sell = () => {
    setOwnerCount(ownerCount + sellCount);
    setSellCount(0);
  };

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
                <ThrFirstVotingBef state={state} ownerCount={ownerCount} />
              </TabPanel>

              {/* 1차 결과 */}
              <TabPanel>
                <ThrFirstVotingAft state={state} />
              </TabPanel>

              {/* 2차 투표 */}
              <TabPanel>
                <ThrSecondVotingBef state={state} ownerCount={ownerCount} />
              </TabPanel>

              {/* 2차 결과 */}
              <TabPanel>
                {/* 정보 */}
                <Flex flexDirection="column" p="10px" mb="30px">
                  {/* 제목 */}
                  <Flex mb="15px">
                    <Text fontSize="2xl" fontWeight="bold" mr="15px">
                      2차 투표 종료
                    </Text>
                    <Image
                      src="../image/community/icon_voting.png"
                      w="30px"
                      h="30px"
                    />
                  </Flex>
                  {/* 설명 */}
                  <Text fontSize="xl" fontWeight="bold" mb="15px">
                    {state.com_name} 2차 투표가 모두 종료되었습니다. <br />
                    투표 결과에 따라, 1주일 이내에 {"["}펫프렌즈{"]"}에 대한
                    투자 계약이 시작됩니다.
                  </Text>

                  <Flex flexDirection="column" alignItems="center">
                    <Text m="25px" fontSize="lg" fontWeight="bold">
                      {"<"}투표 결과{">"}
                    </Text>
                    <Flex
                      flexDirection="column"
                      textAlign="center"
                      marginX="40px"
                    >
                      <Image
                        src="../image/community/company_ex1.png"
                        w="250px"
                        h="250px"
                      />
                      <Text fontSize="2xl" fontWeight="bold" marginY="5px">
                        펫프렌즈
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold" color="#00A29D">
                        {((percentyes / percentyesorno) * 100).toFixed(1) + "%"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </TabPanel>

              {/* 정보 */}
              <TabPanel>
                <Flex flexDirection="column" p="10px">
                  {/* 커뮤니티 생성일 */}
                  <Text mb="30px">커뮤니티 생성일 : {formattedDate}</Text>
                  {/* 커뮤니티 참여인원 */}
                  <Text mb="30px">
                    커뮤니티 참여인원 : {state.com_member}명
                  </Text>
                  {/* 투자금 현황 */}
                  <Flex mb="20px">
                    <Text>투자금 현황 : </Text>
                    <Text fontWeight="bold" color="#00A29D">
                      &nbsp;
                      {(state.com_now_investment / state.com_total_investment) *
                        100}
                      % 달성
                    </Text>
                  </Flex>

                  {/* 커뮤니티 투자 목표 금액 그래프 */}
                  <Box position="relative" w="650px">
                    {/* 목표 금액 그래프 */}
                    <Box
                      //위치 및 정렬
                      position="absolute"
                      top="0"
                      left="0"
                      //크기
                      w="100%"
                      h="45px"
                      //배경
                      bg="white"
                      border="1px solid #00A29D"
                      borderRadius="22.5px"
                    />
                    {/* 현재 금액 그래프 */}
                    <Box
                      //위치 및 정렬
                      position="absolute"
                      top="0"
                      left="0"
                      //크기
                      w={
                        (state.com_now_investment /
                          state.com_total_investment) *
                          100 +
                        "%"
                      }
                      h="45px"
                      //배경
                      bg={"linear-gradient(to right, #00A29D, #FFFFFF)"}
                      border="1px solid #00A29D"
                      borderRadius="3xl"
                    />
                  </Box>
                  {/* 커뮤니티 투자 목표 금액 텍스트 */}
                  <Box
                    //위치 및 정렬
                    position="relative"
                    //글자
                    color="#00A29D"
                  >
                    {/* 목표 금액 텍스트 */}
                    <Box
                      //위치 및 정렬
                      position="absolute"
                      top="55"
                      left="85%"
                    >
                      <Text>
                        <NumberFormat number={state.com_total_investment} />원
                      </Text>
                    </Box>
                    {/* 현재 금액 텍스트 */}
                    <Box
                      //위치 및 정렬
                      position="absolute"
                      top="55"
                      left={
                        (state.com_now_investment /
                          state.com_total_investment) *
                          80 +
                        "%"
                      }
                    >
                      <Text>
                        <NumberFormat number={state.com_now_investment} />원
                      </Text>
                    </Box>
                  </Box>

                  {/* 티켓 정보 */}
                  <Text mt="120px" mb="20px">
                    티켓정보
                  </Text>
                  <Flex mb="25px">
                    <Image
                      src="../image/ticket/icon_color_ticket.png"
                      w="150px"
                      h="150px"
                      marginX="10px"
                    />

                    <Flex flexDirection="column">
                      <Text fontSize="sm" mb="5px">
                        티켓 가격 :&nbsp;
                        <NumberFormat number={state.com_ticket_price} />원
                      </Text>
                      <Text fontSize="sm" mb="5px">
                        현재 보유한 티켓 수 : {ownerCount}매
                      </Text>
                      {/* 구매 갯수 안내 */}
                      <Text
                        //글자
                        fontSize="2xs"
                        color="lightgrey"
                        mb="10px"
                      >
                        * 최대 {state.com_ticket_max}매까지 구매 가능
                      </Text>

                      {/* 티켓 구매 버튼 */}
                      <Flex
                        //정렬
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        //크기
                        w="140px"
                        h="30px"
                        mb="10px"
                        //배경
                        border="1px solid #00A29D"
                        borderRadius="xl"
                      >
                        {/* 마이너스 버튼 */}
                        <Button
                          //크기
                          w="30px"
                          //배경
                          variant="none"
                          //글자
                          fontSize="25px"
                          fontWeight="bold"
                          color={sellCount > 0 ? "#00A29D" : "lightgrey"}
                          //기능
                          onClick={handleClick_minus}
                        >
                          -
                        </Button>
                        {/* 구매 갯수 */}
                        <Text
                          //크기
                          w="40px"
                        >
                          {sellCount}
                        </Text>
                        {/* 플러스 버튼 */}
                        <Button
                          //크기
                          w="30px"
                          //배경
                          variant="none"
                          //글자
                          fontSize="25px"
                          fontWeight="bold"
                          color={
                            ownerCount + sellCount < state.com_ticket_max
                              ? "#00A29D"
                              : "lightgrey"
                          }
                          //기능
                          onClick={handleClick_plus}
                        >
                          +
                        </Button>
                      </Flex>
                      {/* 티켓 구매 버튼 */}
                      <Button
                        //크기 및 여백
                        w="140px"
                        h="40px"
                        //배경
                        bg={sellCount > 0 ? "#00A29D" : "lightgrey"}
                        borderRadius="xl"
                        variant="none"
                        //글자
                        fontSize="sm"
                        color="white"
                        //기능
                        onClick={handleClick_sell}
                      >
                        추가 구매하기
                      </Button>
                    </Flex>
                  </Flex>

                  {/* 관심있는 회사 */}
                  <Text mb="20px">관심있는 회사 </Text>
                  <Flex>
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      marginX="10px"
                      p="5px"
                      borderRadius="xl"
                      boxShadow="0 0 5px #00A29D"
                    >
                      <Image
                        src="../image/community/company_ex1.png"
                        w="100px"
                        h="100px"
                        borderRadius="xl"
                      />
                      <Text mt="5px" fontSize="sm">
                        펫프랜즈
                      </Text>
                    </Flex>
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      marginX="20px"
                      p="5px"
                      borderRadius="xl"
                      boxShadow="0 0 5px #00A29D"
                    >
                      <Image
                        src="../image/community/company_ex2.png"
                        w="100px"
                        h="100px"
                        borderRadius="xl"
                      />
                      <Text mt="5px" fontSize="sm">
                        페오펫
                      </Text>
                    </Flex>
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      marginX="10px"
                      p="5px"
                      borderRadius="xl"
                      boxShadow="0 0 5px #00A29D"
                    >
                      <Image
                        src="../image/community/company_ex3.png"
                        w="100px"
                        h="100px"
                        borderRadius="xl"
                      />
                      <Text mt="5px" fontSize="sm">
                        핏펫
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
}

export default ScreenChat;
