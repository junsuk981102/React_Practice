import React from 'react';
import {useNavigate} from "react-router-dom";

const ScreenProfileUser = (props) => {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }
    return (
        <>
            <h3>ScreenProfileUser 페이지입니다.</h3>
            <button onClick={() => handleClick("/screen_profile")}>뒤로가기</button>
            <br/><br/>
        </>
    );
}

export default ScreenProfileUser;