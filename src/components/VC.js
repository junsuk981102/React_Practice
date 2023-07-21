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
        //크기 및 여백
        w="100%"
        h="50%"
        mt="0px"
        //기능
        as="button"
        onClick={handleClick}
      >
        {/* VC 배경 사진 */}
        <Image
          //사진 위치
          src={vcObj.vc_backgroundImg}
          //크기
          w="100%"
          h="100%"
          //배경
          objectFit="cover"
          //효과
          _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.3s ease",
          }}
        />
      </Box>
      {/* 하단 */}
      <Box
        //위치
        position="absolute"
        //크기 및 여백
        w="100%"
        h="50%"
        mt="180px"
      >
        {/* VC 로고 */}
        <Image
          //사진 위치
          src={vcObj.vc_logo}
          //위치
          position="absolute"
          //크기 및 여백
          w="80px"
          h="80px"
          mt="-40px"
          ml="20px"
          //배경
          borderRadius="20%"
        />
        {/* VC 이름 */}
        <Heading
          //위치
          position="absolute"
          //여백
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
          //여백
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
          //여백
          p="5px 10px"
          mt="5px"
          ml="390px"
          //배경
          bg="#00A29D"
          borderRadius="xl"
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
          //여백
          mt="45px"
          ml="390px"
          //배경
          bg="none"
          variant="link"
          //글자
          as="b"
          fontSize="md"
          color="black"
          onClick={() => handleClick()}
        >
          자세히 보기 {">"}
        </Button>
      </Box>
    </Box>
  );
};

export default VC;
