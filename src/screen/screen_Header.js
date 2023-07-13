import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Image, Button, useBreakpointValue } from "@chakra-ui/react";

function Header(props) {
  const navi = useNavigate();
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20x", xl: "200px" });
  const boxPaddingBetween = useBreakpointValue({ base: "10x", xl: "35px" });
  // REFACT: 상태값이 많으면 사용이 복잡해질 수 있으나, 이 경우에는 정해진 상태 값들이므로 문제되지 않습니다.
  const [activeButton, setActiveButton] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useAuthState(auth);

  const defaultProfileImage = "/image/user.png";
  const photo = user?.photoURL || defaultProfileImage;

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

  // REFACT: renderButton 함수를 두개의 다른 하위 컴포넌트로 분리해서 가독성을 높일 수 있습니다.
  const renderButton = () => {
    if (auth.currentUser) {
      return (
        <Box display="flex" alignItems="center">
          <Button
            w="40px"
            h="40px"
            pr={boxPaddingRight}
            bg="transparent"
            overflow="hidden"
            borderRadius="50%"
            onClick={() => handleClick("/screen_profile")}
            padding="0px"
          >
            <Image
              w="100%"
              h="100%"
              objectFit="cover"
              src={photo}
              alt="User Profile"
            />
          </Button>
        </Box>
      );
    } else {
      return (
        <>
          <Box display="flex" flexDirection="row">
            <Button
              mr="5px"
              fontSize="xl"
              fontWeight="bold"
              variant="none"
              onClick={() => handleClick("/screen_Login")}
            >
              로그인
            </Button>
            <Button
              fontSize="xl"
              fontWeight="bold"
              color="#00A29D"
              variant="none"
              onClick={() => handleClick("/screen_register")}
              mr={boxPaddingRight}
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py="15px"
      >
        <Box display="flex" alignItems="center">
          <Box pl={boxPaddingLeft} pr={boxPaddingBetween}>
            <Image
              w="143px"
              h="48px"
              src="image/stot_minilogo.png"
              alt="logo"
            />
          </Box>
          <Button
            pr={boxPaddingBetween}
            fontSize="xl"
            fontWeight="bold"
            variant="none"
            color={activeButton === "" ? "#00A29D" : "black"}
            onClick={() => handleClick("")}
          >
            홈
          </Button>
          {/* <Button
            pr=  {boxPaddingBetween}

            fontSize="xl"
            fontWeight="bold"
            variant="none"
            color={
              activeButton === "/screen_my_governance" ? "#00A29D" : "black"
            }
            onClick={() => handleClick("/screen_my_governance")}
          >
            지갑
          </Button> */}
          <Button
            fontSize="xl"
            fontWeight="bold"
            variant="none"
            onClick={() => handleClick("/screen_room_list")}
            color={activeButton === "/screen_room_list" ? "#00A29D" : "black"}
          >
            커뮤니티
          </Button>
        </Box>
        <Box>{renderButton()}</Box> {/* 로그인-로그아웃 변경 버튼 렌더링 */}
      </Box>
    </>
  );
}

export default Header;
