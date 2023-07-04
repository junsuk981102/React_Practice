import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//로그인 상태를 감지하기 위한 firebase auth
import { auth } from "../firebase-config";

function Header(props) {
  const navi = useNavigate();
  const [activeButton, setActiveButton] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 추가된 상태

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // 추가된 useEffect
  useEffect(() => {
    // 로그인 상태 변경 감지
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // 로그인 상태에 따라 true 또는 false 설정
    });

    return () => {
      unsubscribe(); // cleanup 함수에서 구독 해제
    };
  }, []);

  function handleClick(text) {
    setActiveButton(text);
    navi(text);
  }

  // 수정된 renderButton 함수
  const renderButton = () => {
    if (isLoggedIn) {
      return (
        <button
          onClick={() => {
            // 로그아웃 처리
            auth.signOut().then(() => {
              // 로그아웃 후 처리
              console.log("로그아웃 성공");
            });
          }}
          style={{
            marginRight: "20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          로그아웃
        </button>
      );
    } else {
      return (
        <>
          <button
            onClick={() => handleClick("/screen_Login")}
            style={{
              marginRight: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            로그인
          </button>
          <button
            onClick={() => handleClick("/screen_register")}
            style={{
              marginRight: `${windowWidth > 1700 ? "500px" : "10px"}`,
              fontSize: "20px",
              fontWeight: "bold",
              color: "#00A29D",
            }}
          >
            회원가입
          </button>
        </>
      );
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              marginRight: `${windowWidth > 1700 ? "32px" : "40px"}`,
              marginLeft: `${windowWidth > 1700 ? "485px" : "35px"}`,
            }}
          >
            <img
              src="image/stot_minilogo.png"
              alt="logo"
              width="143px"
              height="48.1px"
            />
          </div>
          <button
            onClick={() => handleClick("")}
            style={{
              marginRight: "32px",
              fontSize: "20px",
              fontWeight: "bold",
              color: activeButton === "" ? "#00A29D" : "black",
            }}
          >
            홈
          </button>
          <button
            onClick={() => handleClick("/screen_my_governance")}
            style={{
              marginRight: "32px",
              fontSize: "20px",
              fontWeight: "bold",
              color:
                activeButton === "/screen_wallet_connect" ? "#00A29D" : "black",
            }}
          >
            지갑
          </button>
          <button
            onClick={() => handleClick("/screen_room_list")}
            style={{
              marginRight: "32px",
              fontSize: "20px",
              fontWeight: "bold",
              color: activeButton === "/screen_room_list" ? "#00A29D" : "black",
            }}
          >
            커뮤니티
          </button>
        </div>
        <div>{renderButton()}</div> {/* 수정된 버튼 렌더링 */}
      </div>
    </>
  );
}

export default Header;
