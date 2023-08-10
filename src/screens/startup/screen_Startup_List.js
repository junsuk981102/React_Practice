import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import StartupCategory from "../../components/startup/cpn_Startup_Category";
import StartupGridlist from "../../components/startup/cpn_Startup_Gridlist";
import { Heading, Flex, useBreakpointValue } from "@chakra-ui/react";

const ScreenStartupList = () => {
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); //양쪽 여백
  const [startups, setStartups] = useState([]); //스타트업 설정
  const [selectedValue, setSelectedValue] = useState("전체"); //카테고리 리스트 초기값 설정
  //스타트업 리스트 설정값 변경
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

  return (
    <Flex
      flexDirection="column"
      h="auto"
      px={boxPadding}
      pb="200px"
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      {/* 스타트업 제목 & 카테고리 버튼 */}
      <Heading mt="30px" mb="5px" size="md">
        새로운 스타트업 찾기
      </Heading>
      <Flex justifyContent="space-between" mb="30px">
        {/* 스타트업 제목 */}
        <Heading size="lg">투자 중인 스타트업</Heading>
        {/* 카테고리 버튼 */}
        <StartupCategory
          selectedValue={selectedValue}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Flex>
      {/* 스타트업 리스트 섹션 */}
      <StartupGridlist startups={startups} selectedValue={selectedValue} />
    </Flex>
  );
};

export default ScreenStartupList;

//23.08.09 1차 코드 수정
