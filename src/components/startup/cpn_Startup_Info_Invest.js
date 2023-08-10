import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase-config";
import { Flex, Text, Image } from "@chakra-ui/react";

const StartupInfoInvest = ({ state }) => {
  const [sup_amountOfInvestment, setSupAmountOfInvestment] = useState("");
  const [sup_numOfInvestment, setSupNumOfInvestment] = useState("");
  const [sup_roundOfInvestment, setSupRoundOfInvestment] = useState("");
  //invest_info 정보 가져오기
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
      {/* 스타트업 투자 정보 */}
      <Flex m="20px">
        {/* 스타트업 투자 정보 섹션 */}
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
        {/* 스타트업 투자자 섹션 */}
        <Flex flexDirection="column">
          <Text fontWeight="bold" fontSize="lg">
            투자자
          </Text>
          <Flex m="15px">
            <Flex
              flexDirection="column"
              alignItems="center"
              m="0 10px"
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
              m="0 10px"
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
              m="0 10px"
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
    </>
  );
};

export default StartupInfoInvest;

//23.07.27 1차 코드 수정
//23.08.08 2차 코드 수정
