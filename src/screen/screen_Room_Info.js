import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";

const ScreenRoomInfo = (props) => {
    const { state } = useLocation();
    console.log(state.name);

    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <h3>ScreenRoomInfo 페이지입니다.</h3>
            <h3>ScreenRoomInfo 페이지입니다.</h3>
            <h4>투자방 이름: {state.name}</h4>
            <h4>투자방 회원 수: {state.member}명</h4>
            <button onClick={() => handleClick("/screen_room_find")}>뒤로가기</button>
            <br/><br/>
            <button onClick={() => handleClick("/screen_chat")}>screen_chat 페이지</button>
        </>
    );
}

export default ScreenRoomInfo;