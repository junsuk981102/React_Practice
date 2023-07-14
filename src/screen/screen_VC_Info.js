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
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20x", xl: "200px" });
  const { state } = useLocation();

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
      <Box
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        pb="50px"
        bg="#E5F2F2"
        h="auto"
        borderTop="1px solid #00A29D"
      >
        <Heading
          //위치
          mt="30px"
          mb="30px"
          //크기
          as="h1"
          size="lg"
        >
          VC 소개
        </Heading>

        <Box
          w="800px"
          h="auto"
          p="30px"
          bg="white"
          border="3px solid #00A29D"
          borderRadius="lg"
        >
          <Box h="auto" display="flex" position="relative" alignItems="center">
            <Image
              src={state.vc_logo}
              w="200px"
              h="200px"
              objectFit="cover"
              borderRadius="lg"
            />
            <Box ml="25px">
              <Heading
                //글자
                as="h1"
                size="lg"
              >
                {state.vc_name}
              </Heading>
              <Box
                w="150px"
                h="auto"
                p="5px"
                mt="10px"
                mb="10px"
                bg="#00A29D"
                borderRadius="xl"
                textAlign="center"
              >
                <Text fontSize="md" as="b" color="white">
                  {state.vc_category}
                </Text>
              </Box>
              <Box>
                <Text fontSize="md" as="b">
                  {state.vc_info}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box ml="20px" mt="30px">
            <Text fontSize="lg" as="b">
              기업정보
            </Text>
            <Box display="flex" flexDirection="row" ml="10px" mt="25px">
              <Box display="flex" flexDirection="row" mr="120px">
                <Box
                  display="flex"
                  flexDirection="column"
                  mr="50px"
                  color="grey"
                >
                  <Text mb="10px">대표자</Text>
                  <Text mb="10px">국적</Text>
                  <Text>회사구분</Text>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text mb="10px">{vc_ceo}</Text>
                  <Text mb="10px">{vc_nationality}</Text>
                  <Text>벤처캐피탈</Text>
                </Box>
              </Box>

              <Box display="flex" flexDirection="row">
                <Box
                  display="flex"
                  flexDirection="column"
                  mr="50px"
                  color="grey"
                >
                  <Text mb="10px">법인분류</Text>
                  <Text mb="10px">업력</Text>
                  <Text>홈페이지</Text>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text mb="10px">주식회사</Text>
                  <Text mb="10px">27.5년차</Text>
                  <Text>{vc_homepage}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider mt="20px" />

          <Box h="auto" ml="20px" mt="20px" display="flex" flexDirection="row">
            <Box mr="190px">
              <Text fontSize="lg" as="b">
                투자정보(2015년 이후)
              </Text>
              <Box display="flex" flexDirection="row" ml="10px" mt="25px">
                <Box
                  display="flex"
                  flexDirection="column"
                  mr="50px"
                  color="grey"
                >
                  <Text mb="10px">총 선탠 건수</Text>
                  <Text mb="10px">총 집핸 금액</Text>
                  <Text>운용 펀드</Text>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text mb="10px">{vc_numOfInvestment}</Text>
                  <Text mb="10px">{vc_amountOfInvestment}</Text>
                  <Text>4개</Text>
                </Box>
              </Box>
            </Box>

            <Box>
              <Text fontSize="lg" as="b">
                주요 투자 대상
              </Text>
              <Box display="flex" flexDirection="row" ml="10px" mt="20px">
                <Image w="90px" h="110px" src="../image/startup1.png" />
                <Image w="90px" h="110px" src="../image/startup2.png" />
                <Image w="90px" h="110px" src="../image/startup3.png" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScreenVCInfo;
