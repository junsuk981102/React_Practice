import React, { useState, useEffect } from "react";
import { auth, dbService } from "../../firebase-config";
import { arrayUnion } from "firebase/firestore";
import { Flex, Heading, Text, Image, IconButton } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa6";

const ComInfoBasic = ({ state }) => {
  const [userUid, setUserUid] = useState("");
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    const getUserUid = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserUid(user.uid);
        }
      } catch (error) {
        console.log("사용자 UID 가져오기 실패:", error);
      }
    };

    getUserUid();
  }, []);

  function handleClick() {
    setActiveButton((prevState) => (prevState === "yellow" ? "" : "yellow"));
    if (userUid) {
      const communityUid = state.id;
      const userDocRef = dbService.collection("user_list").doc(userUid);
      userDocRef.update({
        communityUids: arrayUnion(communityUid),
      });
    }
  }

  //커뮤니티 카테고리 2개 이상일 때 구분
  const comCategory = Array.isArray(state.com_category)
    ? state.com_category
    : state.com_category.split(",");

  return (
    <Flex alignItems="center">
      {/* 커뮤니티 프로필 사진 */}
      <Image
        src={state.com_profileImg}
        w="200px"
        h="200px"
        borderRadius="50%"
        objectFit="cover"
      />
      {/* 커뮤니티 기본 정보 */}
      <Flex flexDirection="column" p="25px">
        <Flex alignItems="center">
          {/* 커뮤니티 이름 */}
          <Heading size="lg">{state.com_name}</Heading>
          {/* 즐겨찾기 버튼 */}
          <IconButton
            aria-label="Like"
            backgroundColor="white"
            color={activeButton === "yellow" ? "yellow" : "black"}
            onClick={handleClick}
            icon={
              activeButton === "yellow" ? (
                <FaStar style={{ fontSize: "25px" }} />
              ) : (
                <FaRegStar style={{ fontSize: "25px" }} />
              )
            }
          />
        </Flex>
        {/* 커뮤니티 카테고리 */}
        <Flex flexDirection="row">
          {comCategory.map((category, index) => (
            <Flex
              key={index}
              justifyContent="center"
              p="5px 10px"
              m="10px 5px 10px 0"
              bg="#00A29D"
              borderRadius="xl"
              fontSize="sm"
              color="white"
            >
              {category}
            </Flex>
          ))}
        </Flex>
        {/* 커뮤니티 설명 */}
        <Text fontSize="md">{state.com_info}</Text>
      </Flex>
    </Flex>
  );
};

export default ComInfoBasic;

//23.07.27 1차 코드 수정
