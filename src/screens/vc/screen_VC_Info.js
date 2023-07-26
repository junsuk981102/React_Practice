import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Flex, Heading, Divider } from "@chakra-ui/react";
import { dbService } from "../../firebase-config";

import VCInfoBasic from "../../components/vc/cpn_VC_Info_Basic";
import VCInfoCompany from "../../components/vc/cpn_VC_Info_Company";
import VCInfoInvest from "../../components/vc/cpn_VC_Info_Invest";

const ScreenVCInfo = () => {
  const { state } = useLocation();
  const [vc_nationality, setVcNationality] = useState("");
  const [vc_ceo, setVcCeo] = useState("");
  const [vc_homepage, setVcHomepage] = useState("");
  const [vc_amountOfInvestment, setVcAmountOfInvestment] = useState("");
  const [vc_numOfInvestment, setVcNumOfInvestment] = useState("");

  useEffect(() => {
    const fetchVcInformation = async () => {
      try {
        const vcInfoRef = dbService
          .collection("vc_list")
          .doc(state.id)
          .collection("info")
          .doc("vc_info");
        const doc = await vcInfoRef.get();

        if (doc.exists) {
          const data = doc.data();
          setVcNationality(data.vc_nationality);
          setVcCeo(data.vc_ceo);
          setVcHomepage(data.vc_homepage);
        } else {
          console.log("문서가 존재하지 않습니다.");
        }
      } catch (error) {
        console.log("데이터 가져오기 실패:", error);
      }
    };

    const fetchInvestInformation = async () => {
      try {
        const vcInfoRef = dbService
          .collection("vc_list")
          .doc(state.id)
          .collection("info")
          .doc("invest_info");
        const doc = await vcInfoRef.get();

        if (doc.exists) {
          const data = doc.data();
          setVcAmountOfInvestment(data.vc_amountOfInvestment);
          setVcNumOfInvestment(data.vc_numOfInvestment);
        } else {
          console.log("문서가 존재하지 않습니다.");
        }
      } catch (error) {
        console.log("데이터 가져오기 실패:", error);
      }
    };

    fetchVcInformation();
    fetchInvestInformation();
  }, [state.id]);

  return (
    <>
      {/* VC 정보 전체 화면 */}
      <Flex
        flexDirection="column"
        alignItems="center"
        h="auto"
        pb="200px"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Heading marginY="30px" size="lg">
          VC 소개
        </Heading>
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
          <VCInfoCompany
            vc_ceo={vc_ceo}
            vc_nationality={vc_nationality}
            vc_homepage={vc_homepage}
          />

          <Divider marginY="20px" />

          {/* VC 투자 정보 섹션 */}
          <VCInfoInvest
            vc_amountOfInvestment={vc_amountOfInvestment}
            vc_numOfInvestment={vc_numOfInvestment}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default ScreenVCInfo;
