import React, { useEffect } from "react";
import { dbService } from "../../firebase-config";
import { Text, Flex } from "@chakra-ui/react";

const StartupInfoCompany = ({
  state,
  sup_ceo,
  sup_nationality,
  sup_size,
  sup_homepage,
}) => {
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
          // 이제 state 안에 해당 값을 이미 가지고 있으므로, set 함수들을 호출할 필요 없음
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
    <Flex flexDirection="column" m="20px">
      <Text fontWeight="bold" fontSize="lg">
        기업정보
      </Text>
      <Flex m="15px">
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
  );
};

export default StartupInfoCompany;
