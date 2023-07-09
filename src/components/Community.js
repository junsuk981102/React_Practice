import React from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Box, Image, Text, Button } from "@chakra-ui/react";

const Community = ({ communityObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_room_info`, {
      state: {
        id: communityObj.id,
        com_name: communityObj.com_name,
        com_category: communityObj.com_category,
        com_info: communityObj.com_info,
        com_total_investment: communityObj.com_total_investment,
        com_now_investment: communityObj.com_now_investment,
        com_ticket_price: communityObj.com_ticket_price,
        com_ticket_max: communityObj.com_ticket_max,
        com_member: communityObj.com_member,
        com_profileImg: communityObj.com_profileImg,
      },
    });
  }

  function handleClick_chat() {
    navi(`/screen_chat`, {
      state: {
        id: communityObj.id,
        com_name: communityObj.com_name,
        com_category: communityObj.com_category,
        com_info: communityObj.com_info,
        com_total_investment: communityObj.com_total_investment,
        com_now_investment: communityObj.com_now_investment,
        com_ticket_price: communityObj.com_ticket_price,
        com_ticket_max: communityObj.com_ticket_max,
        com_member: communityObj.com_member,
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
        <Image
          //크기
          w="100%"
          h="100%"
          //배경
          src={communityObj.com_profileImg}
          alt="community background img"
        />
      </Box>

      {/* 하단 */}
      <Box
        //위치
        position="absolute"
        mt="200px"
        //크기
        w="100%"
        h="50%"
      >
        {/* 커뮤니티 이름 */}
        <Heading
          //위치
          position="absolute"
          mt="10px"
          ml="5px"
          //글자
          as="h1"
          size="lg"
        >
          {communityObj.com_name}
        </Heading>

        {/* 커뮤니티 카테고리 */}
        <Text
          //위치
          position="absolute"
          mt="45px"
          ml="7px"
          //글자
          as="b"
          fontSize="xs"
          color="#00A29D"
        >
          {communityObj.com_category}
        </Text>

        {/* 커뮤니티 참가인원 */}
        <Text
          //위치
          position="absolute"
          mt="155px"
          ml="15px"
          //글자
          as="b"
          fontSize="md"
          color="#00A29D"
        >
          현재 : {communityObj.com_member}명
        </Text>

        <Button
          //위치
          position="absolute"
          mt="5px"
          ml="210px"
          //배경
          bg="none"
          variant="none"
          //글자
          fontSize="xs"
          //기능
          onClick={() => handleClick()}
        >
          자세히 보기 {">"}
        </Button>

        <Button
          //위치
          position="absolute"
          mt="150px"
          ml="205px"
          //배경
          bg="#00A29D"
          variant="none"
          //크기
          px="6px"
          borderRadius="lg"
          //글자
          as="b"
          fontSize="sm"
          color="white"
          //기능
          onClick={() => handleClick_chat()}
        >
          채팅방 입장 {">"}
        </Button>
      </Box>
    </Box>
  );
};
export default Community;
