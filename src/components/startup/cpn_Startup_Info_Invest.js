import React, { useEffect } from "react";
import { dbService } from "../../firebase-config";
import { Text, Flex, Image } from "@chakra-ui/react";

const StartupInfoInvest = ({
  state,
  sup_amountOfInvestment,
  sup_numOfInvestment,
  sup_roundOfInvestment,
}) => {
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
          // 이제 state 안에 해당 값을 이미 가지고 있으므로, set 함수들을 호출할 필요 없음
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
    <Flex m="20px">
      <Flex flexDirection="column" mr="50px">
        <Text fontWeight="bold" fontSize="lg">
          투자정보
        </Text>
        <Flex m="15px">
          <Flex flexDirection="column" color="grey">
            <Text mb="10px">최종투자 단계</Text>
            <Text mb="10px">누적투자 금액</Text>
            <Text>투자유치 횟수</Text>
          </Flex>
          <Flex flexDirection="column" ml="50px">
            <Text mb="10px">{sup_roundOfInvestment}</Text>
            <Text mb="10px">{sup_amountOfInvestment}</Text>
            <Text>{sup_numOfInvestment}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDirection="column">
        <Text
          //글자
          fontWeight="bold"
          fontSize="lg"
        >
          투자자
        </Text>
        <Flex mt="15px">
          <Flex
            flexDirection="column"
            alignItems="center"
            marginX="10px"
            p="5px"
            borderRadius="xl"
            boxShadow="0 0 5px #00A29D"
          >
            <Image
              src="../image/community/company_ex1.png"
              w="100px"
              h="100px"
              borderRadius="xl"
            />
            <Text mt="5px" fontSize="sm">
              펫프랜즈
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            marginX="20px"
            p="5px"
            borderRadius="xl"
            boxShadow="0 0 5px #00A29D"
          >
            <Image
              src="../image/community/company_ex2.png"
              w="100px"
              h="100px"
              borderRadius="xl"
            />
            <Text mt="5px" fontSize="sm">
              페오펫
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            marginX="10px"
            p="5px"
            borderRadius="xl"
            boxShadow="0 0 5px #00A29D"
          >
            <Image
              src="../image/community/company_ex3.png"
              w="100px"
              h="100px"
              borderRadius="xl"
            />
            <Text mt="5px" fontSize="sm">
              핏펫
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StartupInfoInvest;
