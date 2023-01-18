import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const ScreenRoomList = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    
    const togglePopup = (event) => {
        setShowPopup(event.target.value)
    };
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
      <h3>ScreenRoomList 페이지입니다.</h3>
      <button onClick={() => handleClick("/screen_wallet_token")}>screen_wallet_token 페이지</button>
      <button onClick={() => handleClick("/screen_room_list")}>screen_room_list 페이지</button>
      <button onClick={() => handleClick("/screen_profile")}>screen_profile 페이지</button>
      <br/><br/><br/>
      <h1>새로운 방 추가하기</h1>
      <button className="open" onClick ={togglePopup} value = 'false'>새로운 방 추가</button>
      {showPopup ? (
        <div className="popup">
          <div className="popup_inner">
            <button onClick={() => handleClick("/screen_room_make")}>screen_room_make 페이지</button>
            <button onClick={() => handleClick("/screen_room_find")}>screen_room_find 페이지</button>
            <br/>
            <button className="close"  onClick={togglePopup}>
              Close me
            </button>
          </div>
        </div>
      ) : null}
        </>
    );
}

export default ScreenRoomList;
