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
  Divider,
  IconButton,
  Flex,
} from "@chakra-ui/react";

const ScreenStartupInfo = () => {
  // 사용자 UID를 저장하는 상태 변수
  const [userUid, setUserUid] = useState("");
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
          스타트업 소개
        </Heading>

        {/* 스타트업 기본 정보 섹션 */}
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
          borderRadius="xl"
        >
          <Flex
            //정렬
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
              borderRadius="xl"
              objectFit="cover"
            />
            {/* 스타트업 기본 정보 */}
            <Flex
              //정렬
              flexDirection="column"
              //여백
              ml="25px"
            >
              <Flex alignItems="center">
                {/* 스타트업 이름 */}
                <Heading
                  //글자
                  size="lg"
                >
                  {state.sup_name}
                </Heading>
                {/* 좋아요 버튼 */}
                <IconButton
                  aria-label="Like"
                  backgroundColor="white"
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
                {state.sup_category}
              </Box>
              {/* 스타트업 정보 */}
              <Text
                //글자
                fontSize="md"
              >
                {state.sup_info}
              </Text>
            </Flex>
          </Flex>

          {/* 스타트업 기업 정보 섹션 */}
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
                  {sup_ceo}
                </Text>
                <Text
                  //여백
                  mb="10px"
                >
                  {sup_nationality}
                </Text>
                <Text>{sup_size}</Text>
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
                    발행주식
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    업종
                  </Text>
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
                    통일 주권
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    데이터베이스 및 온라인 정보 제공업
                  </Text>
                  <Text>{sup_homepage}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Divider
            //여백
            mt="20px"
          />

          {/* 스타트업 투자 정보 섹션 */}
          <Flex
            //여백
            m="20px"
          >
            <Box
              //여백
              mr="150px"
            >
              <Text
                //글자
                fontWeight="bold"
                fontSize="lg"
              >
                투자정보
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
                    최종투자 단계
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    누적투자 금액
                  </Text>
                  <Text>투자유치 횟수</Text>
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
                    {sup_roundOfInvestment}
                  </Text>
                  <Text
                    //여백
                    mb="10px"
                  >
                    {sup_amountOfInvestment}
                  </Text>
                  <Text>{sup_numOfInvestment}</Text>
                </Flex>
              </Flex>
            </Box>

            <Box>
              <Text
                //글자
                fontWeight="bold"
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
          </Flex>
          <Divider
            //여백
            mt="20px"
          />

          {/* 스타트업 서비스&제품 섹션 */}
          <Box
            //크기 및 여백
            m="20px"
          >
            <Text
              //글자
              fontWeight="bold"
              fontSize="lg"
            >
              서비스/제품
            </Text>
            <Flex
              //여백
              m="15px"
            >
              <Image
                //사진 위치
                src={state.sup_logo}
                //크기
                w="60px"
                h="60px"
                //배경
                borderRadius="3xl"
                objectFit="cover"
              />
              <Flex
                //정렬
                flexDirection="column"
                //여백
                m="7px"
              >
                <Text
                  //글자
                  fontSize="lg"
                >
                  페오펫
                </Text>
                <Text
                  //글자
                  fontSize="sm"
                  color="#00A29D"
                >
                  간편 모바일 반려동물등록 서비스
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default ScreenStartupInfo;

//23.07.24 1차 코드 수정 완료
