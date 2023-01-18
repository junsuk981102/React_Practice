import React from 'react';
import {useNavigate} from "react-router-dom";

const ScreenRoomFind = (props) => {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <br>
            <h3>ScreenRoomFind 페이지입니다.</h3>
            <button onClick={() => handleClick("/screen_room_list")}>뒤로가기</button>
            <br/><br/>
            <button onClick={() => handleClick("/screen_room_info")}>screen_room_info 페이지</button>
        </br>
    );
}

export default ScreenRoomFind;