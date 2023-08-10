import React from "react";
import { useLocation } from "react-router-dom";
import VCInfoBasic from "../../components/vc/cpn_VC_Info_Basic";
import VCInfoCompany from "../../components/vc/cpn_VC_Info_Company";
import VCInfoInvest from "../../components/vc/cpn_VC_Info_Invest";
import { Flex, Heading, Divider } from "@chakra-ui/react";

const ScreenVCInfo = () => {
  const { state } = useLocation();

  return (
    <>
      {/* VC 정보 전체 화면 */}

      {/* VC 정보 전체 배경 화면 */}
      <Flex
        flexDirection="column"
        alignItems="center"
        h="auto"
        pb="200px"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 제목 섹션 */}
        <Heading m="30px 0" size="lg">
          VC 소개
        </Heading>
        {/* 정보 섹션 */}
        <Flex
          flexDirection="column"
          w="800px"
          h="auto"
          p="30px"
          bg="white"
          border="3px solid #00A29D"
          borderRadius="xl"
        >
          {/* VC 기본 정보 섹션 */}
          <VCInfoBasic state={state} />
          {/* VC 기업 정보 섹션 */}
          <VCInfoCompany state={state} />
          <Divider m="20px 0" />
          {/* VC 투자 정보 섹션 */}
          <VCInfoInvest state={state} />
        </Flex>
      </Flex>
    </>
  );
};

export default ScreenVCInfo;

//23.08.09 1차 코드 수정 완료
