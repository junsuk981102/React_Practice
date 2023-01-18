import React from 'react';
import {useNavigate} from "react-router-dom";


const ScreenProfileInfo = (props) => {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }
    return (
        <>
            <h3>ScreenProfileInfo 페이지입니다.</h3>
            <button onClick={() => handleClick("/screen_profile")}>뒤로가기</button>
            <br/><br/>
        </>
    );
}

export default ScreenProfileInfo;