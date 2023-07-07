import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Image, Button, Heading, Text } from "@chakra-ui/react";

const VC = ({ vcObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_vc_info`, {
      state: {
        id: vcObj.id,
        vc_name: vcObj.vc_name,
        vc_category: vcObj.vc_category,
        vc_info: vcObj.vc_info,
        vc_backgroundImg: vcObj.vc_backgroundImg,
        vc_logo: vcObj.vc_logo,
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
        {/* VC 배경 사진 */}
        <Image
          //크기
          w="100%"
          h="100%"
          //배경
          src={vcObj.vc_backgroundImg}
          alt="vc background img"
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
        {/* VC 로고 */}
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
          src={vcObj.vc_logo}
          alt="VC logo"
        />
        {/* VC 이름 */}
        <Heading
          //위치
          position="absolute"
          mt="40px"
          ml="20px"
          //글자
          as="h1"
          size="lg"
        >
          {vcObj.vc_name}
        </Heading>
        {/* VC 정보 */}
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
          {vcObj.vc_info}
        </Text>
        {/* VC 카테고리 */}
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
          {vcObj.vc_category}
        </Box>
        {/* VC INFO 이동버튼 */}
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

export default VC;
