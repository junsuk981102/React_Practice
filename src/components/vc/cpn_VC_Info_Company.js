import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const VCInfoCompany = ({ vc_ceo, vc_nationality, vc_homepage }) => {
  return (
    <Flex flexDirection="column" m="20px">
      <Text fontWeight="bold" fontSize="lg">
        기업정보
      </Text>
      {/* 왼쪽 섹션 */}
      <Flex
        //여백
        m="15px"
      >
        {/* 고정값 */}
        <Flex
          //정렬
          flexDirection="column"
          //글자
          color="grey"
        >
          <Text
            //여백
            mb="10px"
          >
            대표자
          </Text>
          <Text
            //여백
            mb="10px"
          >
            국적
          </Text>
          <Text>회사구분</Text>
        </Flex>
        {/* 변동값 */}
        <Flex
          //정렬
          flexDirection="column"
          //여백
          ml="50px"
        >
          <Text
            //여백
            mb="10px"
          >
            {vc_ceo}
          </Text>
          <Text
            //여백
            mb="10px"
          >
            {vc_nationality}
          </Text>
          <Text>벤처캐피탈</Text>
        </Flex>

        {/* 오른쪽 섹션 */}
        <Flex>
          {/* 고정값 */}
          <Flex
            //정렬
            flexDirection="column"
            //여백
            ml="100px"
            //글자
            color="grey"
          >
            <Text
              //여백
              mb="10px"
            >
              법인분류
            </Text>
            <Text mb="10px">업력</Text>
            <Text>홈페이지</Text>
          </Flex>
          {/* 변동값 */}
          <Flex
            //정렬
            flexDirection="column"
            //여백
            ml="50px"
          >
            <Text
              //여백
              mb="10px"
            >
              주식회사
            </Text>
            <Text
              //여백
              mb="10px"
            >
              27.5년차
            </Text>
            <Text>{vc_homepage}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VCInfoCompany;
