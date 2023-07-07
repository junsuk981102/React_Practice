import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase-config";
import Startup from "../components/Startup";
import VC from "../components/VC";
import {
  Box,
  Grid,
  Heading,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

const ScreenMain = (props) => {
  const navi = useNavigate();
  const boxPaddingLeft = useBreakpointValue({ base: "50px", xl: "500px" });
  const boxPaddingRight = useBreakpointValue({ base: "10px", xl: "500px" });

  function handleClick(text) {
    navi(`${text}`);
  }

  const [startups, setStartups] = useState([]);
  const [vcs, setVCs] = useState([]);

  useEffect(() => {
    dbService.collection("startup_list").onSnapshot((snapshot) => {
      const startupArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStartups(startupArray);
    });
  }, []);

  useEffect(() => {
    dbService.collection("vc_list").onSnapshot((snapshot) => {
      const vcArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVCs(vcArray);
    });
  }, []);

  const renderStartups = () => {
    return startups.map((startup) => (
      <Box
        key={startup.id}
        w="500px"
        h="360px"
        borderRadius="md"
        position="relative"
        overflow="hidden"
        boxShadow="0 0 15px #00A29D"
      >
        <Startup startupObj={startup} />
      </Box>
    ));
  };

  const renderVCs = () => {
    return vcs.map((vc) => (
      <Box
        key={vc.id}
        w="500px"
        h="360px"
        borderRadius="md"
        position="relative"
        overflow="hidden"
        boxShadow="0 0 15px #00A29D"
      >
        <VC vcObj={vc} />
      </Box>
    ));
  };

  return (
    <>
      <Image src="image/stot_main.png" alt="main logo" w="100%" h="auto" />

      <Box pl={boxPaddingLeft} pr={boxPaddingRight}>
        <Heading as="h2" size="md" marginTop="50px" marginBottom="5px">
          새로운 스타트업 찾기
        </Heading>
        <Heading as="h1" size="lg" marginBottom="20px">
          투자 중인 스타트업
        </Heading>
        <Grid
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          gap="20px"
        >
          {renderStartups()}
        </Grid>
        <Heading as="h2" size="md" marginTop="50px" marginBottom="5px">
          새로운 VC 찾기
        </Heading>
        <Heading as="h1" size="lg" marginBottom="20px">
          투자 중인 VC
        </Heading>
        <Grid
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          gap="20px"
        >
          {renderVCs()}
        </Grid>
      </Box>
    </>
  );
};

export default ScreenMain;
