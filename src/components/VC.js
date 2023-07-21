import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Image, Button, Heading, Text, Flex } from "@chakra-ui/react";

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
        {/* VC 배경 사진 */}
        <Image
          //사진 위치
          src={vcObj.vc_backgroundImg}
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
        {/* VC 로고 */}
        <Image
          //사진 위치
          src={vcObj.vc_logo}
          //크기 및 여백
          w="80px"
          h="80px"
          mt="-40px"
          ml="20px"
          //배경
          borderRadius="2xl"
        />
        {/* VC 이름 */}
        <Heading
          //위치
          position="absolute"
          //여백
          mt="45px"
          ml="20px"
          //글자
          size="lg"
        >
          {vcObj.vc_name}
        </Heading>

        {/* VC 정보 */}
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
          {vcObj.vc_info}
        </Text>

        {/* VC 카테고리 */}
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
          {vcObj.vc_category}
        </Box>

        {/* VC INFO 이동버튼 */}
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

export default VC;

//23.07.21 1차 코드 수정 완료
