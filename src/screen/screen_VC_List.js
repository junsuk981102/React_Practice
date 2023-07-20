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

const ScreenVCList = () => {
  //VC 설정
  const [vcs, setVCs] = useState([]);
  //양쪽 여백
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
  //카테고리 리스트 초기값 설정
  const [selectedValue, setSelectedValue] = useState("카테고리");
  //카테고리 리스트 설정값 변경
  const handleMenuItemClick = (value) => {
    setSelectedValue(value);
  };

  //VC 정보 가져오기
  useEffect(() => {
    dbService.collection("vc_list").onSnapshot((snapshot) => {
      const vcArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVCs(vcArray);
    });
  }, []);

  //VC 정보 렌더링
  const renderVCs = () => {
    if (selectedValue === "카테고리") {
      //초기값일 때 모든 리스트 렌더링
      return vcs.map((vc) => (
        //VC 카드
        <Box key={vc.id}>
          <Box
            //위치
            position="relative"
            //크기 및 여백
            w="500px"
            h="360px"
            m="20px"
            //배경
            bg="white"
            borderRadius="10px"
            boxShadow="0 0 15px #00A29D"
            overflow="hidden"
          >
            {/* VC 정보 */}
            <VC vcObj={vc} />
          </Box>
        </Box>
      ));
    }

    //설정한 카테고리 필터링
    const filteredVCs = vcs.filter((vc) => vc.vc_category === selectedValue);

    //설정한 카테고리 VC가 없을 경우
    if (filteredVCs.length === 0) {
      return (
        <Box
          //정렬
          textAlign="center"
          //여백
          mt="50px"
          mb="150px"
          //글자
          fontSize="2xl"
          fontWeight="bold"
        >
          아직 등록된 VC가 없습니다.
        </Box>
      );
    }

    return filteredVCs.map((vc) => (
      <Box key={vc.id}>
        <Box
          //위치
          position="relative"
          //크기 및 여백
          w="500px"
          h="360px"
          m="20px"
          //배경
          bg="white"
          borderRadius="10px"
          boxShadow="0 0 15px #00A29D"
          overflow="hidden"
        >
          <VC vcObj={vc} />
        </Box>
      </Box>
    ));
  };

  return (
    //VC 리스트 전체 화면

    //VC 리스트 전체 배경 화면
    <Box
      //크기 및 여백
      h="auto"
      pb="100px"
      //배경
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      <Box
        //여백
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        pb="50px"
      >
        <Heading
          //여백
          mt="30px"
          mb="5px"
          //글자
          as="h2"
          size="md"
        >
          새로운 VC 찾기
        </Heading>
        <Box
          //정렬
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Heading
            //여백
            mb="20px"
            //글자
            as="h1"
            size="lg"
          >
            투자 중인 VC
          </Heading>

          {/* VC 카테고리 버튼 */}
          <Menu>
            <MenuButton
              //크기
              w="100px"
              h="40px"
              //배경
              bg="#00A29D"
              borderRadius="20px"
              //글자
              fontSize="md"
              fontWeight="bold"
              color="white"
            >
              {selectedValue}
            </MenuButton>
            <MenuList
              //배경
              bg="#00A29D"
              //글자
              color="white"
            >
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("카테고리")}
              >
                전체
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("VC")}
              >
                VC
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("CVC")}
              >
                CVC
              </MenuItem>
              <MenuItem
                //배경
                bg="none"
                borderTop="1px solid white"
                borderBottom="1px solid white"
                //기능
                onClick={() => handleMenuItemClick("ABC")}
              >
                ABC
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        {/* VC 리스트 섹션 */}
        <Grid
          //형식
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
