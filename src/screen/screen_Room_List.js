import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase-config";
import Community from "../components/Community";
import {
  Heading,
  Grid,
  Box,
  useBreakpointValue,
  Button,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const ScreenRoomList = (props) => {
  const navi = useNavigate();
  const [communities, setCommunities] = useState([]);
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });

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
    return communities.map((community) => (
      <Box
        //커뮤니티 ID
        key={community.id}
        //크기
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
        {/* 페이지 제목 */}
        <Heading
          //위치
          mt="30px"
          mb="30px"
          //크기
          as="h1"
          size="lg"
        >
          커뮤니티
        </Heading>

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
