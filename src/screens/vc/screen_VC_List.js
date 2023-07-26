import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import VCCategory from "../../components/vc/cpn_VC_Category";
import VCGridlist from "../../components/vc/cpn_VC_Gridlist";
import { Heading, Flex, Box, useBreakpointValue } from "@chakra-ui/react";

const ScreenVCList = () => {
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" });
  const [vcs, setVCs] = useState([]);
  const [selectedValue, setSelectedValue] = useState("전체");

  const handleMenuItemClick = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dbService.collection("vc_list").onSnapshot((snapshot) => {
      const vcArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVCs(vcArray);
    });
  }, []);

  return (
    <Box
      h="auto"
      px={boxPadding}
      pb="200px"
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      <Heading mt="30px" mb="5px" size="md">
        새로운 VC 찾기
      </Heading>
      <Flex justifyContent="space-between" mb="30px">
        <Heading size="lg">투자 중인 VC</Heading>
        <VCCategory
          selectedValue={selectedValue}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Flex>
      <VCGridlist vcs={vcs} selectedValue={selectedValue} />
    </Box>
  );
};

export default ScreenVCList;
