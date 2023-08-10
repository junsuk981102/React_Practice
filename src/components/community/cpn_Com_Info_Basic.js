import React, { useState, useEffect } from "react";
import { auth, dbService } from "../../firebase-config";
import { arrayUnion } from "firebase/firestore";
import { Flex, Heading, Text, Image, IconButton } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa6";

const ComInfoBasic = ({ state }) => {
  const [userUid, setUserUid] = useState("");
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    const storedActiveButton = localStorage.getItem(`activeButton_${state.id}`);
    if (storedActiveButton) {
      setActiveButton(JSON.parse(storedActiveButton)); // 로컬 스토리지에서 가져올 때 문자열을 JSON으로 변환
    }
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
  }, [state.id]);

  useEffect(() => {
    // activeButton 값이 변경될 때 로컬 스토리지에 저장
    localStorage.setItem(
      `activeButton_${state.id}`,
      JSON.stringify(activeButton)
    ); // 로컬 스토리지에 저장하기 전에 JSON으로 변환
  }, [activeButton, state.id]);

  async function handleClick() {
    if (userUid) {
      const communityUid = state.id;
      const userDocRef = dbService.collection("user_list").doc(userUid);
      const userDoc = await userDocRef.get();
      const userCommunities = userDoc.data()?.communityUids || [];

      if (userCommunities.includes(communityUid)) {
        // 이미 즐겨찾기에 추가된 상태이면 삭제
        userDocRef.update({
          communityUids: userCommunities.filter((uid) => uid !== communityUid),
        });
        setActiveButton(false);
      } else {
        // 즐겨찾기에 추가
        userDocRef.update({
          communityUids: arrayUnion(communityUid),
        });
        setActiveButton(true);
      }
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
            bg="none"
            color={activeButton ? "yellow" : "black"}
            onClick={handleClick}
            icon={
              activeButton ? (
                <FaStar style={{ fontSize: "25px" }} />
              ) : (
                <FaRegStar style={{ fontSize: "25px" }} />
              )
            }
          />
        </Flex>
        {/* 커뮤니티 카테고리 */}
        <Flex>
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
        <Text>{state.com_info}</Text>
      </Flex>
    </Flex>
  );
};

export default ComInfoBasic;

//23.07.27 1차 코드 수정
//23.08.07 2차 코드 수정
