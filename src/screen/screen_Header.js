import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import User from "../components/cpn_User"; // User 컴포넌트 import

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => handleClick("/screen_profile")}
            style={{
              marginRight: `${windowWidth > 1700 ? "500px" : "10px"}`, // REFACT: Magic numbers like "1700" or "500px" 등을 상수로 선언해서 사용하면 좀 더 가독성이 좋고, 이해하기 쉽습니다.
              borderRadius: "50%",
              overflow: "hidden",
              padding: "0",
              width: "40px",
              height: "40px",
              border: "none",
              backgroundColor: "transparent",
            }}
          >
            <img
              src={photo}
              alt="User Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </button>
        </div>
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
                activeButton === "/screen_my_governance" ? "#00A29D" : "black",
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
        <div>{renderButton()}</div> {/* 로그인-로그아웃 변경 버튼 렌더링 */}
      </div>
    </>
  );
}

export default Header;
