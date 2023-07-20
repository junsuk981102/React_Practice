import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  Image,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import { dbService } from "../firebase-config";

const ScreenVCInfo = () => {
  //양쪽 여백
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
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
      <Box
        //크기 및 여백
        h="auto"
        pb="50px"
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        <Heading
          //여백
          mt="30px"
          mb="30px"
          //글자
          as="h1"
          size="lg"
        >
          VC 소개
        </Heading>

        {/* VC 기본 정보 섹션 */}
        <Box
          //크기 및 여백
          w="800px"
          h="auto"
          p="30px"
          //배경
          bg="white"
          border="3px solid #00A29D"
          borderRadius="lg"
        >
          <Box
            //위치 및 정렬
            position="relative"
            display="flex"
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
              borderRadius="lg"
              objectFit="cover"
            />
            <Box
              //여백
              ml="25px"
            >
              {/* VC 이름 */}
              <Heading
                //글자
                as="h1"
                size="lg"
              >
                {state.vc_name}
              </Heading>
              {/* VC 카테고리 */}
              <Box
                //정렬
                textAlign="center"
                //크기 및 여백
                w="150px"
                h="auto"
                p="5px"
                mt="10px"
                mb="10px"
                //배경
                bg="#00A29D"
                borderRadius="xl"
              >
                <Text
                  //글자
                  as="b"
                  fontSize="md"
                  color="white"
                >
                  {state.vc_category}
                </Text>
              </Box>
              {/* VC 정보 */}

              <Box>
                <Text
                  //글자
                  as="b"
                  fontSize="md"
                >
                  {state.vc_info}
                </Text>
              </Box>
            </Box>
          </Box>

          {/* VC 기업 정보 섹션 */}
          <Box
            //여백
            mt="30px"
            ml="20px"
          >
            <Text
              //글자
              as="b"
              fontSize="lg"
            >
              기업정보
            </Text>
            <Box
              //정렬
              display="flex"
              flexDirection="row"
              //여백
              mt="25px"
              ml="10px"
            >
              <Box
                //정렬
                display="flex"
                flexDirection="row"
                //여백
                mr="120px"
              >
                <Box
                  //정렬
                  display="flex"
                  flexDirection="column"
                  //여백
                  mr="50px"
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
                </Box>
                <Box
                  //정렬
                  display="flex"
                  flexDirection="column"
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
                </Box>
              </Box>

              <Box
                //정렬
                display="flex"
                flexDirection="row"
              >
                <Box
                  //정렬
                  display="flex"
                  flexDirection="column"
                  //여백
                  mr="50px"
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
                  <Text
                    //여백
                    mb="10px"
                  >
                    홈페이지
                  </Text>
                </Box>
                <Box
                  //정렬
                  display="flex"
                  flexDirection="column"
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
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider
            //여백
            mt="20px"
          />

          {/* VC 투자 정보 섹션 */}
          <Box
            //정렬
            display="flex"
            flexDirection="row"
            //크기 및 여백
            h="auto"
            mt="20px"
            ml="20px"
          >
            <Box
              //여백
              mr="190px"
            >
              <Text
                //글자
                as="b"
                fontSize="lg"
              >
                투자정보(2015년 이후)
              </Text>
              <Box
                //정렬
                display="flex"
                flexDirection="row"
                //여백
                mt="25px"
                ml="10px"
              >
                <Box
                  //정렬
                  display="flex"
                  flexDirection="column"
                  //여백
                  mr="50px"
                  //글자
                  color="grey"
                >
                  <Text
                    //여백
                    mb="10px"
                  >
                    총 선탠 건수
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    총 집핸 금액
                  </Text>
                  <Text>운용 펀드</Text>
                </Box>
                <Box
                  //정렬
                  display="flex"
                  flexDirection="column"
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
                </Box>
              </Box>
            </Box>

            <Box>
              <Text
                //글자
                as="b"
                fontSize="lg"
              >
                주요 투자 대상
              </Text>
              <Box
                //정렬
                display="flex"
                flexDirection="row"
                //여백
                mt="20px"
                ml="10px"
              >
                <Image
                  //사진 위치
                  src="../image/startup1.png"
                  //크기
                  w="90px"
                  h="110px"
                />
                <Image
                  //사진 위치
                  src="../image/startup2.png"
                  //크기
                  w="90px"
                  h="110px"
                />
                <Image
                  //사진 위치
                  src="../image/startup3.png"
                  //크기
                  w="90px"
                  h="110px"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScreenVCInfo;
