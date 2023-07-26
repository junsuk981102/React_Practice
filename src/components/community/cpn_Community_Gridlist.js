import React from "react";
import { useNavigate } from "react-router-dom";
import CommunityCard from "../../components/community/cpn_Community_Card";
import { Text, Box, Grid, Center, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const CommunityGridlist = ({ communities, selectedValue }) => {
  const navi = useNavigate();

  //커뮤니티 만들기 페이지 이동
  function handleClick() {
    navi(`/screen_room_make`, {});
  }
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
            <CommunityCard communityObj={community} />
          </Box>
        </Box>
      ));
    }

    //설정한 카테고리 필터링
    const filteredCommunities = communities.filter((community) =>
      community.com_category.includes(selectedValue)
    );
    //설정한 카테고리 스타트업이 없을 경우
    if (filteredCommunities.length === 0) {
      return (
        <Center mt="50px" mb="200px" fontSize="2xl" fontWeight="bold">
          아직 등록된 커뮤니티가 없습니다.
        </Center>
      );
    }

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
          <CommunityCard communityObj={community} />
        </Box>
      </Box>
    ));
  };

  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))">
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
      {renderCommunities()}
    </Grid>
  );
};

export default CommunityGridlist;
