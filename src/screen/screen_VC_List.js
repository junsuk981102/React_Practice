import React, { useState, useEffect } from "react";
import { dbService } from "../firebase-config";
import VC from "../components/VC";
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

const ScreenVCList = (props) => {
  const [vcs, setVCs] = useState([]);
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
  const [selectedValue, setSelectedValue] = useState("카테고리"); // State to hold the selected value

  const handleMenuItemClick = (value) => {
    setSelectedValue(value); // Update the selected value when a MenuItem is clicked
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

  const renderVCs = () => {
    if (selectedValue === "카테고리") {
      return vcs.map((vc) => (
        <Box key={vc.id}>
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
            <VC vcObj={vc} />
          </Box>
        </Box>
      ));
    }
    const filteredVCs = vcs.filter((vc) => vc.vc_category === selectedValue);

    if (filteredVCs.length === 0) {
      return (
        <Box textAlign="center" mt="50px" fontSize="2xl" fontWeight="bold">
          아직 등록된 VC가 없습니다.
        </Box>
      );
    }

    return filteredVCs.map((vc) => (
      <Box key={vc.id}>
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
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Heading as="h1" size="lg" mb="20px">
            투자 중인 VC
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
                value="opt1"
                onClick={() => handleMenuItemClick("카테고리")}
              >
                전체
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                value="opt2"
                onClick={() => handleMenuItemClick("VC")}
              >
                VC
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                value="opt3"
                onClick={() => handleMenuItemClick("CVC")}
              >
                CVC
              </MenuItem>
              <MenuItem
                bg="none"
                borderTop="1px solid white"
                value="opt3"
                onClick={() => handleMenuItemClick("ABC")}
              >
                ABC
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
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
