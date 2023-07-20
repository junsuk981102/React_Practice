import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase-config";
import Community from "../components/Community";
import {
  Heading,
  Grid,
  Box,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const ScreenRoomList = () => {
  const navi = useNavigate();
  //커뮤니티 설정
  const [communities, setCommunities] = useState([]);
  //양쪽 여백
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
  //카테고리 리스트 초기값 설정
  const [selectedValue, setSelectedValue] = useState("카테고리");
  //카테고리 리스트 설정값 변경
  const handleMenuItemClick = (value) => {
    setSelectedValue(value); // Update the selected value when a MenuItem is clicked
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
    if (selectedValue === "카테고리") {
      return communities.map((community) => (
        //커뮤니티 카드
        <Box key={community.id}>
          <Box
            //위치 및 정렬
            position="relative"
            overflow="hidden"
            //크기
            w="300px"
            h="400px"
            mb="40px"
            //배경
            bg="white"
            borderRadius="md"
            boxShadow="0 0 15px #00A29D"
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
          overflow="hidden"
          //크기 및 여백
          w="300px"
          h="400px"
          mb="20px"
          //배경
          bg="white"
          borderRadius="md"
          boxShadow="0 0 15px #00A29D"
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
      pb="100px"
      //배경
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      <Box
        //여백
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
      >
        {/* 커뮤니티 제목 & 카테고리 버튼 */}
        <Box
          //정렬
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          //여백
          mt="30px"
          mb="30px"
        >
          {/* 커뮤니티 제목 */}
          <Heading
            //글자
            as="h1"
            size="lg"
          >
            커뮤니티
          </Heading>
          {/* 카테고리 버튼 */}
          <Menu>
            <MenuButton
              //크기
              w="100px"
              h="40px"
              //배경
              bg="#00A29D"
              borderRadius="20px"
              //글자
              fontSize="md"
              fontWeight="bold"
              color="white"
            >
              {selectedValue}
            </MenuButton>
            {/* 카테고리 리스트 항목 */}
            <MenuList
              //배경
              bg="#00A29D"
              //글자
              color="white"
            >
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("카테고리")}
              >
                전체
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("핀테크")}
              >
                핀테크
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("금융")}
              >
                금융
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("반려동물")}
              >
                반려동물
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("VR")}
              >
                VR
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("AR")}
              >
                AR
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("ESG")}
              >
                ESG
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("전기차")}
              >
                전기차
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("블록체인")}
              >
                블록체인
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("음악")}
              >
                음악
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("미술")}
              >
                미술
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("자동차")}
              >
                자동차
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("신기술")}
              >
                신기술
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("F&B")}
              >
                F&B
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                borderBottom="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("헬스케어")}
              >
                헬스케어
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        {/* 커뮤니티 리스트 섹션 */}
        <Box
          //정렬
          display="flex"
          flexDirection="column"
        >
          <Grid
            //형식
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap="5px"
          >
            {/* 커뮤니티 생성 버튼 */}
            <Button
              //위치 및 정렬
              position="relative"
              display="flex"
              flexDirection="column"
              //크기
              w="300px"
              h="400px"
              //배경
              bg="white"
              borderRadius="md"
              boxShadow="0 0 15px #00A29D"
              overflow="hidden"
              //기능
              onClick={handleClick}
            >
              <AddIcon
                //크기 및 여백
                w={35}
                h={35}
                m={8}
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
      </Box>
    </Box>
  );
};

export default ScreenRoomList;
