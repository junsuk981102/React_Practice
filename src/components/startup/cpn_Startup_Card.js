import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Image, Button, Heading, Text, Flex } from "@chakra-ui/react";

const Startup_Card = ({ startupObj }) => {
  const navi = useNavigate();

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
      //정렬
      position="relative"
      //크기 및 여백
      w="500px"
      h="360px"
      //배경
      borderRadius="xl"
      boxShadow="0 0 10px #00A29D"
      overflow="hidden"
    >
      {/* 상단 */}
      <Flex
        //크기 및 여백
        w="100%"
        h="50%"
        //기능
        as="button"
        onClick={handleClick}
      >
        {/* 스타트업 배경 사진 */}
        <Image
          //사진 위치
          src={startupObj.sup_backgroundImg}
          //크기
          w="100%"
          h="100%"
          //효과
          _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.3s ease",
          }}
        />
      </Flex>
      {/* 하단 */}
      <Flex
        //위치
        position="absolute"
        //크기 및 여백
        w="100%"
        h="50%"
        mt="180px"
      >
        {/* 스타트업 로고 */}
        <Image
          //사진 위치
          src={startupObj.sup_logo}
          //크기 및 여백
          w="80px"
          h="80px"
          mt="-40px"
          ml="20px"
          //배경
          borderRadius="2xl"
        />
        {/* 스타트업 이름 */}
        <Heading
          //위치
          position="absolute"
          //여백
          mt="45px"
          ml="20px"
          //글자
          size="lg"
        >
          {startupObj.sup_name}
        </Heading>

        {/* 스타트업 정보 */}
        <Text
          //위치
          position="absolute"
          //여백
          mt="85px"
          marginX="20px"
          //글자
          fontSize="md"
          noOfLines={[1, 2]}
        >
          {startupObj.sup_info}
        </Text>

        {/* 스타트업 카테고리 */}
        <Box
          //위치
          position="absolute"
          //여백
          w="auto"
          p="5px 10px"
          mt="10px"
          ml="390px"
          //배경
          bg="#00A29D"
          borderRadius="xl"
          //글자
          fontSize="xs"
          color="white"
        >
          {startupObj.sup_category}
        </Box>

        {/* 스타트업 INFO 이동버튼 */}
        <Button
          //위치
          position="absolute"
          //여백
          mt="50px"
          ml="390px"
          //배경
          variant="link"
          //글자
          color="black"
          onClick={() => handleClick()}
        >
          자세히 보기 {">"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Startup_Card;

//23.07.21 1차 코드 수정 완료
