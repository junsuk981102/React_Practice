import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Image, Text } from "@chakra-ui/react";

const FavorStartup = ({ startupObj }) => {
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
        src={startupObj.sup_logo}
        w="100px"
        h="80px"
        p="5px"
        borderRadius="xl"
        objectFit="cover"
      />
      <Text fontSize="xs">{startupObj.sup_name}</Text>
    </Flex>
  );
};

export default FavorStartup;

//23.08.09 1차 코드 수정
