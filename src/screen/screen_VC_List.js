import React, { useState, useEffect } from "react";
import { dbService } from "../firebase-config";
import VC from "../components/VC";
import { Heading, Grid, Box, useBreakpointValue } from "@chakra-ui/react";

const ScreenVCList = (props) => {
  const [vcs, setVCs] = useState([]);
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20x", xl: "200px" });

  useEffect(() => {
    dbService.collection("vc_list").onSnapshot((snapshot) => {
      const vcArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVCs(vcArray);
    });
  }, []);

  const renderVCs = () => {
    return vcs.map((vc) => (
      <Box key={vc.id}>
        <Box
          w="500px"
          h="360px"
          borderRadius="10px"
          position="relative"
          overflow="hidden"
          boxShadow="0 0 15px #00A29D"
          m="20px"
        >
          <VC vcObj={vc} />
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
          새로운 VC 찾기
        </Heading>
        <Heading as="h1" size="lg" mb="20px">
          투자 중인 VC
        </Heading>
        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          gap="20px"
        >
          {renderVCs()}
        </Grid>
      </Box>
    </Box>
  );
};

export default ScreenVCList;
