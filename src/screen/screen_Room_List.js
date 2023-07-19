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

const ScreenRoomList = (props) => {
  const navi = useNavigate();
  const [communities, setCommunities] = useState([]);
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });

  const [selectedValue, setSelectedValue] = useState("카테고리"); // State to hold the selected value

  const handleMenuItemClick = (value) => {
    setSelectedValue(value); // Update the selected value when a MenuItem is clicked
  };

  useEffect(() => {
    dbService.collection("community_list").onSnapshot((snapshot) => {
      const communityArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communityArray);
    });
  }, []);

  function handleClick() {
    navi(`/screen_room_make`, {});
  }

  const renderCommunities = () => {
    if (selectedValue === "카테고리") {
      return communities.map((community) => (
        <Box key={community.id}>
          <Box
            w="300px"
            h="400px"
            //배경
            bg="white"
            borderRadius="md"
            boxShadow="0 0 15px #00A29D"
            //구조
            position="relative"
            overflow="hidden"
            m="20px"
          >
            <Community communityObj={community} />
          </Box>
        </Box>
      ));
    }

    const filteredCommunities = communities.filter((community) =>
      community.com_category.includes(selectedValue)
    );

    if (filteredCommunities.length === 0) {
      return (
        <Box mt="50px" fontSize="2xl" fontWeight="bold">
          아직 등록된 커뮤니티가 없습니다.
        </Box>
      );
    }

    return filteredCommunities.map((community) => (
      <Box key={community.id}>
        <Box
          w="300px"
          h="400px"
          //배경
          bg="white"
          borderRadius="md"
          boxShadow="0 0 15px #00A29D"
          //구조
          position="relative"
          overflow="hidden"
          mb="20px"
        >
          <Community communityObj={community} />
        </Box>
      </Box>
    ));
  };

  return (
    <Box
      //크기
      h="auto"
      //배경
      bg="#E5F2F2"
      pb="100px"
      borderTop="1px solid #00A29D"
    >
      <Box pl={boxPaddingLeft} pr={boxPaddingRight}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt="30px"
          mb="30px"
        >
          <Heading as="h1" size="lg">
            커뮤니티
          </Heading>
          <Menu>
            <MenuButton
              w="100px"
              h="40px"
              bg="#00A29D"
              borderRadius="20px"
              fontSize="md"
              fontWeight="bold"
              color="white"
            >
              {selectedValue}
            </MenuButton>
            <MenuList bg="#00A29D" color="white">
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("카테고리")}
              >
                전체
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("핀테크")}
              >
                핀테크
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("금융")}
              >
                금융
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("반려동물")}
              >
                반려동물
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("VR")}
              >
                VR
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("AR")}
              >
                AR
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("ESG")}
              >
                ESG
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("전기차")}
              >
                전기차
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("블록체인")}
              >
                블록체인
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("음악")}
              >
                음악
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("미술")}
              >
                미술
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("자동차")}
              >
                자동차
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("신기술")}
              >
                신기술
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                onClick={() => handleMenuItemClick("F&B")}
              >
                F&B
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                borderBottom="1px solid white"
                onClick={() => handleMenuItemClick("헬스케어")}
              >
                헬스케어
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Box display="flex" flexDirection="column">
          <Grid
            //형식
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap="5px"
          >
            {/* 커뮤니티 생성 버튼 */}
            <Button
              display="flex"
              flexDir="column"
              w="300px"
              h="400px"
              //배경
              bg="white"
              borderRadius="md"
              boxShadow="0 0 15px #00A29D"
              //구조
              position="relative"
              overflow="hidden"
              onClick={handleClick}
            >
              <AddIcon w={35} h={35} m={8} color="#5eccc8" />
              <Text color="#5eccc8">새로운 투자 커뮤니티 생성</Text>
            </Button>
            {/* 커뮤니티 리스트 */}
            {renderCommunities()}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ScreenRoomList;
