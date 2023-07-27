import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

const VCInfoInvest = ({ vc_amountOfInvestment, vc_numOfInvestment }) => {
  return (
    <>
      {/* VC 투자 정보 */}
      <Flex m="20px">
        {/* VC 투자 정보 섹션 */}
        <Flex flexDirection="column" mr="50px">
          <Text fontWeight="bold" fontSize="lg">
            투자정보(2015년 이후)
          </Text>
          <Flex m="15px">
            <Flex flexDirection="column" color="grey">
              <Text mb="10px">총 선택 건수</Text>
              <Text mb="10px">총 집행 금액</Text>
              <Text>운용 펀드</Text>
            </Flex>
            <Flex flexDirection="column" ml="50px">
              <Text mb="10px">{vc_numOfInvestment}</Text>
              <Text mb="10px">{vc_amountOfInvestment}</Text>
              <Text>4개</Text>
            </Flex>
          </Flex>
        </Flex>
        {/* VC 투자 대상 섹션 */}
        <Flex flexDirection="column">
          <Text fontWeight="bold" fontSize="lg">
            주요 투자 대상
          </Text>
          <Flex mt="15px">
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

export default VCInfoInvest;

//23.07.27 1차 코드 수정
