import React from "react";
import { useLocation } from "react-router-dom";
import StartupInfoBasic from "../../components/startup/cpn_Startup_Info_Basic";
import StartupInfoCompany from "../../components/startup/cpn_Startup_Info_Company";
import StartupInfoInvest from "../../components/startup/cpn_Startup_Info_Invest";
import StartupInfoProduct from "../../components/startup/cpn_Startup_Info_Product";
import { Heading, Divider, Flex } from "@chakra-ui/react";

const ScreenStartupInfo = () => {
  const { state } = useLocation();

  return (
    <>
      {/* 스타트업 정보 전체 화면 */}

      {/* 스타트업 정보 전체 배경 화면 */}
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
          스타트업 소개
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
          {/* 스타트업 기본 정보 섹션 */}
          <StartupInfoBasic state={state} />
          {/* 스타트업 기업 정보 섹션 */}
          <StartupInfoCompany state={state} />
          <Divider m="20px 0" />
          {/* 스타트업 투자 정보 섹션 */}
          <StartupInfoInvest state={state} />
          <Divider m="20px 0" />
          {/* 스타트업 서비스&제품 섹션 */}
          <StartupInfoProduct state={state} />
        </Flex>
      </Flex>
    </>
  );
};

export default ScreenStartupInfo;

//23.07.24 1차 코드 수정 완료
//23.08.09 2차 코드 수정 완료
