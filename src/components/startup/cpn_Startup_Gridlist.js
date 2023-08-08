import React from "react";
import StartupCard from "../../components/startup/cpn_Startup_Card";
import { Flex, Center, Grid } from "@chakra-ui/react";

const StartupGridlist = ({ startups, selectedValue }) => {
  const renderStartups = () => {
    if (selectedValue === "전체") {
      //초기값일 때 모든 리스트 출력
      return startups.map((startup) => (
        //스타트업 카드
        <Flex key={startup.id} m="20px">
          {/* 스타트업 정보 */}
          <StartupCard startupObj={startup} />
        </Flex>
      ));
    }
    //설정한 카테고리 필터링
    const filteredStartups = startups.filter(
      (startup) => startup.sup_category === selectedValue
    );
    //설정한 카테고리 스타트업이 없을 경우
    if (filteredStartups.length === 0) {
      return (
        <Center m="50px 0 200px 0" fontSize="2xl" fontWeight="bold">
          아직 등록된 스타트업이 없습니다.
        </Center>
      );
    }
    //설정한 카테고리 스타트업 카드 출력
    return filteredStartups.map((startup) => (
      //스타트업 카드
      <Flex key={startup.id} m="20px">
        {/* 스타트업 정보 */}
        <StartupCard startupObj={startup} />
      </Flex>
    ));
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="30px">
      {/* 스타트업 카드 리스트 */}
      {renderStartups()}
    </Grid>
  );
};

export default StartupGridlist;

//23.07.27 1차 코드 수정
//23.08.08 2차 코드 수정
