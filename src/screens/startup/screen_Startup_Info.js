import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, dbService } from "../../firebase-config";
import { Heading, Divider, Flex } from "@chakra-ui/react";

import StartupInfoBasic from "../../components/startup/cpn_Startup_Info_Basic";
import StartupInfoCompany from "../../components/startup/cpn_Startup_Info_Company";
import StartupInfoInvest from "../../components/startup/cpn_Startup_Info_Invest";
import StartupInfoProduct from "../../components/startup/cpn_Startup_Info_Product";

const ScreenStartupInfo = () => {
  const [userUid, setUserUid] = useState("");
  const { state } = useLocation();
  const [sup_nationality, setSupNationality] = useState("");
  const [sup_ceo, setSupCeo] = useState("");
  const [sup_homepage, setSupHomepage] = useState("");
  const [sup_size, setSupSize] = useState("");
  const [sup_amountOfInvestment, setSupAmountOfInvestment] = useState("");
  const [sup_numOfInvestment, setSupNumOfInvestment] = useState("");
  const [sup_roundOfInvestment, setSupRoundOfInvestment] = useState("");

  useEffect(() => {
    const getUserUid = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserUid(user.uid);
        }
      } catch (error) {
        console.log("사용자 UID 가져오기 실패:", error);
      }
    };

    getUserUid();
  }, []);

  useEffect(() => {
    const fetchSupInformation = async () => {
      try {
        const supInfoRef = dbService
          .collection("startup_list")
          .doc(state.id)
          .collection("info")
          .doc("sup_info");

        const doc = await supInfoRef.get();

        if (doc.exists) {
          const data = doc.data();
          setSupNationality(data.sup_nationality);
          setSupCeo(data.sup_ceo);
          setSupHomepage(data.sup_homepage);
          setSupSize(data.sup_size);
        } else {
          console.log("문서가 존재하지 않습니다.");
        }
      } catch (error) {
        console.log("데이터 가져오기 실패:", error);
      }
    };

    fetchSupInformation();
  }, [state.id]);

  useEffect(() => {
    const fetchInvestInformation = async () => {
      try {
        const supInfoRef = dbService
          .collection("startup_list")
          .doc(state.id)
          .collection("info")
          .doc("invest_info");

        const doc = await supInfoRef.get();

        if (doc.exists) {
          const data = doc.data();
          setSupAmountOfInvestment(data.sup_amountOfInvestment);
          setSupNumOfInvestment(data.sup_numOfInvestment);
          setSupRoundOfInvestment(data.sup_roundOfInvestment);
        } else {
          console.log("문서가 존재하지 않습니다.");
        }
      } catch (error) {
        console.log("데이터 가져오기 실패:", error);
      }
    };

    fetchInvestInformation();
  }, [state.id]);

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
        <Heading marginY="30px" size="lg">
          스타트업 소개
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
          {/* 스타트업 기본 정보 섹션 */}
          <StartupInfoBasic state={state} />

          {/* 스타트업 기업 정보 섹션 */}
          <StartupInfoCompany
            state={state}
            sup_ceo={sup_ceo}
            sup_nationality={sup_nationality}
            sup_size={sup_size}
            sup_homepage={sup_homepage}
          />

          <Divider marginY="20px" />

          {/* 스타트업 투자 정보 섹션 */}
          <StartupInfoInvest
            state={state}
            sup_amountOfInvestment={sup_amountOfInvestment}
            sup_numOfInvestment={sup_numOfInvestment}
            sup_roundOfInvestment={sup_roundOfInvestment}
          />

          <Divider marginY="20px" />

          {/* 스타트업 서비스&제품 섹션 */}
          <StartupInfoProduct state={state} />
        </Flex>
      </Flex>
    </>
  );
};

export default ScreenStartupInfo;

//23.07.24 1차 코드 수정 완료
