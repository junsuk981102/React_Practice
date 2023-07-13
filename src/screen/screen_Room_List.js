import React, { useState, useEffect } from "react";
import { dbService } from "../firebase-config";
import Community from "../components/Community";
import { Heading, Grid, Box, useBreakpointValue } from "@chakra-ui/react";

const ScreenRoomList = (props) => {
  const [communities, setCommunities] = useState([]);
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20x", xl: "200px" });

  useEffect(() => {
    dbService.collection("community_list").onSnapshot((snapshot) => {
      const communityArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communityArray);
    });
  }, []);

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
      pb="200px"
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

        {/* 커뮤니티 리스트 */}
        <Grid
          //형식
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="5px"
        >
          {renderCommunities()}
        </Grid>
      </Box>
    </Box>
  );
};

export default ScreenRoomList;
