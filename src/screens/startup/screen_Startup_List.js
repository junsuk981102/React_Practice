import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import StartupCard from "../../components/startup/cpn_Startup_Card";
import StartupCategory from "../../components/startup/cpn_Startup_Category";
import {
  Heading,
  Grid,
  Box,
  useBreakpointValue,
  Flex,
  Center,
} from "@chakra-ui/react";

const ScreenStartupList = () => {
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); // 양쪽 여백
  //스타트업 설정
  const [startups, setStartups] = useState([]);
  //카테고리 리스트 초기값 설정
  const [selectedValue, setSelectedValue] = useState("전체");
  //카테고리 리스트 설정값 변경
  const handleMenuItemClick = (value) => {
    setSelectedValue(value);
  };

  //스타트업 정보 가져오기
  useEffect(() => {
    dbService.collection("startup_list").onSnapshot((snapshot) => {
      const startupArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStartups(startupArray);
    });
  }, []);

  //스타트업 정보 렌더링
  const renderStartups = () => {
    if (selectedValue === "전체") {
      //초기값일 때 모든 리스트 렌더링
      return startups.map((startup) => (
        //스타트업 카드
        <Box key={startup.id}>
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
            {/* 스타트업 정보 */}
            <StartupCard startupObj={startup} />
          </Box>
        </Box>
      ));
    }

    //설정한 카테고리 필터링
    const filteredStartups = startups.filter(
      (startup) => startup.sup_category === selectedValue
    );

    //설정한 카테고리 스타트업이 없을 경우
    if (filteredStartups.length === 0) {
      return (
        <Center mt="50px" mb="200px" fontSize="2xl" fontWeight="bold">
          아직 등록된 스타트업이 없습니다.
        </Center>
      );
    }

    return filteredStartups.map((startup) => (
      <Box key={startup.id}>
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
          <StartupCard startupObj={startup} />
        </Box>
      </Box>
    ));
  };

  return (
    //스타트업 리스트 전체 화면

    //스타트업 리스트 전체 배경 화면
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
        새로운 스타트업 찾기
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
          투자 중인 스타트업
        </Heading>
        {/* 스타트업 카테고리 버튼 */}
        <StartupCategory
          selectedValue={selectedValue}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Flex>
      {/* 스타트업 리스트 섹션 */}
      <Grid
        //형식
        gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
      >
        {renderStartups()}
      </Grid>
    </Box>
  );
};

export default ScreenStartupList;

//23.07.24 1차 코드 수정 완료
