import React from 'react';
import {useNavigate} from "react-router-dom";

const ScreenMain = (props) => {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }
    
    return (
        <>
            <h3>ScreenMain 페이지입니다.</h3>
            <img src="image/stot_logo.jpg" alt="logo"/>
            <br/>
            <button onClick={() => handleClick("/login")}>로그인 페이지</button>
        </>
    );
};

export default ScreenMain;