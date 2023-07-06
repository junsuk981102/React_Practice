import React from "react";
import User from "../components/cpn_User";
import { useNavigate } from "react-router-dom";

const ScreenProfile = (props) => {
  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
  }

  return (
    <>
      {/* <h3>ScreenProfile 페이지입니다.</h3>
      <button onClick={() => handleClick("/screen_wallet_token")}>
        screen_wallet_token 페이지
      </button>
      <button onClick={() => handleClick("/screen_room_list")}>
        screen_room_list 페이지
      </button>
      <button onClick={() => handleClick("/screen_profile")}>
        screen_profile 페이지
      </button>
      <button onClick={() => handleClick("/screen_profile_info")}>
        screen_profile_info 페이지
      </button>
      <br />
      <button onClick={() => handleClick("/screen_profile_user")}>
        screen_profile_user 페이지
      </button> */}

      <div
        style={{
          display: "flex",
          backgroundColor: "#E5F2F2",
          borderTop: "1px solid #00A29D",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              margin: "0",
              paddingTop: "50px",
              marginBottom: "30px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            마이페이지
          </h3>
          <div
            style={{
              width: "700px",
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <User />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenProfile;
