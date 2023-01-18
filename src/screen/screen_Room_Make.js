import React from 'react';
import {useNavigate} from "react-router-dom";

const ScreenRoomMake = (props) => {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <h3>ScreenRoomMake 페이지입니다.</h3>
            <button onClick={() => handleClick("/screen_room_setting")}>screen_room_setting 페이지</button>
        </>
    );
}

export default ScreenRoomMake;
