import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, dbService } from "../firebase-config";
import { arrayUnion } from "firebase/firestore";
import { FaStar, FaRegStar } from "react-icons/fa6";
import {
  Box,
  Text,
  Heading,
  Image,
  useBreakpointValue,
  Divider,
  IconButton,
  Flex,
} from "@chakra-ui/react";

const ScreenStartupInfo = () => {
  // 사용자 UID를 저장하는 상태 변수
  const [userUid, setUserUid] = useState("");
  //양쪽 여백
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
  const { state } = useLocation();
  //스타트업 정보 초기값 설정
  const [activeButton, setActiveButton] = useState("");
  const [sup_nationality, setSupNationality] = useState("");
  const [sup_ceo, setSupCeo] = useState("");
  const [sup_homepage, setSupHomepage] = useState("");
  const [sup_size, setSupSize] = useState("");
  const [sup_amountOfInvestment, setSupAmountOfInvestment] = useState("");
  const [sup_numOfInvestment, setSupNumOfInvestment] = useState("");
  const [sup_roundOfInvestment, setSupRroundOfInvestment] = useState("");

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
      {/* 스타트업 정보 전체 화면 */}

      {/* 스타트업 정보 전체 배경 화면 */}
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
          스타트업 소개
        </Heading>

        {/* 스타트업 기본 정보 섹션 */}
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
            {/* 스타트업 로고 */}
            <Image
              //사진 위치
              src={state.sup_logo}
              //크기
              w="200px"
              h="200px"
              //배경
              borderRadius="lg"
              objectFit="cover"
            />
            {/* 스타트업 기본 정보 */}
            <Box
              //여백
              ml="25px"
            >
              <Flex
                //정렬
                align="center"
              >
                {/* 스타트업 이름 */}
                <Heading
                  //글자
                  as="h1"
                  size="lg"
                >
                  {state.sup_name}
                </Heading>
                {/* 좋아요 버튼 */}
                <IconButton
                  aria-label="Like"
                  backgroundColor="white"
                  ml="10px"
                  color={activeButton === "yellow" ? "yellow" : "black"}
                  onClick={handleClick}
                  icon={
                    activeButton === "yellow" ? (
                      <FaStar style={{ fontSize: "25px" }} />
                    ) : (
                      <FaRegStar style={{ fontSize: "25px" }} />
                    )
                  }
                />
              </Flex>
              {/* 스타트업 카테고리 */}
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
                  {state.sup_category}
                </Text>
              </Box>
              {/* 스타트업 정보 */}
              <Box>
                <Text
                  //글자
                  as="b"
                  fontSize="md"
                >
                  {state.sup_info}
                </Text>
              </Box>
            </Box>
          </Box>
          {/* 스타트업 기업 정보 섹션 */}
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
                    {sup_ceo}
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    {sup_nationality}
                  </Text>
                  <Text>{sup_size}</Text>
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
                    발행주식
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    업종
                  </Text>
                  <Text>홈페이지</Text>
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
                    통일 주권
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    데이터베이스 및 온라인 정보 제공업
                  </Text>
                  <Text>{sup_homepage}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider
            //여백
            mt="20px"
          />

          {/* 스타트업 투자 정보 섹션 */}
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
                투자정보
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
                    최종투자 단계
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    누적투자 금액
                  </Text>
                  <Text>투자유치 횟수</Text>
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
                    {sup_roundOfInvestment}
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    {sup_amountOfInvestment}
                  </Text>
                  <Text>{sup_numOfInvestment}</Text>
                </Box>
              </Box>
            </Box>

            <Box>
              <Text
                //글자
                as="b"
                fontSize="lg"
              >
                투자자
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
          <Divider
            //여백
            mt="20px"
          />
          {/* 스타트업 서비스&제품 섹션 */}
          <Box
            //크기 및 여백
            h="auto"
            mt="20px"
            ml="20px"
          >
            <Text
              //글자
              as="b"
              fontSize="lg"
            >
              서비스/제품
            </Text>
            <Box
              //정렬
              display="flex"
              flexDirection="row"
              //여백
              mt="25px"
              ml="10px"
            >
              <Image
                //사진 위치
                src={state.sup_logo}
                //크기
                w="60px"
                h="60px"
                //배경
                borderRadius="30px"
                objectFit="cover"
              />
              <Box
                //정렬
                display="flex"
                flexDirection="column"
                //여백
                mt="5px"
                ml="10px"
              >
                <Text
                  //글자
                  as="b"
                  fontSize="lg"
                >
                  페오펫
                </Text>
                <Text
                  //글자
                  as="b"
                  fontSize="sm"
                  color="#00A29D"
                >
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
