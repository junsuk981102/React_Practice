import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const VCInfoCompany = ({ vc_ceo, vc_nationality, vc_homepage }) => {
  return (
    <>
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
            <Text mb="10px">{vc_ceo}</Text>
            <Text mb="10px">{vc_nationality}</Text>
            <Text>벤처캐피탈</Text>
          </Flex>
          {/* 오른쪽 섹션 */}
          <Flex>
            <Flex flexDirection="column" ml="100px" color="grey">
              <Text mb="10px">법인분류</Text>
              <Text mb="10px">업력</Text>
              <Text>홈페이지</Text>
            </Flex>
            <Flex flexDirection="column" ml="50px">
              <Text mb="10px">주식회사</Text>
              <Text mb="10px">27.5년차</Text>
              <Text>{vc_homepage}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default VCInfoCompany;

//23.07.27 1차 코드 수정
