import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";

const VCCard = ({ vcObj }) => {
  const navi = useNavigate();
  //VC 정보 페이지로 정보 전송
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
      w="500px"
      h="360px"
      bg="white"
      borderRadius="xl"
      boxShadow="3px 3px 20px rgba(0, 162, 157, .5)"
      overflow="hidden"
    >
      {/* 상단 */}
      <Flex w="100%" h="50%" as="button" onClick={handleClick}>
        {/* VC 배경 사진 */}
        <Image
          src={vcObj.vc_backgroundImg}
          w="100%"
          h="100%"
          objectFit="cover"
          _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.3s ease",
          }}
        />
      </Flex>
      {/* 하단 */}
      <Flex position="absolute" w="100%" mt="180px">
        {/* VC 로고 */}
        <Image
          src={vcObj.vc_logo}
          w="80px"
          h="80px"
          m="-40px 0 0 20px"
          borderRadius="2xl"
        />
        {/* VC 이름 */}
        <Heading position="absolute" m="45px 0 0 20px" size="lg">
          {vcObj.vc_name}
        </Heading>
        {/* VC 정보 */}
        <Text
          position="absolute"
          m="85px 20px 0 20px"
          w="450px"
          noOfLines={[1, 2]}
        >
          {vcObj.vc_info}
        </Text>
        {/* VC 카테고리 */}
        <Box
          position="absolute"
          p="5px 10px"
          m="10px 0 0 390px"
          bg="#00A29D"
          borderRadius="xl"
          fontSize="xs"
          color="white"
        >
          {vcObj.vc_category}
        </Box>
        {/* VC INFO 이동버튼 */}
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

export default VCCard;

//23.07.21 1차 코드 수정 완료
//23.07.27 2차 코드 수정 완료
//23.08.08 3차 코드 수정 완료
