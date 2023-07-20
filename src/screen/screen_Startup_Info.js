import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  Image,
  useBreakpointValue,
  Divider,
  IconButton,
  Flex,
  Center,
} from "@chakra-ui/react";
import { auth, dbService } from "../firebase-config";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { arrayUnion } from "firebase/firestore";

const ScreenStartupInfo = () => {
  // 사용자 UID를 저장하는 상태 변수
  const [userUid, setUserUid] = useState("");

  // 사용자 UID 가져오기
  useEffect(() => {
    const getUserUid = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserUid(user.uid);
        }
      } catch (error) {
        console.log("사용자 UID 가져오기 실패:", error);
      }
    };

    getUserUid();
  }, []);

  function handleClick() {
    setActiveButton((prevState) => (prevState === "yellow" ? "" : "yellow")); //아이콘 색깔 변화
    // 사용자 UID가 유효한 경우에만 실행
    if (userUid) {
      // 스타트업의 UID를 저장할 변수
      const startupUid = state.id;

      // 사용자 문서 참조
      const userDocRef = dbService.collection("user_list").doc(userUid);

      // 사용자 문서 업데이트
      userDocRef.update({
        startupUids: arrayUnion(startupUid),
      });
    }
  }

  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
  const { state } = useLocation();

  const [activeButton, setActiveButton] = useState("");
  const [sup_nationality, setSupNationality] = useState("");
  const [sup_ceo, setSupCeo] = useState("");
  const [sup_homepage, setSupHomepage] = useState("");
  const [sup_size, setSupSize] = useState("");

  const [sup_amountOfInvestment, setSupAmountOfInvestment] = useState("");
  const [sup_numOfInvestment, setSupNumOfInvestment] = useState("");
  const [sup_roundOfInvestment, setSupRroundOfInvestment] = useState("");

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
          setSupRroundOfInvestment(data.sup_roundOfInvestment);
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
          스타트업 소개
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
              src={state.sup_logo}
              w="200px"
              h="200px"
              objectFit="cover"
              borderRadius="lg"
            />
            <Box ml="25px">
              <Flex align="center">
                <Heading
                  //글자
                  as="h1"
                  size="lg"
                >
                  {state.sup_name}
                </Heading>
                <IconButton
                  aria-label="Like"
                  backgroundColor="white"
                  ml="10px"
                  onClick={handleClick}
                  color={activeButton === "yellow" ? "yellow" : "black"}
                  icon={
                    activeButton === "yellow" ? (
                      <FaStar style={{ fontSize: "25px" }} />
                    ) : (
                      <FaRegStar style={{ fontSize: "25px" }} />
                    )
                  }
                />
              </Flex>

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
                  {state.sup_category}
                </Text>
              </Box>
              <Box>
                <Text fontSize="md" as="b">
                  {state.sup_info}
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
                  <Text mb="10px">{sup_ceo}</Text>
                  <Text mb="10px">{sup_nationality}</Text>
                  <Text>{sup_size}</Text>
                </Box>
              </Box>

              <Box display="flex" flexDirection="row">
                <Box
                  display="flex"
                  flexDirection="column"
                  mr="50px"
                  color="grey"
                >
                  <Text mb="10px">발행주식</Text>
                  <Text mb="10px">업종</Text>
                  <Text>홈페이지</Text>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text mb="10px">통일 주권</Text>
                  <Text mb="10px">데이터베이스 및 온라인 정보 제공업</Text>
                  <Text>{sup_homepage}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider mt="20px" />

          <Box h="auto" ml="20px" mt="20px" display="flex" flexDirection="row">
            <Box mr="190px">
              <Text fontSize="lg" as="b">
                투자정보
              </Text>
              <Box display="flex" flexDirection="row" ml="10px" mt="25px">
                <Box
                  display="flex"
                  flexDirection="column"
                  mr="50px"
                  color="grey"
                >
                  <Text mb="10px">최종투자 단계</Text>
                  <Text mb="10px">누적투자 금액</Text>
                  <Text>투자유치 횟수</Text>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text mb="10px">{sup_roundOfInvestment}</Text>
                  <Text mb="10px">{sup_amountOfInvestment}</Text>
                  <Text>{sup_numOfInvestment}</Text>
                </Box>
              </Box>
            </Box>

            <Box>
              <Text fontSize="lg" as="b">
                투자자
              </Text>
              <Box display="flex" flexDirection="row" ml="10px" mt="20px">
                <Image w="90px" h="110px" src="../image/startup1.png" />
                <Image w="90px" h="110px" src="../image/startup2.png" />
                <Image w="90px" h="110px" src="../image/startup3.png" />
              </Box>
            </Box>
          </Box>

          <Divider mt="20px" />

          <Box h="auto" ml="20px" mt="20px">
            <Text fontSize="lg" as="b">
              서비스/제품
            </Text>
            <Box display="flex" flexDirection="row" ml="10px" mt="25px">
              <Image
                src={state.sup_logo}
                w="60px"
                h="60px"
                objectFit="cover"
                borderRadius="30px"
              />
              <Box display="flex" flexDirection="column" mt="5px" ml="10px">
                <Text fontSize="lg" as="b">
                  페오펫
                </Text>
                <Text color="#00A29D" fontSize="sm" as="b">
                  간편 모바일 반려동물등록 서비스
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScreenStartupInfo;
