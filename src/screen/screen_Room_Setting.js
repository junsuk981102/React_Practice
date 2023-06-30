import React from "react";
import { useNavigate } from "react-router-dom";

const ScreenRoomSetting = (props) => {
  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
  }

  return (
    <>
      <h3>ScreenRoomSetting 페이지입니다.</h3>
      <button onClick={() => handleClick("/screen_room_make")}>뒤로가기</button>
      <br />
      <br />
      <button onClick={() => handleClick("/screen_chat")}>
        screen_chat 페이지
      </button>
    </>
  );
};

export default ScreenRoomSetting;
