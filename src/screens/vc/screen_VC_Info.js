import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, Heading, Image, Divider, Flex } from "@chakra-ui/react";
import { dbService } from "../../firebase-config";

const ScreenVCInfo = () => {
  const { state } = useLocation();
  //VC 정보 초기값 설정
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

    fetchVcInformation();
  }, [state.id]);

  useEffect(() => {
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

    fetchInvestInformation();
  }, [state.id]);

  return (
    <>
      {/* VC 정보 전체 화면 */}

      {/* VC 정보 전체 배경 화면 */}
      <Flex
        //정렬
        flexDirection="column"
        alignItems="center"
        //크기 및 여백
        h="auto"
        pb="200px"
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Heading
          //여백
          marginY="30px"
          //글자
          size="lg"
        >
          VC 소개
        </Heading>

        {/* VC 기본 정보 섹션 */}
        <Flex
          //정렬
          flexDirection="column"
          //크기 및 여백
          w="800px"
          h="auto"
          p="30px"
          //배경
          bg="white"
          border="3px solid #00A29D"
          borderRadius="lg"
        >
          <Flex
            //위치 및 정렬
            alignItems="center"
            //크기
            h="auto"
          >
            {/* VC 로고 */}
            <Image
              //사진 위치
              src={state.vc_logo}
              //크기
              w="200px"
              h="200px"
              //배경
              borderRadius="xl"
              objectFit="cover"
            />
            <Flex
              //정렬
              flexDirection="column"
              //여백
              ml="25px"
            >
              {/* VC 이름 */}
              <Heading
                //글자
                size="lg"
              >
                {state.vc_name}
              </Heading>
              {/* VC 카테고리 */}
              <Box
                //정렬
                textAlign="center"
                //크기 및 여백
                w="100px"
                p="5px"
                marginY="10px"
                //배경
                bg="#00A29D"
                borderRadius="xl"
                //글자
                fontWeight="bold"
                fontSize="md"
                color="white"
              >
                {state.vc_category}{" "}
              </Box>
              {/* VC 정보 */}
              <Text
                //글자
                fontSize="md"
              >
                {state.vc_info}
              </Text>
            </Flex>
          </Flex>

          {/* VC 기업 정보 섹션 */}
          <Box
            //여백
            m="20px"
          >
            <Text
              //글자
              fontWeight="bold"
              fontSize="lg"
            >
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
          </Box>

          <Divider
            //여백
            mt="20px"
          />

          {/* VC 투자 정보 섹션 */}
          <Flex
            //여백
            m="20px"
          >
            <Box
              //여백
              mr="50px"
            >
              <Text
                //글자
                fontWeight="bold"
                fontSize="lg"
              >
                투자정보(2015년 이후)
              </Text>
              <Flex
                //여백
                m="15px"
              >
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
                    총 선택 건수
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    총 집행 금액
                  </Text>
                  <Text>운용 펀드</Text>
                </Flex>
                <Flex
                  //정렬
                  flexDirection="column"
                  ml="50px"
                >
                  <Text
                    //여백
                    mb="10px"
                  >
                    {vc_numOfInvestment}
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    {vc_amountOfInvestment}
                  </Text>
                  <Text>4개</Text>
                </Flex>
              </Flex>
            </Box>

            <Box>
              <Text
                //글자
                fontWeight="bold"
                fontSize="lg"
              >
                주요 투자 대상
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
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ScreenVCInfo;

//23.07.24 1차 코드 수정 완료
