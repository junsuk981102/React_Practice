import React, { useState } from "react";
import { dbService, storageService } from "../firebase-config";
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

const ScreenRoomMake = (props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // 선택한 이미지 파일 상태 변수 추가

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const imageRef = storageService
        .ref()
        .child(`community/${selectedImage.name}`);
      await imageRef.put(selectedImage);
      const imageUrl = await imageRef.getDownloadURL();
      setCommunityData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleImageUpload(); // 이미지 업로드 함수 호출
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
    <Box //크기
      h="auto"
      //배경
      bg="#E5F2F2"
      pb="100px"
      borderTop="1px solid #00A29D"
    >
      <Box maxWidth="50vw" margin="0 auto">
        <Heading
          //위치
          mt="30px"
          mb="30px"
          //크기
          as="h1"
          size="lg"
        >
          커뮤니티 만들기
        </Heading>

        <form onSubmit={handleSubmit}>
          <Box p="0 15px">
            <Heading
              //위치
              mt="20px"
              mb="20px"
              //크기
              as="h1"
              size="md"
            >
              기본 정보
            </Heading>
            <Box p="0 20px">
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

              <FormControl mt={4}>
                <FormLabel>커뮤니티 카테고리</FormLabel>
                <Box>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      variant={
                        selectedCategories.includes(category)
                          ? "solid"
                          : "outline"
                      }
                      colorScheme="teal"
                      size="sm"
                      m={1}
                    >
                      {category}
                    </Button>
                  ))}
                </Box>
              </FormControl>

              <FormControl mt={4}>
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
            <Divider mt={10} />

            <Heading
              //위치
              mt="20px"
              mb="20px"
              //크기
              as="h1"
              size="md"
            >
              투자 정보
            </Heading>
            <Box p="0 20px">
              <FormControl mt={4}>
                <FormLabel>관심있는 회사</FormLabel>
                <Input
                  type="text"
                  name="company"
                  value={communityData.company}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>투자 목표 금액</FormLabel>
                <Flex align="center">
                  <Input
                    w="200px"
                    type="text"
                    name="investmentAmount"
                    value={communityData.investmentAmount}
                    onChange={handleChange}
                    placeholder="커뮤니티의 최종 투자 목표 금액을 입력하세요."
                    required
                  />
                  <Text ml={2}>원</Text>
                </Flex>
                <Text mt="8px">
                  {convertCurrency(communityData.investmentAmount)}
                </Text>
              </FormControl>

              <FormControl mt={4}>
                {/* 티켓 정보 입력 폼 */}
                <FormLabel>티켓 정보</FormLabel>
                <Flex align="center">
                  <Text mr={2}>티켓 가격: </Text>
                  <Input
                    name="ticketPrice"
                    value={communityData.ticketPrice}
                    onChange={handleChange}
                    w="400px"
                    placeholder="티켓의 가격을 입력하세요."
                    required
                  ></Input>
                  <Text ml={2}>원</Text>
                </Flex>
                <Text mt="8px">
                  {convertCurrency(communityData.ticketPrice)}
                </Text>
                <Flex align="center">
                  <Text mr={2}>1인당 최대 구매 개수: </Text>
                  <Input
                    name="maxTicket"
                    value={communityData.maxTicket}
                    onChange={handleChange}
                    w="300px"
                    placeholder="티켓의 1인당 최대 구매 개수를 입력하세요."
                    required
                  ></Input>
                  <Text ml={2}>개</Text>
                </Flex>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                maxW="300px"
                h="75px"
                mt={4}
                colorScheme="teal"
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
