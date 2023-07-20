import React, { useState } from "react";
import { dbService } from "../firebase-config";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Heading,
  Divider,
  Text,
} from "@chakra-ui/react";

const ScreenRoomMake = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  //const [selectedImage, setSelectedImage] = useState(null); // 선택한 이미지 파일 상태 변수 추가

  //초기값 설정
  const [communityData, setCommunityData] = useState({
    name: "",
    info: "",
    categories: [],
    image: null,
    company: "",
    investmentAmount: "",
    ticketPrice: "",
    maxTicket: "",
  });

  //카테고리 리스트
  const categories = [
    "핀테크",
    "금융",
    "반려동물",
    "VR",
    "AR",
    "ESG",
    "전기차",
    "블록체인",
    "음악",
    "미술",
    "자동차",
    "신기술",
    "요식업",
    "헬스케어",
  ];

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((cat) => cat !== category)
      );
    } else {
      if (selectedCategories.length >= 3) {
        // 이미 3개의 카테고리를 선택한 경우, 추가적인 카테고리 선택을 막음
        return;
      }
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    }

    setCommunityData((prevData) => ({
      ...prevData,
      categories: selectedCategories, // 변경된 카테고리 선택 값을 communityData에 업데이트
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedImage(file);
  // };

  // const handleImageUpload = async () => {
  //   if (selectedImage) {
  //     const imageRef = storageService
  //       .ref()
  //       .child(`community/${selectedImage.name}`);
  //     await imageRef.put(selectedImage);
  //     const imageUrl = await imageRef.getDownloadURL();
  //     setCommunityData((prevData) => ({
  //       ...prevData,
  //       image: imageUrl,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //await handleImageUpload(); // 이미지 업로드 함수 호출
    await dbService.collection("community_list").add({
      com_name: communityData.name,
      com_category: communityData.categories,
      com_info: communityData.info,
      com_profileImg: communityData.image,
      com_total_investment: communityData.investmentAmount,
      com_now_investment: 0,
      com_ticket_price: communityData.ticketPrice,
      com_ticket_max: communityData.maxTicket,
      com_createAt: Date.now(),
      com_member: 1,
    });
    setCommunityData({
      name: "",
      info: "",
      categories: [],
      image: null,
      company: "",
      investmentAmount: "",
      ticketPrice: "",
      maxTicket: "",
    });
  };

  //포맷 변경
  const convertCurrency = (value) => {
    if (value >= 100000000) {
      const billion = Math.floor(value / 100000000);
      const million = Math.floor((value % 100000000) / 10000);
      return `${billion}억 ${million}만원`;
    } else if (value >= 10000) {
      const million = Math.floor(value / 10000);
      return `${million}만원`;
    } else {
      return `${value}원`;
    }
  };

  return (
    //커뮤니티 만들기 전체 화면

    //커뮤니티 만들기 전체 배경 화면
    <Box
      //크기 및 여백
      h="auto"
      pb="100px"
      //배경
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      <Box
        //크기 및 여백
        maxW="50vw"
        m="0 auto"
      >
        <Heading
          //크기
          mt="30px"
          mb="30px"
          //글자
          as="h1"
          size="lg"
        >
          커뮤니티 만들기
        </Heading>

        {/* 커뮤니티 만들기 Form */}
        <form onSubmit={handleSubmit}>
          <Box
            //여백
            p="0 15px"
          >
            {/* 기본 정보 섹션 */}
            <Heading
              //여백
              mt="20px"
              mb="20px"
              //글자
              as="h1"
              size="md"
            >
              기본 정보
            </Heading>
            <Box
              //여백
              p="0 20px"
            >
              <FormControl>
                <FormLabel>커뮤니티 이름</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={communityData.name}
                  onChange={handleChange}
                  placeholder="커뮤니티의 이름을 입력하세요."
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>커뮤니티 설명</FormLabel>
                <Input
                  type="text"
                  name="info"
                  value={communityData.info}
                  onChange={handleChange}
                  placeholder="커뮤니티에 대한 간단한 설명을 입력하세요."
                  required
                />
              </FormControl>

              <FormControl
                //여백
                mt={4}
              >
                <FormLabel>커뮤니티 카테고리</FormLabel>
                <Box>
                  {categories.map((category) => (
                    //카테고리 선택 버튼
                    <Button
                      //여백
                      m={1}
                      //배경
                      colorScheme="teal"
                      variant={
                        selectedCategories.includes(category)
                          ? "solid"
                          : "outline"
                      }
                      //글자
                      size="sm"
                      //기능
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </Box>
              </FormControl>

              <FormControl
                //여백
                mt={4}
              >
                <FormLabel>커뮤니티 대표 이미지</FormLabel>
                <Flex>
                  {/* <Input
                    id="image-input"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  /> */}
                  <Input
                    type="text"
                    name="image"
                    value={communityData.image}
                    onChange={handleChange}
                    placeholder="이미지의 URL을 넣으세요."
                    required
                  />
                </Flex>
              </FormControl>
            </Box>
            <Divider
              //여백
              mt={10}
            />

            {/* 투자 정보 섹션 */}
            <Heading
              //여백
              mt="20px"
              mb="20px"
              //글자
              as="h1"
              size="md"
            >
              투자 정보
            </Heading>
            <Box
              //여백
              p="0 20px"
            >
              <FormControl
                //여백
                mt={4}
              >
                <FormLabel>관심있는 회사</FormLabel>
                <Input
                  type="text"
                  name="company"
                  value={communityData.company}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl
                //여백
                mt={4}
              >
                <FormLabel>투자 목표 금액</FormLabel>
                <Flex
                  //정렬
                  align="center"
                >
                  <Input
                    w="200px"
                    type="text"
                    name="investmentAmount"
                    value={communityData.investmentAmount}
                    onChange={handleChange}
                    placeholder="커뮤니티의 최종 투자 목표 금액을 입력하세요."
                    required
                  />
                  <Text
                    //여백
                    ml={2}
                  >
                    원
                  </Text>
                </Flex>
                <Text
                  //여백
                  mt="8px"
                >
                  {convertCurrency(communityData.investmentAmount)}
                </Text>
              </FormControl>

              <FormControl
                //여백
                mt={4}
              >
                {/* 티켓 정보 입력 폼 */}
                <FormLabel>티켓 정보</FormLabel>
                <Flex
                  //정렬
                  align="center"
                >
                  <Text
                    //여백
                    mr={2}
                  >
                    티켓 가격:
                  </Text>
                  <Input
                    name="ticketPrice"
                    value={communityData.ticketPrice}
                    onChange={handleChange}
                    w="400px"
                    placeholder="티켓의 가격을 입력하세요."
                    required
                  ></Input>
                  <Text
                    //여백
                    ml={2}
                  >
                    원
                  </Text>
                </Flex>
                <Text
                  //여백
                  mt="8px"
                >
                  {convertCurrency(communityData.ticketPrice)}
                </Text>
                <Flex
                  //정렬
                  align="center"
                >
                  <Text
                    //여백
                    mr={2}
                  >
                    1인당 최대 구매 개수:{" "}
                  </Text>
                  <Input
                    name="maxTicket"
                    value={communityData.maxTicket}
                    onChange={handleChange}
                    w="300px"
                    placeholder="티켓의 1인당 최대 구매 개수를 입력하세요."
                    required
                  ></Input>
                  <Text
                    //여백
                    ml={2}
                  >
                    개
                  </Text>
                </Flex>
              </FormControl>
            </Box>
            <Box
              //정렬
              display="flex"
              justifyContent="center"
            >
              <Button
                //크기 및 여백
                maxW="300px"
                h="75px"
                mt={4}
                //배경
                colorScheme="teal"
                //기능
                type="submit"
              >
                커뮤니티 생성
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ScreenRoomMake;
