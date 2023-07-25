import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

const ScreenRoomInfo = () => {
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); // 양쪽 여백

  const navi = useNavigate();
  const { state } = useLocation();

  const [ownerCount, setOwnerCount] = useState(state.com_owner); //티켓 소유 갯수
  const [sellCount, setSellCount] = useState(0); //티켓 구매 갯수

  let comCategory = [];
  if (typeof state.com_category === "string") {
    comCategory = state.com_category.split(",");
  } else if (Array.isArray(state.com_category)) {
    comCategory = state.com_category;
  } else {
    console.error("Invalid category format");
  }

  //티켓 구매 갯수 증가
  const handleClick_plus = () => {
    if (ownerCount + sellCount < state.com_ticket_max) {
      setSellCount(sellCount + 1);
    }
  };
  //티켓 구매 갯수 감소
  const handleClick_minus = () => {
    if (sellCount > 0) {
      setSellCount(sellCount - 1);
    }
  };
  //티켓 구매
  const handleClick_sell = () => {
    setOwnerCount(ownerCount + sellCount);
    setSellCount(0);
  };

  //경고 메시지 Modal 관련 코드
  const { isOpen, onOpen, onClose } = useDisclosure();

  //숫자 쉼표 표시 코드
  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  const handleClick_chat = () => {
    if (ownerCount === 0) {
      //티켓 X => Modal 팝업
      onOpen();
    } else {
      //티켓 O => 채팅방 이동
      navi(`/screen_chat`, {
        state: {
          id: state.id,
          com_name: state.com_name,
          com_createAt: state.com_createAt,
          com_category: comCategory,
          com_info: state.com_info,
          com_total_investment: state.com_total_investment,
          com_now_investment: state.com_now_investment,
          com_ticket_price: state.com_ticket_price,
          com_ticket_max: state.com_ticket_max,
          com_member: state.com_member,
          com_profileImg: state.com_profileImg,
          com_owner: state.com_owner,
          com_favorite1: state.com_favorite1,
          com_favorite2: state.com_favorite2,
          com_favorite3: state.com_favorite3,
        },
      });
    }
  };

  return (
    <>
      {/* 채팅방 정보 전체 화면 */}

      {/* 채팅방 정보 전체 배경 화면 */}
      <Box
        //크기 및 여백
        h="auto"
        pb="200px"
        px={boxPadding}
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 제목 섹션 */}
        <Heading
          //여백
          marginY="30px"
          //글자
          size="lg"
        >
          커뮤니티 소개
        </Heading>

        {/* 정보 섹션 */}
        <Box
          //크기 및 여백
          w="900px"
          h="auto"
          p="30px"
          //배경
          bg="white"
          border="3px solid #00A29D"
          borderRadius="xl"
        >
          {/* 커뮤니티 기본 정보 섹션 */}
          <Flex
            //정렬
            position="relative"
            alignItems="center"
          >
            {/* 커뮤니티 프로필 사진 */}
            <Image
              //사진 위치
              src={state.com_profileImg}
              //크기
              w="200px"
              h="200px"
              //배경
              borderRadius="50%"
              objectFit="cover"
            />
            {/* 커뮤니티 기본 정보 */}
            <Box
              //여백
              ml="25px"
            >
              {/* 커뮤니티 이름 */}
              <Heading
                //글자
                size="lg"
              >
                {state.com_name}
              </Heading>
              {/* 커뮤니티 카테고리 */}
              <Flex
                //정렬
                flexDirection="row"
              >
                {comCategory.map((category, index) => (
                  <Box
                    key={index}
                    //정렬
                    textAlign="center"
                    //크기 및 여백
                    w="100px"
                    h="auto"
                    p="5px"
                    marginY="10px"
                    mr="5px"
                    //배경
                    bg="#00A29D"
                    borderRadius="xl"
                  >
                    <Text
                      //글자
                      fontWeight="bold"
                      fontSize="md"
                      color="white"
                    >
                      {category}
                    </Text>
                  </Box>
                ))}
              </Flex>
              {/* 커뮤니티 설명 */}
              <Box>
                <Text
                  //글자
                  fontWeight="bold"
                  fontSize="md"
                >
                  {state.com_info}
                </Text>
              </Box>
            </Box>
          </Flex>

          {/* 커뮤니티 투자 금액 섹션 */}
          <Box
            //크기 및 여백
            mt="30px"
            ml="20px"
          >
            {/* 커뮤니티 투자 목표 금액 제목 */}
            <Text
              //여백
              mr="20px"
              //글자
              fontWeight="bold"
              fontSize="lg"
            >
              투자 목표 금액
            </Text>
            <Text
              //글자
              fontWeight="bold"
              fontSize="lg"
              color="#00A29D"
            >
              {(state.com_now_investment / state.com_total_investment) * 100}%
              달성
            </Text>
            {/* 커뮤니티 투자 목표 금액 그래프 */}
            <Box position="relative" mt="20px">
              {/* 목표 금액 그래프 */}
              <Box
                //위치 및 정렬
                position="absolute"
                top="0"
                left="0"
                //크기
                w="90%"
                h="45px"
                //배경
                bg="white"
                border="1px solid #00A29D"
                borderRadius="3xl"
              />
              {/* 현재 금액 그래프 */}
              <Box
                //위치 및 정렬
                position="absolute"
                top="0"
                left="0"
                //크기
                w={
                  (state.com_now_investment / state.com_total_investment) * 90 +
                  "%"
                }
                h="45px"
                //배경
                bg={"linear-gradient(to right, #00A29D, #FFFFFF)"}
                border="1px solid #00A29D"
                borderRadius="3xl"
              />
            </Box>
            {/* 커뮤니티 투자 목표 금액 텍스트 */}
            <Box
              //위치 및 정렬
              position="relative"
              //글자
              color="#00A29D"
            >
              {/* 목표 금액 텍스트 */}
              <Box
                //위치 및 정렬
                position="absolute"
                top="55"
                left="85%"
              >
                <Text
                  //글자
                  as="b"
                >
                  <NumberFormat number={state.com_total_investment} />원
                </Text>
              </Box>
              {/* 현재 금액 텍스트 */}
              <Box
                //위치 및 정렬
                position="absolute"
                top="55"
                left={
                  (state.com_now_investment / state.com_total_investment) * 80 +
                  "%"
                }
              >
                <Text
                  //글자
                  fontWeight="bold"
                >
                  <NumberFormat number={state.com_now_investment} />원
                </Text>
              </Box>
            </Box>
          </Box>

          {/* 커뮤니티 티켓 구매 & 관심회사 섹션 */}
          <Flex
            //정렬
            justifyItems="center"
            //여백
            mt="120px"
            ml="20px"
          >
            {/* 티켓 구매 섹션 */}
            <Box
              //여백
              mr="50px"
            >
              <Text
                //글자
                fontWeight="bold"
                fontSize="lg"
              >
                티켓 구매하기
              </Text>

              <Flex
                //여백
                mt="20px"
              >
                {/* 왼쪽 섹션 */}
                <Box>
                  {/* 티켓 이미지 */}
                  <Image
                    //사진 위치
                    src={
                      ownerCount > 0
                        ? "../image/ticketcolor.png"
                        : "../image/ticketgrey.png"
                    }
                    //크기 및 여백
                    w="150px"
                    h="150px"
                    mb="15px"
                  />
                  {/* 현재 보유 티켓 갯수 */}
                  <Box
                    //정렬
                    textAlign="center"
                    //크기 및 여백
                    w="150px"
                    h="25px"
                    p="5px"
                    //배경
                    bg="#E5F2F2"
                    border="1px solid black"
                    borderRadius="3xl"
                    //글자
                    fontSize="xs"
                    color="#00A29D"
                  >
                    <Text>현재 보유한 티켓 수: {ownerCount}매</Text>
                  </Box>
                </Box>

                {/* 오른쪽 섹션 */}
                <Box
                  //정렬
                  textAlign="center"
                  //여백
                  ml="30px"
                  //글자
                  fontWeight="bold"
                >
                  {/* 티켓 판매 가격 */}
                  <Text
                    //여백
                    mb="15px"
                    //글자
                    fontSize="xl"
                  >
                    <NumberFormat number={state.com_ticket_price} />원
                  </Text>
                  {/* 티켓 구매 버튼 */}
                  <Flex
                    //정렬
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    //크기
                    w="120px"
                    h="40px"
                    //배경
                    border="1px solid #00A29D"
                    borderRadius="xl"
                  >
                    {/* 마이너스 버튼 */}
                    <Button
                      //크기
                      w="40px"
                      h="40px"
                      //배경
                      borderRadius="50%"
                      variant="none"
                      //글자
                      fontSize="25px"
                      fontWeight="bold"
                      color={sellCount > 0 ? "#00A29D" : "grey"}
                      //기능
                      onClick={handleClick_minus}
                    >
                      -
                    </Button>
                    {/* 구매 갯수 */}
                    <Text
                      //크기
                      w="30px"
                    >
                      {sellCount}
                    </Text>
                    {/* 플러스 버튼 */}
                    <Button
                      //크기
                      w="40px"
                      h="40px"
                      //배경
                      borderRadius="50%"
                      variant="none"
                      //글자
                      fontSize="25px"
                      fontWeight="bold"
                      color={
                        ownerCount + sellCount < state.com_ticket_max
                          ? "#00A29D"
                          : "grey"
                      }
                      //기능
                      onClick={handleClick_plus}
                    >
                      +
                    </Button>
                  </Flex>
                  {/* 티켓 구매 버튼 */}
                  <Button
                    //크기 및 여백
                    w="120px"
                    h="35px"
                    p="10px"
                    mt="15px"
                    //배경
                    bg={sellCount > 0 ? "#00A29D" : "grey"}
                    borderRadius="3xl"
                    variant="none"
                    //글자
                    fontSize="sm"
                    color="white"
                    //기능
                    onClick={handleClick_sell}
                  >
                    {ownerCount > 0 ? "추가 구매하기" : "구매하기"}
                  </Button>
                  {/* 구매 갯수 안내 */}
                  <Text
                    //여백
                    mt="5px"
                    //글자
                    fontSize="2xs"
                    color="grey"
                  >
                    * 최대 {state.com_ticket_max}매까지 구매 가능
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* 관심회사 섹션 */}
            <Box>
              <Text
                //여백
                mb="15px"
                //글자
                fontSize="lg"
                fontWeight="bold"
              >
                관심있는 회사
              </Text>
              {/* 관심회사 이미지 */}
              <Flex>
                <Image w="154px" h="185px" src="../image/startup1.png" />
                <Image w="154px" h="185px" src="../image/startup2.png" />
                <Image w="154px" h="185px" src="../image/startup3.png" />
              </Flex>
            </Box>
          </Flex>

          {/* 커뮤니티 현황 섹션 */}
          <Flex
            //정렬
            textAlign="center"
            justifyContent="center"
            //여백
            mt="100px"
          >
            {/* 현재 참여 중인 인원수 */}
            <Flex
              //정렬
              alignItems="center"
              justifyContent="center"
              //크기
              w="120px"
              h="30px"
              //배경
              bg="#E5F2F2"
              border="1px solid black"
              borderRadius="xl"
              //글자
              fontSize="md"
              fontWeight="bold"
            >
              <Text>{state.com_member}명 참여중</Text>
            </Flex>
          </Flex>

          {/* 커뮤니티 참여 섹션 */}
          <Flex
            //정렬
            justifyContent="center"
            //여백
            p="20px"
          >
            {/* 커뮤니티 참여 버튼 */}
            <Button
              //크기
              w="600px"
              h="60px"
              //배경
              bg={ownerCount > 0 ? "#00A29D" : "grey"}
              borderRadius="xl"
              variant="none"
              //글자
              fontSize="lg"
              fontWeight="bold"
              color="white"
              //기능
              onClick={handleClick_chat}
            >
              커뮤니티 참여하기
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* 에러메시지 Modal */}
      <Modal
        //기능
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            //여백
            mt="20px"
            //글자
            fontSize="xl"
            fontWeight="bold"
          >
            커뮤니티에 입장하기 위해 티켓을 구매해주세요.
          </ModalBody>
          <ModalFooter>
            <Button
              //여백
              mr={3}
              //배경
              bg="#00A29D"
              //기능
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScreenRoomInfo;

//23.07.25 1차 코드 수정 완료
