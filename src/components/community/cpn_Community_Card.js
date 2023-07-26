import React from "react";
import { useNavigate } from "react-router-dom";
import { Image, Button, Heading, Text, Flex } from "@chakra-ui/react";

const CommunityCard = ({ communityObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_room_info`, {
      state: {
        id: communityObj.id,
        com_name: communityObj.com_name,
        com_createAt: communityObj.com_createAt,
        com_category: communityObj.com_category,
        com_info: communityObj.com_info,
        com_total_investment: communityObj.com_total_investment,
        com_now_investment: communityObj.com_now_investment,
        com_ticket_price: communityObj.com_ticket_price,
        com_ticket_max: communityObj.com_ticket_max,
        com_member: communityObj.com_member,
        com_profileImg: communityObj.com_profileImg,
        com_owner: communityObj.com_owner,
        com_favorite1: communityObj.com_favorite1,
        com_favorite2: communityObj.com_favorite2,
        com_favorite3: communityObj.com_favorite3,
      },
    });
  }

  return (
    <Flex
      //정렬
      position="relative"
      //크기 및 여백
      w="300px"
      h="400px"
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
        <Image
          //사진 위치
          src={communityObj.com_profileImg}
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
        mt="200px"
      >
        {/* 커뮤니티 이름 */}
        <Heading
          //위치
          position="absolute"
          //여백
          mt="5px"
          ml="10px"
          //글자
          size="lg"
        >
          {communityObj.com_name}
        </Heading>

        {/* 커뮤니티 카테고리 */}
        <Text
          //위치
          position="absolute"
          //여백
          mt="40px"
          ml="12px"
          //글자
          fontSize="xs"
          color="#00A29D"
        >
          {Array.isArray(communityObj.com_category)
            ? communityObj.com_category.join("&")
            : communityObj.com_category}
        </Text>

        {/* 커뮤니티 참가인원 */}
        <Text
          //위치
          position="absolute"
          //여백
          mt="160px"
          ml="15px"
          //글자
          as="b"
          fontSize="md"
          color="#00A29D"
        >
          현재 : {communityObj.com_member}명
        </Text>

        {/* 자세히 보기 버튼 */}
        <Button
          //위치
          position="absolute"
          //여백
          p="5px 10px"
          mt="150px"
          ml="190px"
          //배경
          bg="#00A29D"
          borderRadius="xl"
          //글자
          fontSize="sm"
          color="white"
          //기능
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
