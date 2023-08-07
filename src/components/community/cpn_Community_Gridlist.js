import React from "react";
import { useNavigate } from "react-router-dom";
import CommunityCard from "../../components/community/cpn_Community_Card";
import { Flex, Text, Center, Button, Grid } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const CommunityGridlist = ({ communities, selectedValue }) => {
  const navi = useNavigate();
  //커뮤니티 만들기 페이지 이동
  function handleClick() {
    navi(`/screen_room_make`, {});
  }
  // 커뮤니티 카드 리스트 출력
  const renderCommunities = () => {
    //초기값일 때 모든 리스트 출력
    if (selectedValue === "전체") {
      return communities.map((community) => (
        //커뮤니티 카드
        <Flex m="20px" key={community.id}>
          {/* 커뮤니티 정보 */}
          <CommunityCard communityObj={community} />
        </Flex>
      ));
    }
    //설정한 카테고리 필터링
    const filteredCommunities = communities.filter((community) =>
      community.com_category.includes(selectedValue)
    );
    //설정한 카테고리 커뮤니티가 없을 경우
    if (filteredCommunities.length === 0) {
      return (
        <Center m="50px 0 0 0" fontSize="2xl" fontWeight="bold">
          아직 등록된 커뮤니티가 없습니다.
        </Center>
      );
    }
    //설정한 카테고리 커뮤니티 카드 출력
    return filteredCommunities.map((community) => (
      //커뮤니티 카드
      <Flex m="20px" key={community.id}>
        {/* 커뮤니티 정보 */}
        <CommunityCard communityObj={community} />
      </Flex>
    ));
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="30px">
      {/* 커뮤니티 생성 버튼 */}
      <Button
        flexDirection="column"
        w="300px"
        h="400px"
        m="20px"
        bg="white"
        borderRadius="xl"
        boxShadow="0 0 10px #00A29D"
        onClick={handleClick}
      >
        <AddIcon w="35px" h="35px" m="10px" color="#00A29D" />
        <Text color="#00A29D">새로운 투자 커뮤니티 생성</Text>
      </Button>
      {/* 커뮤니티 카드 리스트 */}
      {renderCommunities()}
    </Grid>
  );
};

export default CommunityGridlist;

//23.07.27 1차 코드 수정
//23.08.07 2차 코드 수정
