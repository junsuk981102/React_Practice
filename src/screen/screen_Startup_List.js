import React, { useState, useEffect } from "react";
import { dbService } from "../firebase-config";
import Startup from "../components/Startup";
import {
  Heading,
  Grid,
  Box,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const ScreenStartupList = (props) => {
  const [startups, setStartups] = useState([]);
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });

  const [selectedValue, setSelectedValue] = useState("카테고리"); // State to hold the selected value

  const handleMenuItemClick = (value) => {
    setSelectedValue(value); // Update the selected value when a MenuItem is clicked
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

  const renderStartups = () => {
    if (selectedValue === "카테고리") {
      return startups.map((startup) => (
        <Box key={startup.id}>
          <Box
            w="500px"
            h="360px"
            bg="white"
            m="20px"
            borderRadius="10px"
            position="relative"
            overflow="hidden"
            boxShadow="0 0 15px #00A29D"
          >
            <Startup startupObj={startup} />
          </Box>
        </Box>
      ));
    }
    const filteredStartups = startups.filter(
      (startup) => startup.sup_category === selectedValue
    );

    if (filteredStartups.length === 0) {
      return (
        <Box textAlign="center" mt="50px" fontSize="2xl" fontWeight="bold">
          아직 등록된 스타트업이 없습니다.
        </Box>
      );
    }

    return filteredStartups.map((startup) => (
      <Box key={startup.id}>
        <Box
          w="500px"
          h="360px"
          bg="white"
          m="20px"
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
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Heading as="h1" size="lg" mb="20px">
            투자 중인 스타트업
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
