import React from "react";
import { Box, Grid, Center } from "@chakra-ui/react";
import VCCard from "../../components/vc/cpn_VC_Card";

const VCGridlist = ({ vcs, selectedValue }) => {
  const renderVCs = () => {
    if (selectedValue === "전체") {
      return vcs.map((vc) => (
        <Box key={vc.id}>
          <Box
            position="relative"
            w="500px"
            h="360px"
            m="20px"
            bg="white"
            borderRadius="xl"
            boxShadow="0 0 10px #00A29D"
            overflow="hidden"
          >
            <VCCard vcObj={vc} />
          </Box>
        </Box>
      ));
    }

    const filteredVCs = vcs.filter((vc) => vc.vc_category === selectedValue);

    if (filteredVCs.length === 0) {
      return (
        <Center mt="50px" mb="200px" fontSize="2xl" fontWeight="bold">
          아직 등록된 VC가 없습니다.
        </Center>
      );
    }

    return filteredVCs.map((vc) => (
      <Box key={vc.id}>
        <Box
          position="relative"
          w="500px"
          h="360px"
          m="20px"
          bg="white"
          borderRadius="xl"
          boxShadow="0 0 10px #00A29D"
          overflow="hidden"
        >
          <VCCard vcObj={vc} />
        </Box>
      </Box>
    ));
  };

  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))">
      {renderVCs()}
    </Grid>
  );
};

export default VCGridlist;
