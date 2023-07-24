import { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../components/cpn_Chat";
import "../chat.css";
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
  const [votefirstBefore, setVoteFirstBefore] = useState(0);
  const [votesecondBefore, setVoteSecondBefore] = useState(0);

  const [vote1, setVote1] = useState(0); //후보 1번 투표
  const [vote2, setVote2] = useState(0); //후보 2번 투표
  const [vote3, setVote3] = useState(0); //후보 3번 투표
  const percent1 = 531;
  const percent2 = 135;
  const percent3 = 223;
  const percentA = percent1 + percent2 + percent3;

  const [voteyes, setVoteYes] = useState(0); //찬성 투표
  const [voteno, setVoteNo] = useState(0); //반대 투표
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

  //후보 1번 투표
  const handleClick_plus_v1 = () => {
    if (vote1 + vote2 + vote3 < ownerCount) {
      setVote1(vote1 + 1);
    }
  };
  const handleClick_minus_v1 = () => {
    if (vote1 > 0) {
      setVote1(vote1 - 1);
    }
  };
  //후보 2번 투표
  const handleClick_plus_v2 = () => {
    if (vote1 + vote2 + vote3 < ownerCount) {
      setVote2(vote2 + 1);
    }
  };
  const handleClick_minus_v2 = () => {
    if (vote2 > 0) {
      setVote2(vote2 - 1);
    }
  };
  //후보 3번 투표
  const handleClick_plus_v3 = () => {
    if (vote1 + vote2 + vote3 < ownerCount) {
      setVote3(vote3 + 1);
    }
  };
  const handleClick_minus_v3 = () => {
    if (vote3 > 0) {
      setVote3(vote3 - 1);
    }
  };
  //1차 투표
  const votingFirst = () => {
    if (vote1 + vote2 + vote3 === ownerCount) {
      setVoteFirstBefore(1);
      setOwnerCount(0);
      setVote1(0);
      setVote2(0);
      setVote3(0);
    }
  };
  const votingFirstButton = () => {
    if (votefirstBefore === 0) {
      return (
        <>
          <Flex justifyContent="center" mt="60px">
            <Button
              w="300px"
              h="50px"
              borderRadius="3xl"
              bg={
                vote1 + vote2 + vote3 === ownerCount && ownerCount > 0
                  ? "#00A29D"
                  : "lightgrey"
              }
              variant="none"
              color="white"
              fontSize="lg"
              onClick={votingFirst}
            >
              투표하기
            </Button>
          </Flex>
        </>
      );
    } else {
      return (
        <>
          <Flex flexDirection="column" alignItems="center" mt="60px">
            <Flex flexDirection="column" w="550px" textAlign="start">
              <Text fontWeight="bold">
                {"<"}투표 현황{">"}
              </Text>
              <Text fontSize="2xs" color="grey">
                투표 종료까지 D - 2일 16시간
              </Text>
            </Flex>
            <Flex w="550px" border="1px solid white">
              <Flex
                w={(percent1 / percentA) * 100 + "%"}
                h="60px"
                bg="#FF4181" //핑크색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percent1 / percentA) * 100).toFixed(1) + "%"}
              </Flex>
              <Flex
                w={(percent2 / percentA) * 100 + "%"}
                h="60px"
                bg="#00ACED" //하늘색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percent2 / percentA) * 100).toFixed(1) + "%"}
              </Flex>

              <Flex
                w={(percent3 / percentA) * 100 + "%"}
                h="60px"
                bg="#0050FF" //파란색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percent3 / percentA) * 100).toFixed(1) + "%"}
              </Flex>
            </Flex>
          </Flex>
        </>
      );
    }
  };

  //찬성 투표
  const handleClick_plus_vyes = () => {
    if (voteyes + voteno < ownerCount) {
      setVoteYes(voteyes + 1);
    }
  };
  const handleClick_minus_vyes = () => {
    if (voteyes > 0) {
      setVoteYes(voteyes - 1);
    }
  };
  //반대 투표
  const handleClick_plus_vno = () => {
    if (voteyes + voteno < ownerCount) {
      setVoteNo(voteno + 1);
    }
  };
  const handleClick_minus_vno = () => {
    if (voteno > 0) {
      setVoteNo(voteno - 1);
    }
  };
  //2차 투표
  const votingSecond = () => {
    if (voteyes + voteno === ownerCount) {
      setVoteSecondBefore(1);
      setOwnerCount(0);
      setVoteYes(0);
      setVoteNo(0);
    }
  };
  const votingSecondButton = () => {
    if (votesecondBefore === 0) {
      return (
        <>
          <Flex justifyContent="center" mt="60px">
            <Button
              w="300px"
              h="50px"
              borderRadius="3xl"
              bg={
                voteyes + voteno === ownerCount && ownerCount > 0
                  ? "#00A29D"
                  : "lightgrey"
              }
              variant="none"
              color="white"
              fontSize="lg"
              onClick={votingSecond}
            >
              투표하기
            </Button>
          </Flex>
        </>
      );
    } else {
      return (
        <>
          <Flex flexDirection="column" alignItems="center" mt="60px">
            <Flex flexDirection="column" w="550px" textAlign="start">
              <Text fontWeight="bold">
                {"<"}투표 현황{">"}
              </Text>
              <Text fontSize="2xs" color="grey">
                투표 종료까지 D - 2일 16시간
              </Text>
            </Flex>
            <Flex w="550px" border="1px solid white">
              <Flex
                w={(percentyes / percentyesorno) * 100 + "%"}
                h="60px"
                bg="#6200EE" //파란색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percentyes / percentyesorno) * 100).toFixed(1) + "%"}
              </Flex>
              <Flex
                w={(percentno / percentyesorno) * 100 + "%"}
                h="60px"
                bg="#FF0000" //빨간색
                color="white"
                justifyContent="center"
                alignItems="center"
              >
                {((percentno / percentyesorno) * 100).toFixed(1) + "%"}
              </Flex>
            </Flex>
          </Flex>
        </>
      );
    }
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
          <Image src="../image/com_bg.png" w="750px" h="200px"></Image>
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
                {/* 정보 */}
                <Flex flexDirection="column" p="10px" mb="30px">
                  {/* 제목 */}
                  <Flex mb="15px">
                    <Text fontSize="2xl" fontWeight="bold" mr="15px">
                      1차 투표 중
                    </Text>
                    <Image src="../image/vote_icon.png" w="30px" h="30px" />
                  </Flex>
                  {/* 설명 */}
                  <Text fontSize="xl" fontWeight="bold" mb="15px">
                    {state.com_name} 1차 투표 기간입니다. {"("}
                    2023.07.23~2023.07.31{")"}
                    <br />
                    원하는 기업에 보유한 티켓 개수만큼 투표해주세요.
                  </Text>
                  {/* 보유 티켓 */}
                  <Text fontSize="lg" mb="5px">
                    현재 보유한 티켓 수 : {ownerCount}매
                  </Text>
                </Flex>
                {/* 1차 투표 */}
                <Flex justifyContent="center">
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    marginX="10px"
                    p="5px"
                    borderRadius="xl"
                    boxShadow="0 0 5px #00A29D"
                  >
                    <Image
                      src="../image/com_1.png"
                      w="150px"
                      h="150px"
                      borderRadius="xl"
                    />
                    <Text marginY="5px" fontSize="md" fontWeight="bold">
                      펫프랜즈
                    </Text>
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
                        color={vote1 > 0 ? "#00A29D" : "lightgrey"}
                        //기능
                        onClick={handleClick_minus_v1}
                      >
                        -
                      </Button>
                      {/* 구매 갯수 */}
                      <Text
                        //크기
                        w="40px"
                      >
                        {vote1}
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
                          vote1 + vote2 + vote3 < ownerCount
                            ? "#00A29D"
                            : "lightgrey"
                        }
                        //기능
                        onClick={handleClick_plus_v1}
                      >
                        +
                      </Button>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    marginX="40px"
                    p="5px"
                    borderRadius="xl"
                    boxShadow="0 0 5px #00A29D"
                  >
                    <Image
                      src="../image/com_2.png"
                      w="150px"
                      h="150px"
                      borderRadius="xl"
                    />
                    <Text mt="5px" fontSize="md" fontWeight="bold">
                      페오펫
                    </Text>
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
                        color={vote2 > 0 ? "#00A29D" : "lightgrey"}
                        //기능
                        onClick={handleClick_minus_v2}
                      >
                        -
                      </Button>
                      {/* 구매 갯수 */}
                      <Text
                        //크기
                        w="40px"
                      >
                        {vote2}
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
                          vote1 + vote2 + vote3 < ownerCount
                            ? "#00A29D"
                            : "lightgrey"
                        }
                        //기능
                        onClick={handleClick_plus_v2}
                      >
                        +
                      </Button>
                    </Flex>
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
                      src="../image/com_3.png"
                      w="150px"
                      h="150px"
                      borderRadius="xl"
                    />
                    <Text mt="5px" fontSize="md" fontWeight="bold">
                      핏펫
                    </Text>
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
                        color={vote3 > 0 ? "#00A29D" : "lightgrey"}
                        //기능
                        onClick={handleClick_minus_v3}
                      >
                        -
                      </Button>
                      {/* 구매 갯수 */}
                      <Text
                        //크기
                        w="40px"
                      >
                        {vote3}
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
                          vote1 + vote2 + vote3 < ownerCount
                            ? "#00A29D"
                            : "lightgrey"
                        }
                        //기능
                        onClick={handleClick_plus_v3}
                      >
                        +
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
                {/* 투표하기 버튼 */}
                {votingFirstButton()}
              </TabPanel>

              {/* 1차 결과 */}
              <TabPanel>
                {/* 정보 */}
                <Flex flexDirection="column" p="10px" mb="30px">
                  {/* 제목 */}
                  <Flex mb="15px">
                    <Text fontSize="2xl" fontWeight="bold" mr="15px">
                      1차 투표 종료
                    </Text>
                    <Image src="../image/vote_icon.png" w="30px" h="30px" />
                  </Flex>
                  {/* 설명 */}
                  <Text fontSize="xl" fontWeight="bold" mb="15px">
                    {state.com_name} 1차 투표가 종료되었습니다. <br />
                    3일 뒤{"("}23.07.26{")"}에 2차 투표가 시작됩니다.
                  </Text>

                  <Flex flexDirection="column" alignItems="center">
                    <Text m="25px" fontSize="lg" fontWeight="bold">
                      {"<"}투표 결과{">"}
                    </Text>
                    <Flex>
                      <Flex
                        flexDirection="column"
                        alignSelf="flex-end"
                        textAlign="center"
                      >
                        <Image src="../image/com_2.png" w="150px" h="150px" />
                        <Text fontSize="sm" marginY="5px">
                          페오펫
                        </Text>
                        <Text fontSize="sm">
                          {((percent2 / percentA) * 100).toFixed(1) + "%"}
                        </Text>
                      </Flex>
                      <Flex
                        flexDirection="column"
                        alignSelf="flex-end"
                        textAlign="center"
                        marginX="40px"
                      >
                        <Image src="../image/com_1.png" w="250px" h="250px" />
                        <Text fontSize="2xl" fontWeight="bold" marginY="5px">
                          펫프렌즈
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="#00A29D">
                          {((percent1 / percentA) * 100).toFixed(1) + "%"}
                        </Text>
                      </Flex>
                      <Flex
                        flexDirection="column"
                        alignSelf="flex-end"
                        textAlign="center"
                      >
                        <Image src="../image/com_3.png" w="150px" h="150px" />
                        <Text fontSize="sm" marginY="5px">
                          핏펫
                        </Text>
                        <Text fontSize="sm">
                          {((percent3 / percentA) * 100).toFixed(1) + "%"}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </TabPanel>

              {/* 2차 투표 */}
              <TabPanel>
                {/* 정보 */}
                <Flex flexDirection="column" p="10px" mb="30px">
                  {/* 제목 */}
                  <Flex mb="15px">
                    <Text fontSize="2xl" fontWeight="bold" mr="15px">
                      2차 투표 중
                    </Text>
                    <Image src="../image/vote_icon.png" w="30px" h="30px" />
                  </Flex>
                  {/* 설명 */}
                  <Text fontSize="xl" fontWeight="bold" mb="15px">
                    {state.com_name} 2차 투표 기간입니다. {"("}
                    2023.07.23~2023.07.31{")"}
                    <br />
                    해당 기업에 투자할지 여부를 찬/반 투표해 주세요.
                  </Text>
                  {/* 보유 티켓 */}
                  <Text fontSize="lg" mb="5px">
                    현재 보유한 티켓 수 : {ownerCount}매
                  </Text>
                </Flex>
                {/* 2차 투표 */}
                <Flex justifyContent="center">
                  {/* 찬성 투표 */}
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    marginX="30px"
                    p="5px"
                    borderRadius="xl"
                    boxShadow="0 0 5px #00A29D"
                  >
                    <Image
                      src="../image/com_1.png"
                      w="150px"
                      h="150px"
                      borderRadius="xl"
                    />
                    <Text mt="5px" fontSize="md" fontWeight="bold">
                      펫프랜즈
                    </Text>
                    <Text
                      mb="5px"
                      fontSize="lg"
                      fontWeight="bold"
                      color="#6200EE"
                    >
                      찬성
                    </Text>
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
                        color={voteyes > 0 ? "#00A29D" : "lightgrey"}
                        //기능
                        onClick={handleClick_minus_vyes}
                      >
                        -
                      </Button>
                      {/* 구매 갯수 */}
                      <Text
                        //크기
                        w="40px"
                      >
                        {voteyes}
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
                          voteyes + voteno < ownerCount
                            ? "#00A29D"
                            : "lightgrey"
                        }
                        //기능
                        onClick={handleClick_plus_vyes}
                      >
                        +
                      </Button>
                    </Flex>
                  </Flex>
                  {/* 반대 버튼 */}
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    marginX="30px"
                    p="5px"
                    borderRadius="xl"
                    boxShadow="0 0 5px #00A29D"
                  >
                    <Image
                      src="../image/com_1.png"
                      w="150px"
                      h="150px"
                      borderRadius="xl"
                    />
                    <Text mt="5px" fontSize="md" fontWeight="bold">
                      펫프랜즈
                    </Text>
                    <Text
                      mb="5px"
                      fontSize="lg"
                      fontWeight="bold"
                      color="#FF0000"
                    >
                      반대
                    </Text>
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
                        color={voteno > 0 ? "#00A29D" : "lightgrey"}
                        //기능
                        onClick={handleClick_minus_vno}
                      >
                        -
                      </Button>
                      {/* 구매 갯수 */}
                      <Text
                        //크기
                        w="40px"
                      >
                        {voteno}
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
                          voteyes + voteno < ownerCount
                            ? "#00A29D"
                            : "lightgrey"
                        }
                        //기능
                        onClick={handleClick_plus_vno}
                      >
                        +
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
                {/* 투표하기 버튼 */}
                {votingSecondButton()}
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
                    <Image src="../image/vote_icon.png" w="30px" h="30px" />
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
                      <Image src="../image/com_1.png" w="250px" h="250px" />
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
                      src="../image/ticketcolor.png"
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
                        src="../image/com_1.png"
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
                        src="../image/com_2.png"
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
                        src="../image/com_3.png"
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
