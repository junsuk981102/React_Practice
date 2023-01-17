import React from 'react';
import {useNavigate} from "react-router-dom";

const Main = (props) => {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }
    
    return (
        <>
            <h3>Landing 페이지입니다.</h3>
            <img src="src\image\stot_logo.jpg" alt="logo"/>
            <button onClick={() => handleClick("/login")}>로그인 페이지</button>
        </>
    );
};

export default Main;