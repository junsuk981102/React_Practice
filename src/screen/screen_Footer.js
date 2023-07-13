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

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={"#f5f5f5"}
        p="15px"
        minHeight="20vh"
        padding="0px 80px 0px 30px"
      >
        <Box
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          flexDirection={"column"}
        >
          <Box
            display="flex"
            alignItems="center"
            style={{
              marginLeft: `${windowWidth > "50%" ? "0px" : "100px"}`,
            }}
          >
            <Image
              w="143px"
              h="48px"
              src="image/stot_minilogo.png"
              alt="logo"
            />
            <Button mr="32px" fontSize="m" fontWeight="regular" variant="none">
              이용약관
            </Button>
          </Box>
          <Box
            alignItems="center"
            style={{
              marginTop: "20px",
              marginLeft: `${windowWidth > "50%" ? "0px" : "100px"}`,
            }}
          >
            <p fontSize="s" fontWeight="Thin">
              STOT - Security to token
            </p>
            <p fontSize="s" fontWeight="light">
              서울 강남구 도산대로15길 12 (브루클린 버거 지하)
            </p>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        ></Box>
        <Button mr="32px" fontSize="m" fontWeight="regular" variant="none">
          Twitter
        </Button>

        <Button mr="32px" fontSize="m" fontWeight="regular" variant="none">
          Instagram
        </Button>

        <Button mr="32px" fontSize="m" fontWeight="regular" variant="none">
          Email
        </Button>

        <Button mr="32px" fontSize="m" fontWeight="regular" variant="none">
          Tel.
        </Button>
      </Box>
    </>
  );
}

export default Header;
