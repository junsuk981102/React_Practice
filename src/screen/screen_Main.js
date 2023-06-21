import React from 'react';
import {useNavigate} from "react-router-dom";

const ScreenMain = (props) => {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }
    
    return (
        <>
            <img src="image/stot_main.png" alt="logo"/>
            <h3>새로운 스타트업 찾기</h3>
            <h3>투자중인 스타트업</h3>
        </>
    );
};

export default ScreenMain;