import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import VCCategory from "../../components/vc/cpn_VC_Category";
import VCGridlist from "../../components/vc/cpn_VC_Gridlist";
import { Heading, Flex, useBreakpointValue } from "@chakra-ui/react";

const ScreenVCList = () => {
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); //양쪽 여백
  const [vcs, setVCs] = useState([]); //VC 설정
  const [selectedValue, setSelectedValue] = useState("전체"); //카테고리 리스트 초기값 설정
  //VC 리스트 설정값 변경
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

  return (
    <Flex
      flexDirection="column"
      h="auto"
      px={boxPadding}
      pb="200px"
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      {/* VC 제목 & 카테고리 버튼 */}
      <Heading mt="30px" mb="5px" size="md">
        새로운 VC 찾기
      </Heading>
      <Flex justifyContent="space-between" mb="30px">
        {/* VC 제목 */}
        <Heading size="lg">투자 중인 VC</Heading>
        {/* 카테고리 버튼 */}
        <VCCategory
          selectedValue={selectedValue}
          handleMenuItemClick={handleMenuItemClick}
        />
      </Flex>
      {/* VC 리스트 섹션 */}
      <VCGridlist vcs={vcs} selectedValue={selectedValue} />
    </Flex>
  );
};

export default ScreenVCList;

//23.08.09 1차 코드 수정
