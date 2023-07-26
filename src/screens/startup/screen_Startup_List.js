import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import StartupCategory from "../../components/startup/cpn_Startup_Category";
import StartupGridlist from "../../components/startup/cpn_Startup_Gridlist";
import { Heading, Flex, Box, useBreakpointValue } from "@chakra-ui/react";

const ScreenStartupList = () => {
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" });
  const [startups, setStartups] = useState([]);
  const [selectedValue, setSelectedValue] = useState("전체");

  const handleMenuItemClick = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dbService.collection("startup_list").onSnapshot((snapshot) => {
      const startupArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStartups(startupArray);
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
        새로운 스타트업 찾기
      </Heading>
      <Flex justifyContent="space-between" mb="30px">
        <Heading size="lg">투자 중인 스타트업</Heading>
        <StartupCategory
          selectedValue={selectedValue}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Flex>
      <StartupGridlist startups={startups} selectedValue={selectedValue} />
    </Box>
  );
};

export default ScreenStartupList;
