import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import CommunityCategory from "../../components/community/cpn_Community_Category";
import CommunityGridlist from "../../components/community/cpn_Community_Gridlist";
import { Flex, Heading, useBreakpointValue } from "@chakra-ui/react";

const ScreenRoomList = () => {
  const [communities, setCommunities] = useState([]); //커뮤니티 설정
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); //양쪽 여백
  const [selectedValue, setSelectedValue] = useState("전체"); //카테고리 리스트 초기값 설정
  //카테고리 리스트 설정값 변경
  const handleMenuItemClick = (value) => {
    setSelectedValue(value);
  };

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

  return (
    <>
      {/* 커뮤니티 리스트 전체 화면 */}

      {/* 커뮤니티 리스트 전체 배경 화면 */}
      <Flex
        flexDirection="column"
        h="auto"
        px={boxPadding}
        pb="200px"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 커뮤니티 제목 & 카테고리 버튼 */}
        <Flex justifyContent="space-between" m="30px 0">
          {/* 커뮤니티 제목 */}
          <Heading size="lg">커뮤니티</Heading>
          {/* 카테고리 버튼 */}
          <CommunityCategory
            selectedValue={selectedValue}
            handleMenuItemClick={handleMenuItemClick}
          />
        </Flex>
        {/* 커뮤니티 리스트 섹션 */}
        <CommunityGridlist
          communities={communities}
          selectedValue={selectedValue}
        />
      </Flex>
    </>
  );
};

export default ScreenRoomList;

//23.07.24 1차 코드 수정
//23.07.27 2차 코드 수정
