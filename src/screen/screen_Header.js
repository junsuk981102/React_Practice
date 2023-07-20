import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Image, Button, useBreakpointValue } from "@chakra-ui/react";

function Header() {
  const navi = useNavigate();
  const [user] = useAuthState(auth);
  const [activeButton, setActiveButton] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const defaultProfileImage = "/image/user.png";
  const photo = user?.photoURL || defaultProfileImage;

  //양쪽 여백
  const boxPaddingLeft = useBreakpointValue({ base: "5px", xl: "185px" }); //수정해야함!
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingBetween = useBreakpointValue({ base: "10x", xl: "35px" });

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
        //프로필 버튼
        <Box
          //정렬
          display="flex"
          alignItems="center"
          //여백
          mr={boxPaddingRight}
        >
          {/* 프로필 페이지 이동 버튼 */}
          <Button
            //크기 및 여백
            w="40px"
            h="40px"
            padding="0px"
            //배경
            bg="transparent"
            borderRadius="50%"
            overflow="hidden"
            //기능
            onClick={() => handleClick("/screen_profile")}
          >
            {/* 버튼 배경 사진 */}
            <Image
              //사진 위치
              src={photo}
              //크기 및 여백
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Button>
        </Box>
      );
    } else {
      //로그아웃
      return (
        <>
          {/* 로그인&로그아웃 섹션 */}
          <Box
            //정렬
            display="flex"
            flexDirection="row"
          >
            {/* 로그인 버튼 */}
            <Button
              //여백
              mr="5px"
              //배경
              variant="none"
              //글자
              fontSize="xl"
              fontWeight="bold"
              //기능
              onClick={() => handleClick("/screen_Login")}
            >
              로그인
            </Button>
            {/* 로그아웃 버튼 */}
            <Button
              //여백
              mr={boxPaddingRight}
              //배경
              variant="none"
              //글자
              fontSize="xl"
              fontWeight="bold"
              color="#00A29D"
              //기능
              onClick={() => handleClick("/screen_register")}
            >
              회원가입
            </Button>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      {/* Header 전체 화면 */}

      {/* Header 전체 화면 배경 */}
      <Box
        //정렬
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        //여백
        py="15px"
      >
        {/* Header 버튼 박스 */}
        <Box
          //정렬
          display="flex"
          alignItems="center"
        >
          {/* 로고 버튼 */}
          <Button
            //여백
            ml={boxPaddingLeft}
            mr={boxPaddingBetween}
            //배경
            variant="none"
          >
            {/* 로고 사진 */}
            <Image
              //사진 위치
              src="image/stot_minilogo.png"
              //크기
              w="143px"
              h="48px"
              //기능
              onClick={() => handleClick("")}
            />
          </Button>
          {/* 커뮤니티 버튼 */}
          <Button
            //여백
            mr={boxPaddingBetween}
            // 배경
            variant="none"
            //글자
            fontSize="xl"
            fontWeight="bold"
            color={activeButton === "/screen_room_list" ? "#00A29D" : "black"}
            //기능
            onClick={() => handleClick("/screen_room_list")}
          >
            커뮤니티
          </Button>
          {/* 스타트업 버튼 */}
          <Button
            //여백
            mr={boxPaddingBetween}
            // 배경
            variant="none"
            //글자
            fontSize="xl"
            fontWeight="bold"
            color={activeButton === "screen_startup_list" ? "#00A29D" : "black"}
            //기능
            onClick={() => handleClick("screen_startup_list")}
          >
            스타트업
          </Button>
          {/* VC 버튼 */}
          <Button
            //배경
            variant="none"
            //글자
            fontSize="xl"
            fontWeight="bold"
            color={activeButton === "screen_vc_list" ? "#00A29D" : "black"}
            //기능
            onClick={() => handleClick("screen_vc_list")}
          >
            VC
          </Button>
        </Box>
        {/* switch button 렌더링 */}
        <Box>{renderButton()}</Box>
      </Box>
    </>
  );
}

export default Header;

/* <Button
            mr={boxPaddingBetween}
            fontSize="xl"
            fontWeight="bold"
            variant="none"
            color={
              activeButton === "/screen_my_governance" ? "#00A29D" : "black"
            }
            onClick={() => handleClick("/screen_my_governance")}
          >
            지갑
          </Button> */
