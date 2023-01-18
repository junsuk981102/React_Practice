import React from 'react';
import {useNavigate} from "react-router-dom";

const ScreenRoomInfo = (props) => {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <h3>ScreenRoomInfo 페이지입니다.</h3>
            <button onClick={() => handleClick("/screen_room_find")}>뒤로가기</button>
            <br/><br/>
            <button onClick={() => handleClick("/screen_chat")}>screen_chat 페이지</button>
        </>
    );
}

export default ScreenRoomInfo;