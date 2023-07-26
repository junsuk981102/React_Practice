import React from "react";
import { Box, Grid, Center } from "@chakra-ui/react";
import StartupCard from "../../components/startup/cpn_Startup_Card";

const StartupGridlist = ({ startups, selectedValue }) => {
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
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))">
      {renderStartups()}
    </Grid>
  );
};

export default StartupGridlist;
