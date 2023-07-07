import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Image, Button, Heading, Text } from "@chakra-ui/react";

const Startup = ({ startupObj }) => {
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
    <Box>
      {/* 상단 */}
      <Box
        //위치
        position="absolute"
        mt="0px"
        //크기
        w="100%"
        h="50%"
      >
        {/* 스타트업 배경 사진 */}
        <Image
          //크기
          w="100%"
          h="100%"
          //배경
          src={startupObj.sup_backgroundImg}
          alt="startup background img"
        />
      </Box>
      {/* 하단 */}
      <Box
        //위치
        position="absolute"
        mt="180px"
        //크기
        w="100%"
        h="50%"
      >
        {/* 스타트업 로고 */}
        <Image
          //위치
          position="absolute"
          mt="-40px"
          ml="20px"
          //크기
          w="80px"
          h="80px"
          //배경
          borderRadius="20%"
          src={startupObj.sup_logo}
          alt="VC logo"
        />
        {/* 스타트업 이름 */}
        <Heading
          //위치
          position="absolute"
          mt="40px"
          ml="20px"
          //글자
          as="h1"
          size="lg"
        >
          {startupObj.sup_name}
        </Heading>
        {/* 스타트업 정보 */}
        <Text
          //위치
          position="absolute"
          mt="80px"
          ml="20px"
          mr="20px"
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
          mt="5px"
          ml="390px"
          //배경
          borderRadius="xl"
          bg="primary"
          padding="5px 10px"
          //글자
          as="b"
          fontSize="xs"
          color="white"
        >
          {startupObj.sup_category}
        </Box>
        {/* 스타트업 INFO 이동버튼 */}
        <Button
          //위치
          position="absolute"
          mt="30px"
          ml="370px"
          //배경
          bg="none"
          variant="none"
          //글자
          as="b"
          fontSize="md"
          onClick={() => handleClick()}
        >
          자세히 보기 {">"}
        </Button>
      </Box>
    </Box>
  );
};

export default Startup;
