import React, { useState, useEffect } from "react";
import { dbService } from "../firebase-config";
import Startup from "../components/Startup";
import { Heading, Grid, Box, useBreakpointValue } from "@chakra-ui/react";

const ScreenStartupList = (props) => {
  const [startups, setStartups] = useState([]);
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });

  useEffect(() => {
    dbService.collection("startup_list").onSnapshot((snapshot) => {
      const startupArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStartups(startupArray);
    });
  }, []);

  const renderStartups = () => {
    return startups.map((startup) => (
      <Box key={startup.id}>
        <Box
          w="500px"
          h="360px"
          bg="white"
          borderRadius="10px"
          position="relative"
          overflow="hidden"
          boxShadow="0 0 15px #00A29D"
        >
          <Startup startupObj={startup} />
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
      <Box pl={boxPaddingLeft} pr={boxPaddingRight} pb="50px">
        <Heading as="h2" size="md" mt="30px" mb="5px">
          새로운 스타트업 찾기
        </Heading>
        <Heading as="h1" size="lg" mb="20px">
          투자 중인 스타트업
        </Heading>
        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          gap="20px"
        >
          {renderStartups()}
        </Grid>
      </Box>
    </Box>
  );
};

export default ScreenStartupList;
