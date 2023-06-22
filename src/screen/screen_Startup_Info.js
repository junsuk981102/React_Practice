import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";

const ScreenStartupInfo = (props) => {
    const { state } = useLocation();
    console.log(state.name);

    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <h3>ScreenStartupInfo 페이지입니다.</h3>
            <h4>커뮤니티 이름: {state.sup_name}</h4>
            <h4>커뮤니티 범주: {state.sup_category}</h4>
            <h4>커뮤니티 정보: {state.sup_info}</h4>
        </>
    );
}

export default ScreenStartupInfo;