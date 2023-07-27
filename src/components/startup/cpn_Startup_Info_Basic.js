import React, { useState, useEffect } from "react";
import { auth, dbService } from "../../firebase-config";
import { arrayUnion } from "firebase/firestore";
import { Flex, Heading, Text, Image, IconButton } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa6";

const StartupInfoBasic = ({ state }) => {
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
      const startupUid = state.id;
      const userDocRef = dbService.collection("user_list").doc(userUid);
      userDocRef.update({
        startupUids: arrayUnion(startupUid),
      });
    }
  }

  return (
    <>
      {/* 스타트업 기본정보 */}
      <Flex alignItems="center" h="auto">
        {/* 스타트업 로고 */}
        <Image
          src={state.sup_logo}
          w="200px"
          h="200px"
          borderRadius="xl"
          objectFit="cover"
        />
        <Flex flexDirection="column" ml="25px">
          <Flex alignItems="center">
            {/* 스타트업 이름 */}
            <Heading size="lg">{state.sup_name}</Heading>
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
          {/* 스타트업 카테고리 */}
          <Flex
            justifyContent="center"
            w="100px"
            p="5px"
            m="10px 0"
            bg="#00A29D"
            borderRadius="xl"
            fontSize="sm"
            color="white"
          >
            {state.sup_category}
          </Flex>
          {/* 스타트업 설명 */}
          <Text>{state.sup_info}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default StartupInfoBasic;

//23.07.27 1차 코드 수정
