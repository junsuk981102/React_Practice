import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import { Flex, Text } from "@chakra-ui/react";

const StartupInfoCompany = ({ state }) => {
  const [sup_nationality, setSupNationality] = useState("");
  const [sup_ceo, setSupCeo] = useState("");
  const [sup_homepage, setSupHomepage] = useState("");
  const [sup_size, setSupSize] = useState("");
  //sup_info 정보 가져오기
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

  return (
    <>
      {/* 스타트업 기업 정보 */}
      <Flex flexDirection="column" m="20px">
        <Text fontWeight="bold" fontSize="lg">
          기업정보
        </Text>
        <Flex m="15px">
          {/* 왼쪽 섹션 */}
          <Flex flexDirection="column" color="grey">
            <Text mb="10px">대표자</Text>
            <Text mb="10px">국적</Text>
            <Text>회사구분</Text>
          </Flex>
          <Flex flexDirection="column" ml="50px">
            <Text mb="10px">{sup_ceo}</Text>
            <Text mb="10px">{sup_nationality}</Text>
            <Text>{sup_size}</Text>
          </Flex>
          {/* 오른쪽 섹션 */}
          <Flex>
            <Flex flexDirection="column" ml="100px" color="grey">
              <Text mb="10px">발행주식</Text>
              <Text mb="10px">업종</Text>
              <Text>홈페이지</Text>
            </Flex>
            <Flex flexDirection="column" ml="50px">
              <Text mb="10px">통일 주권</Text>
              <Text mb="10px">데이터베이스 및 온라인 정보 제공업</Text>
              <Text>{sup_homepage}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default StartupInfoCompany;

//23.07.27 1차 코드 수정
//23.08.08 2차 코드 수정
