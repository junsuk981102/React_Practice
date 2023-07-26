import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import VCCard from "../../components/vc/cpn_VC_Card";
import VCCategory from "../../components/vc/cpn_VC_Category";
import {
  Heading,
  Grid,
  Box,
  useBreakpointValue,
  Flex,
  Center,
} from "@chakra-ui/react";

const ScreenVCList = () => {
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); // 양쪽 여백
  //VC 설정
  const [vcs, setVCs] = useState([]);
  //카테고리 리스트 초기값 설정
  const [selectedValue, setSelectedValue] = useState("전체");
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
    if (selectedValue === "전체") {
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
            borderRadius="xl"
            boxShadow="0 0 10px #00A29D"
            overflow="hidden"
          >
            {/* VC 정보 */}
            <VCCard vcObj={vc} />
          </Box>
        </Box>
      ));
    }

    //설정한 카테고리 필터링
    const filteredVCs = vcs.filter((vc) => vc.vc_category === selectedValue);

    //설정한 카테고리 VC가 없을 경우
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
          //위치
          position="relative"
          //크기 및 여백
          w="500px"
          h="360px"
          m="20px"
          //배경
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
    //VC 리스트 전체 화면

    //VC 리스트 전체 배경 화면
    <Box
      //크기 및 여백
      h="auto"
      px={boxPadding}
      pb="200px"
      //배경
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      <Heading
        //여백
        mt="30px"
        mb="5px"
        //글자
        size="md"
      >
        새로운 VC 찾기
      </Heading>
      <Flex
        //정렬
        justifyContent="space-between"
        //여백
        mb="30px"
      >
        <Heading
          //글자
          size="lg"
        >
          투자 중인 VC
        </Heading>

        {/* VC 카테고리 버튼 */}
        <VCCategory
          selectedValue={selectedValue}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Flex>
      {/* VC 리스트 섹션 */}
      <Grid
        //형식
        gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
      >
        {renderVCs()}
      </Grid>
    </Box>
  );
};

export default ScreenVCList;

//23.07.24 1차 코드 수정 완료
