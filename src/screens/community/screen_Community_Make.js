import React, { useState } from "react";
import { dbService } from "../../firebase-config";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Heading,
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
    <Flex
      //정렬
      justifyContent="center"
      //크기 및 여백
      h="auto"
      pb="200px"
      //배경
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      <Box
        //크기
        w="60%"
      >
        <Heading
          //크기
          marginY="30px"
          //글자
          size="lg"
        >
          커뮤니티 만들기
        </Heading>

        {/* 커뮤니티 만들기 Form */}
        <FormControl
          //정렬
          flexDirection="column"
          //여백
          p="15px"
          //배경
          border="3px solid #00A29D"
          borderRadius="2xl"
          //기능
          as="form"
          onSubmit={handleSubmit}
        >
          {/* 기본 정보 섹션 */}
          <Heading
            //여백
            mb="10px"
            //글자
            size="md"
          >
            기본 정보
          </Heading>
          <Box
            //여백
            px="20px"
          >
            <FormControl
              //여백
              mb="15px"
            >
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

            <FormControl
              //여백
              mb="15px"
            >
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
              mb="15px"
            >
              <FormLabel>커뮤니티 카테고리</FormLabel>
              <Box>
                {categories.map((category) => (
                  //카테고리 선택 버튼
                  <Button
                    //여백
                    m="2px 3px"
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
              mb="15px"
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

          {/* 투자 정보 섹션 */}
          <Heading
            //여백
            marginY="10px"
            //글자
            size="md"
          >
            투자 정보
          </Heading>
          <Box
            //여백
            px="20px"
          >
            <FormControl
              //여백
              mb="15px"
            >
              <FormLabel>관심있는 회사</FormLabel>
              <Input
                type="text"
                name="company"
                value={communityData.company}
                onChange={handleChange}
                placeholder="관심있는 회사의 이름을 입력하세요."
                required
              />
            </FormControl>

            <FormControl mb="15px" textAlign="end">
              <Flex alignItems="center" justifyContent="space-between">
                <Text>투자 목표 금액:</Text>
                <Input
                  maxW="700px"
                  type="text"
                  name="investmentAmount"
                  value={communityData.investmentAmount}
                  onChange={handleChange}
                  placeholder="커뮤니티의 최종 투자 목표 금액을 입력하세요."
                  required
                />
              </Flex>
              <Text
                //여백
                mt="8px"
              >
                {convertCurrency(communityData.investmentAmount)}
              </Text>
            </FormControl>

            <FormControl mb="15px" textAlign="end">
              <Flex alignItems="center" justifyContent="space-between">
                <Text>티켓 가격:</Text>
                <Input
                  maxW="700px"
                  name="ticketPrice"
                  value={communityData.ticketPrice}
                  onChange={handleChange}
                  placeholder="티켓의 가격을 입력하세요."
                  required
                ></Input>
              </Flex>
              <Text
                //여백
                mt="8px"
              >
                {convertCurrency(communityData.ticketPrice)}
              </Text>
            </FormControl>

            <FormControl mb="15px" textAlign="end">
              <Flex alignItems="center" justifyContent="space-between">
                <Text>1인당 최대 구매 개수: </Text>
                <Input
                  maxW="700px"
                  name="maxTicket"
                  value={communityData.maxTicket}
                  onChange={handleChange}
                  placeholder="티켓의 1인당 최대 구매 개수를 입력하세요."
                  required
                ></Input>
              </Flex>
            </FormControl>
          </Box>
          <Flex justifyContent="center">
            <Button
              //크기 및 여백
              maxW="250px"
              h="50px"
              //배경
              colorScheme="teal"
              //기능
              type="submit"
            >
              커뮤니티 생성
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default ScreenRoomMake;

//23.07.24 1차 코드 수정 완료