import React from "react";
import VCCard from "../../components/vc/cpn_VC_Card";
import { Flex, Center, Grid } from "@chakra-ui/react";

const VCGridlist = ({ vcs, selectedValue }) => {
  const renderVCs = () => {
    if (selectedValue === "전체") {
      //초기값일 때 모든 리스트 출력
      return vcs.map((vc) => (
        //VC 카드
        <Flex key={vc.id} m="20px">
          {/* VC 정보 */}
          <VCCard vcObj={vc} />
        </Flex>
      ));
    }
    //설정한 카테고리 필터링
    const filteredVCs = vcs.filter((vc) => vc.vc_category === selectedValue);
    //설정한 카테고리 스타트업이 없을 경우
    if (filteredVCs.length === 0) {
      return (
        <Center m="50px 0 200px 0" fontSize="2xl" fontWeight="bold">
          아직 등록된 VC가 없습니다.
        </Center>
      );
    }
    //설정한 카테고리 VC 카드 출력
    return filteredVCs.map((vc) => (
      //VC 카드
      <Flex key={vc.id} m="20px">
        {/* VC 정보 */}
        <VCCard vcObj={vc} />
      </Flex>
    ));
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="30px">
      {/* VC 카드 리스트 */}
      {renderVCs()}
    </Grid>
  );
};

export default VCGridlist;

//23.07.27 1차 코드 수정
//23.08.08 2차 코드 수정
