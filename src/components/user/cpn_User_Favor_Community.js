import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Image, Text } from "@chakra-ui/react";

const FavorCommunity = ({ communityObj }) => {
  const navi = useNavigate();
  //커뮤니티 정보 페이지로 정보 전송
  function handleClick() {
    navi(`/screen_room_info`, {
      state: {
        id: communityObj.id,
        com_category: communityObj.com_category,
        com_createAt: communityObj.com_createAt,
        com_info: communityObj.com_info,
        com_member: communityObj.com_member,
        com_name: communityObj.com_name,
        com_now_investment: communityObj.com_now_investment,
        com_profileImg: communityObj.com_profileImg,
        com_ticket_max: communityObj.com_ticket_max,
        com_ticket_price: communityObj.com_ticket_price,
        com_total_investment: communityObj.com_total_investment,
        com_total_ticket: communityObj.com_total_ticket,
        com_fall: communityObj.com_fall,
        com_fone: communityObj.com_fone,
        com_ftwo: communityObj.com_ftwo,
        com_fthree: communityObj.com_fthree,
        com_sall: communityObj.com_sall,
        com_syes: communityObj.com_syes,
        com_sno: communityObj.com_sno,
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
        src={communityObj.com_profileImg}
        w="100px"
        h="80px"
        p="5px"
        borderRadius="xl"
        objectFit="cover"
      />
      <Text fontSize="xs"> {communityObj.com_name}</Text>
    </Flex>
  );
};

export default FavorCommunity;

//23.08.09 1차 코드 수정
