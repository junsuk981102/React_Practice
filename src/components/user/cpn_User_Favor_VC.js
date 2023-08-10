import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Image, Text } from "@chakra-ui/react";

const FavorVC = ({ vcObj }) => {
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
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100px"
      h="110px"
      border="1px solid black"
      borderRadius="xl"
      as="button"
      onClick={handleClick}
    >
      <Image
        src={vcObj.vc_logo}
        w="100px"
        h="80px"
        p="5px"
        borderRadius="xl"
        objectFit="cover"
      />
      <Text fontSize="xs">{vcObj.vc_name}</Text>
    </Flex>
  );
};

export default FavorVC;

//23.08.09 1차 코드 수정
