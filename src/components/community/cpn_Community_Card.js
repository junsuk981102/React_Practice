import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Text, Button, Image } from "@chakra-ui/react";

const CommunityCard = ({ communityObj }) => {
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
      w="300px"
      h="400px"
      bg="white"
      borderRadius="xl"
      boxShadow="0 0 10px #00A29D"
      overflow="hidden"
    >
      {/* 상단 */}
      <Flex w="100%" h="50%" as="button" onClick={handleClick}>
        {/* 커뮤니티 프로필 사진 */}
        <Image
          src={communityObj.com_profileImg}
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
      <Flex position="absolute" w="100%" mt="200px">
        {/* 커뮤니티 이름 */}
        <Heading position="absolute" m="5px 0 0 10px" size="lg">
          {communityObj.com_name}
        </Heading>
        {/* 커뮤니티 카테고리 */}
        <Text
          position="absolute"
          m="40px 0 0 12px"
          fontSize="xs"
          color="#00A29D"
        >
          {Array.isArray(communityObj.com_category)
            ? communityObj.com_category.join("&")
            : communityObj.com_category}
        </Text>
        {/* 커뮤니티 참가인원 */}
        <Text
          position="absolute"
          m="160px 0 0 15px"
          fontSize="md"
          fontWeight="bold"
          color="#00A29D"
        >
          현재 : {communityObj.com_member}명
        </Text>

        {/* 자세히 보기 버튼 */}
        <Button
          position="absolute"
          p="5px 10px"
          m="150px 0 0 190px"
          bg="#00A29D"
          borderRadius="xl"
          fontSize="sm"
          color="white"
          onClick={() => handleClick()}
        >
          자세히 보기 {">"}
        </Button>
      </Flex>
    </Flex>
  );
};
export default CommunityCard;

//23.07.21 1차 코드 수정 완료
//23.07.27 2차 코드 수정 완료
