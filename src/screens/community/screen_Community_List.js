import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../firebase-config";
import Community from "../../components/community/cpn_Community_Card";
import CommunityCategory from "../../components/community/cpn_Community_Category";
import {
  Heading,
  Grid,
  Box,
  useBreakpointValue,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const ScreenRoomList = () => {
  const navi = useNavigate();
  //커뮤니티 설정
  const [communities, setCommunities] = useState([]);
  //양쪽 여백
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" });
  //카테고리 리스트 초기값 설정
  const [selectedValue, setSelectedValue] = useState("전체");
  //카테고리 리스트 설정값 변경
  const handleMenuItemClick = (value) => {
    setSelectedValue(value);
  };

  //커뮤니티 만들기 페이지 이동
  function handleClick() {
    navi(`/screen_room_make`, {});
  }
  //커뮤니티 정보 가져오기
  useEffect(() => {
    dbService.collection("community_list").onSnapshot((snapshot) => {
      const communityArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communityArray);
    });
  }, []);

  //커뮤니티 정보 렌더링
  const renderCommunities = () => {
    //초기값일 때 모든 리스트 렌더링
    if (selectedValue === "전체") {
      return communities.map((community) => (
        //커뮤니티 카드
        <Box key={community.id}>
          <Box
            //위치 및 정렬
            position="relative"
            //크기
            w="300px"
            h="400px"
            m="20px"
            //배경
            bg="white"
            borderRadius="xl"
            boxShadow="0 0 10px #00A29D"
            overflow="hidden"
          >
            {/* 커뮤니티 정보 */}
            <Community communityObj={community} />
          </Box>
        </Box>
      ));
    }

    //설정한 카테고리 필터링
    const filteredCommunities = communities.filter((community) =>
      community.com_category.includes(selectedValue)
    );

    //설정한 카테고리 커뮤니티가 없을 경우
    if (filteredCommunities.length === 0) {
      return (
        <Box
          //여백
          mt="50px"
          //글자
          fontSize="2xl"
          fontWeight="bold"
        >
          아직 등록된 커뮤니티가 없습니다.
        </Box>
      );
    }

    //설정한 카테고리 커뮤니티가 있을 경우
    return filteredCommunities.map((community) => (
      //커뮤니티 카드
      <Box key={community.id}>
        <Box
          //위치 및 정렬
          position="relative"
          //크기 및 여백
          w="300px"
          h="400px"
          m="20px"
          //배경
          bg="white"
          borderRadius="xl"
          boxShadow="0 0 10px #00A29D"
          overflow="hidden"
        >
          {/* 커뮤니티 정보 */}
          <Community communityObj={community} />
        </Box>
      </Box>
    ));
  };

  return (
    //커뮤니티 리스트 전체 화면

    //커뮤니티 리스트 전체 배경 화면
    <Box
      //크기 및 여백
      h="auto"
      px={boxPadding}
      pb="200px"
      //배경
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      {/* 커뮤니티 제목 & 카테고리 버튼 */}
      <Flex
        //정렬
        justifyContent="space-between"
        //여백
        marginY="30px"
      >
        {/* 커뮤니티 제목 */}
        <Heading
          //글자
          size="lg"
        >
          커뮤니티
        </Heading>
        {/* 카테고리 버튼 */}
        <CommunityCategory
          selectedValue={selectedValue}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Flex>
      {/* 커뮤니티 리스트 섹션 */}
      <Grid
        //형식
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      >
        {/* 커뮤니티 생성 버튼 */}
        <Button
          //위치 및 정렬
          flexDirection="column"
          //크기 및 여백
          w="300px"
          h="400px"
          m="20px"
          //배경
          bg="white"
          borderRadius="xl"
          boxShadow="0 0 10px #00A29D"
          //기능
          onClick={handleClick}
        >
          <AddIcon
            //크기 및 여백
            w="35px"
            h="35px"
            m="8px"
            //글자
            color="#5eccc8"
          />
          <Text
            //글자
            color="#5eccc8"
          >
            새로운 투자 커뮤니티 생성
          </Text>
        </Button>
        {/* 커뮤니티 카드 리스트 */}
        {renderCommunities()}
      </Grid>
    </Box>
  );
};

export default ScreenRoomList;

//23.07.24 1차 코드 수정 완료
