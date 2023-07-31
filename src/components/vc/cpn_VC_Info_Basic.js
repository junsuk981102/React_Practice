import React, { useState, useEffect } from "react";
import { auth, dbService } from "../../firebase-config";
import { arrayUnion } from "firebase/firestore";
import { Flex, Heading, Text, Image, IconButton } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa6";

const VCInfoBasic = ({ state }) => {
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
      const vcUid = state.id;
      const userDocRef = dbService.collection("user_list").doc(userUid);
      const userDoc = await userDocRef.get();
      const userVCs = userDoc.data()?.vcUids || [];

      if (userVCs.includes(vcUid)) {
        // 이미 즐겨찾기에 추가된 상태이면 삭제
        userDocRef.update({
          vcUids: userVCs.filter((uid) => uid !== vcUid),
        });
        setActiveButton(false);
      } else {
        // 즐겨찾기에 추가
        userDocRef.update({
          vcUids: arrayUnion(vcUid),
        });
        setActiveButton(true);
      }
    }
  }

  return (
    <>
      {/* VC 기본정보 */}
      <Flex alignItems="center" h="auto">
        {/* VC 로고 */}
        <Image
          src={state.vc_logo}
          w="200px"
          h="200px"
          borderRadius="xl"
          objectFit="cover"
        />
        <Flex flexDirection="column" ml="25px">
          <Flex alignItems="center">
            {/* 스타트업 이름 */}
            <Heading size="lg">{state.vc_name}</Heading>
            {/* 즐겨찾기 버튼 */}
            <IconButton
              aria-label="Like"
              backgroundColor="white"
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
            {state.vc_category}
          </Flex>
          {/* 스타트업 설명 */}
          <Text>{state.vc_info}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default VCInfoBasic;

//23.07.27 1차 코드 수정
