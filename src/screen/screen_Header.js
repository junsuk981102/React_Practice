import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Image, Button } from "@chakra-ui/react";

function Header(props) {
  const navi = useNavigate();

  // REFACT: 상태값이 많으면 사용이 복잡해질 수 있으나, 이 경우에는 정해진 상태 값들이므로 문제되지 않습니다.
  const [activeButton, setActiveButton] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useAuthState(auth);

  const defaultProfileImage = "/image/user.png";
  const photo = user?.photoURL || defaultProfileImage;

  // REFACT: window resize event를 통해 windowWidth 상태를 변경하는 대신 CSS media query를 사용하면 더 효율적일 수 있습니다.
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // REFACT: window 크기에 따른 상태 변경을 처리하는 useEffect는 하나로 합쳐서 관리하면 더 간결하게 코드를 작성할 수 있습니다.
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

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
            p="0px"
            bg="transparent"
            overflow="hidden"
            borderRadius="50%"
            onClick={() => handleClick("/screen_profile")}
            style={{
              marginRight: `${windowWidth > "50%" ? "100px" : "200px"}`, // REFACT: Magic numbers like "1700" or "500px" 등을 상수로 선언해서 사용하면 좀 더 가독성이 좋고, 이해하기 쉽습니다.
            }}
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
          <Button
            mr="20px"
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
            style={{
              marginRight: `${windowWidth > "50%" ? "100px" : "200px"}`,
            }}
          >
            회원가입
          </Button>
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
        p="15px"
      >
        <Box display="flex" alignItems="center">
          <Box
            style={{
              marginRight: "35px",
              marginLeft: `${windowWidth > "50%" ? "10px" : "200px"}`,
            }}
          >
            <Image
              w="143px"
              h="48px"
              src="image/stot_minilogo.png"
              alt="logo"
            />
          </Box>
          <Button
            mr="32px"
            fontSize="xl"
            fontWeight="bold"
            variant="none"
            color={activeButton === "" ? "#00A29D" : "black"}
            onClick={() => handleClick("")}
          >
            홈
          </Button>
          {/* <Button
            mr="32px"
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
            mr="32px"
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
