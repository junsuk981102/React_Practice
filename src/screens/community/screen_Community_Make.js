import React, { useState } from "react";
import { dbService, storageService } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Heading,
  Text,
  Box,
  Image,
  Grid,
} from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";

const ScreenRoomMake = () => {
  const navi = useNavigate();
  //커뮤니티의 사진 Url을 저장하는 변수
  const [attachment, setAttachment] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
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

  //사진을 추가했을 때 동작하는 이벤트 핸들러
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const commFile = files[0];

    // 파일이 선택되지 않았을 경우에 처리.
    if (!commFile) {
      setAttachment("");
      return;
    }

    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result || "");
    };
    reader.readAsDataURL(commFile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Post 전 사진을 삭제할떄 동작
  const clearAttachment = () => {
    setAttachment("");
  };

  function handleClick(text) {
    navi(`${text}`);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";

    //첨부 파일이 있는 경우에만 처리
    if (attachment !== "") {
      const attachmentRef = ref(
        storageService,
        `community/${communityData.name}`
      );
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }

    await dbService.collection("community_list").add({
      com_name: communityData.name,
      com_category: communityData.categories,
      com_info: communityData.info,
      com_profileImg: attachmentUrl,
      com_total_investment: communityData.investmentAmount,
      com_now_investment: 0,
      com_ticket_price: communityData.ticketPrice,
      com_ticket_max: communityData.maxTicket,
      com_total_ticket:
        communityData.investmentAmount / communityData.ticketPrice,
      com_createAt: Date.now(),
      com_member: 0,
      com_fall: 0,
      com_fone: 0,
      com_fthree: 0,
      com_ftwo: 0,
      com_sall: 0,
      com_sno: 0,
      com_syes: 0,
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
    handleClick("/screen_Login");
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
      justifyContent="center"
      h="auto"
      pb="200px"
      borderTop="1px solid #00A29D"
      bg="#E5F2F2"
    >
      <Flex flexDirection="column" w="60%">
        <Heading m="30px 0" size="lg">
          커뮤니티 만들기
        </Heading>
        {/* 커뮤니티 만들기 Form */}
        <form onSubmit={handleSubmit}>
          <FormControl
            p="15px"
            border="3px solid #00A29D"
            borderRadius="2xl"
            bg="white"
          >
            {/* 기본 정보 섹션 */}
            <Heading mb="30px" size="md">
              기본 정보
            </Heading>
            <Flex flexDirection="column" px="20px">
              <FormControl mb="15px">
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

              <FormControl mb="15px">
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

              <FormControl mb="15px">
                <FormLabel>커뮤니티 카테고리</FormLabel>
                <Grid
                  templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                  gap={2}
                >
                  {categories.map((category) => (
                    <Button
                      key={category}
                      colorScheme="teal"
                      variant={
                        selectedCategories.includes(category)
                          ? "solid"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </Grid>
              </FormControl>

              <FormControl mb="15px">
                <FormLabel>커뮤니티 대표 이미지</FormLabel>
                <Flex>
                  <Input
                    type="file"
                    accept="image/*"
                    display="none"
                    name="image"
                    // value={communityData.image}
                    onChange={onFileChange}
                    placeholder="이미지의 URL을 넣으세요."
                    id="fileInput"
                    required
                  />
                  <label htmlFor="fileInput">
                    <Button
                      as="span"
                      variant="outline"
                      size="md"
                      colorScheme="teal"
                      leftIcon={<FiImage />}
                    >
                      이미지 추가
                    </Button>
                  </label>
                  {/* 첨부 파일이 있는 경우 미리보기 및 삭제 버튼 표시 */}
                  {attachment && (
                    <Box ml="10px">
                      <Text
                        color="teal"
                        fontWeight="bold"
                        cursor="pointer"
                        onClick={clearAttachment}
                      >
                        첨부파일 삭제
                      </Text>
                      <Image
                        src={attachment}
                        alt="attachment"
                        w="100px"
                        mt="5px"
                      />
                    </Box>
                  )}
                </Flex>
              </FormControl>
            </Flex>

            {/* 투자 정보 섹션 */}
            <Heading marginY="10px" size="md">
              투자 정보
            </Heading>
            <Flex flexDirection="column" px="20px">
              <FormControl mb="15px">
                <FormLabel>관심있는 회사</FormLabel>
                <Input
                  maxW="700px"
                  type="text"
                  name="company"
                  value={communityData.company}
                  onChange={handleChange}
                  placeholder="관심있는 회사의 이름을 입력하세요."
                  required
                />
              </FormControl>

              <FormControl mb="15px">
                <FormLabel>투자 목표 금액</FormLabel>
                <Input
                  maxW="700px"
                  type="text"
                  name="investmentAmount"
                  value={communityData.investmentAmount}
                  onChange={handleChange}
                  placeholder="커뮤니티의 최종 투자 목표 금액을 입력하세요."
                  required
                />
                <Text mt="8px">
                  {convertCurrency(communityData.investmentAmount)}
                </Text>
              </FormControl>

              <FormControl mb="15px">
                <FormLabel>티켓 가격</FormLabel>
                <Input
                  maxW="700px"
                  name="ticketPrice"
                  value={communityData.ticketPrice}
                  onChange={handleChange}
                  placeholder="티켓의 가격을 입력하세요."
                  required
                />
                <Text mt="8px">
                  {convertCurrency(communityData.ticketPrice)}
                </Text>
              </FormControl>

              <FormControl mb="15px">
                <FormLabel>1인당 최대 구매 개수</FormLabel>
                <Input
                  maxW="700px"
                  name="maxTicket"
                  value={communityData.maxTicket}
                  onChange={handleChange}
                  placeholder="티켓의 1인당 최대 구매 개수를 입력하세요."
                  required
                />
              </FormControl>
            </Flex>

            <Flex justifyContent="center" mt="20px">
              <Button maxW="250px" h="50px" colorScheme="teal" type="submit">
                커뮤니티 생성
              </Button>
            </Flex>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};

export default ScreenRoomMake;

//23.07.24 1차 코드 수정 완료
//23.08.09 1차 코드 수정 완료
