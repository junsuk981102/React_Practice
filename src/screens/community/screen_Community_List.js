import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import CommunityCategory from "../../components/community/cpn_Community_Category";
import CommunityGridlist from "../../components/community/cpn_Community_Gridlist";

import { Heading, Box, useBreakpointValue, Flex } from "@chakra-ui/react";

const ScreenRoomList = () => {
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
      <CommunityGridlist
        communities={communities}
        selectedValue={selectedValue}
      />
    </Box>
  );
};

export default ScreenRoomList;

//23.07.24 1차 코드 수정 완료
