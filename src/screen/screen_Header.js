import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navi = useNavigate();
  const [activeButton, setActiveButton] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  function handleClick(text) {
    setActiveButton(text);
    navi(text);
  }

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
              marginRight: `${windowWidth > 1700 ? "32px" : "10px"}`,
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
            onClick={() => handleClick("/screen_wallet_connect")}
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
        <div>
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
        </div>
      </div>
    </>
  );
}

export default Header;
