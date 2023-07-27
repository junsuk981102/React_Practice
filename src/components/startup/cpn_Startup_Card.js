import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";

const StartupCard = ({ startupObj }) => {
  const navi = useNavigate();
  //스타트업 정보 페이지로 정보 전송
  function handleClick() {
    navi(`/screen_startup_info`, {
      state: {
        id: startupObj.id,
        sup_name: startupObj.sup_name,
        sup_category: startupObj.sup_category,
        sup_info: startupObj.sup_info,
        sup_backgroundImg: startupObj.sup_backgroundImg,
        sup_logo: startupObj.sup_logo,
      },
    });
  }

  return (
    <Flex
      position="relative"
      w="500px"
      h="360px"
      bg="white"
      borderRadius="xl"
      boxShadow="0 0 10px #00A29D"
      overflow="hidden"
    >
      {/* 상단 */}
      <Flex w="100%" h="50%" as="button" onClick={handleClick}>
        {/* 스타트업 배경 사진 */}
        <Image
          src={startupObj.sup_backgroundImg}
          w="100%"
          h="100%"
          _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.3s ease",
          }}
        />
      </Flex>
      {/* 하단 */}
      <Flex position="absolute" w="100%" mt="180px">
        {/* 스타트업 로고 */}
        <Image
          src={startupObj.sup_logo}
          w="80px"
          h="80px"
          m="-40px 0 0 20px"
          borderRadius="2xl"
        />
        {/* 스타트업 이름 */}
        <Heading position="absolute" m="45px 0 0 20px" size="lg">
          {startupObj.sup_name}
        </Heading>
        {/* 스타트업 정보 */}
        <Text position="absolute" m="85px 20px 0 20px" noOfLines={[1, 2]}>
          {startupObj.sup_info}
        </Text>
        {/* 스타트업 카테고리 */}
        <Box
          position="absolute"
          p="5px 10px"
          m="10px 0 0 390px"
          bg="#00A29D"
          borderRadius="xl"
          fontSize="xs"
          color="white"
        >
          {startupObj.sup_category}
        </Box>
        {/* 스타트업 INFO 이동버튼 */}
        <Button
          position="absolute"
          m="50px 0 0 390px"
          variant="link"
          color="black"
          onClick={() => handleClick()}
        >
          자세히 보기 {">"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default StartupCard;

//23.07.21 1차 코드 수정 완료
//23.07.27 2차 코드 수정 완료
