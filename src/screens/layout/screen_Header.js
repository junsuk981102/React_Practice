import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Flex, Button, Image, useBreakpointValue } from "@chakra-ui/react";

function Header() {
  const navi = useNavigate();
  const [user] = useAuthState(auth);
  const [activeButton, setActiveButton] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultProfileImage = "/image/user/icon_user.png";
  const photo = user?.photoURL || defaultProfileImage;
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); // 양쪽 여백

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function handleClick(text) {
    setActiveButton(text);
    navi(text);
  }

  //로그인 여부에 따른 switch button
  const renderButton = () => {
    if (auth.currentUser) {
      //로그인
      return (
        <>
          {/* 프로필 섹션 */}
          <Flex pr={boxPadding}>
            {/* 프로필 버튼 */}
            <Button
              w="40px"
              h="40px"
              p="0px"
              borderRadius="50%"
              overflow="hidden"
              onClick={() => handleClick("/screen_profile")}
            >
              {/* 프로필 버튼 배경*/}
              <Image src={photo} objectFit="cover" />
            </Button>
          </Flex>
        </>
      );
    } else {
      //로그아웃
      return (
        <>
          {/* 로그인&로그아웃 섹션 */}
          <Flex pr={boxPadding}>
            {/* 로그인 버튼 */}
            <Button
              variant="none"
              fontSize="xl"
              fontWeight="bold"
              color={activeButton === "/screen_Login" ? "#00A29D" : "black"}
              onClick={() => handleClick("/screen_Login")}
            >
              로그인
            </Button>
            {/* 로그아웃 버튼 */}
            <Button
              variant="none"
              fontSize="xl"
              fontWeight="bold"
              color={activeButton === "/screen_register" ? "#00A29D" : "black"}
              onClick={() => handleClick("/screen_register")}
            >
              회원가입
            </Button>
          </Flex>
        </>
      );
    }
  };

  return (
    <>
      {/* Header 전체 화면 */}

      {/* Header 전체 화면 배경 */}
      <Flex justifyContent="space-between" py="15px">
        {/* Header 버튼 박스 */}
        <Flex px={boxPadding} justifyContent="space-between">
          {/* 로고 버튼 */}
          <Button
            //배경
            variant="none"
          >
            {/* 로고 사진 */}
            <Image
              src="image/main/logo_stot.png"
              w="143px"
              h="48px"
              onClick={() => handleClick("")}
            />
          </Button>
          {/* 커뮤니티 버튼 */}
          <Button
            variant="none"
            fontSize="xl"
            fontWeight="bold"
            color={activeButton === "/screen_room_list" ? "#00A29D" : "black"}
            onClick={() => handleClick("/screen_room_list")}
          >
            커뮤니티
          </Button>
          {/* 스타트업 버튼 */}
          <Button
            variant="none"
            fontSize="xl"
            fontWeight="bold"
            color={activeButton === "screen_startup_list" ? "#00A29D" : "black"}
            onClick={() => handleClick("screen_startup_list")}
          >
            스타트업
          </Button>
          {/* VC 버튼 */}
          <Button
            variant="none"
            fontSize="xl"
            fontWeight="bold"
            color={activeButton === "screen_vc_list" ? "#00A29D" : "black"}
            onClick={() => handleClick("screen_vc_list")}
          >
            VC
          </Button>
        </Flex>
        {/* switch button 렌더링 */}
        {renderButton()}
      </Flex>
    </>
  );
}

export default Header;

//23.07.21 1차 코드 수정 완료
//23.08.09 2차 코드 수정 완료
