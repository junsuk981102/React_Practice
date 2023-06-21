import React from 'react';
//import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Header(props) {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <h1>헤더입니다.</h1>
            <div>
                <button onClick={() => handleClick("")}>홈</button>
                {" "}
                <button onClick={() => handleClick("/screen_wallet_connect")}>지갑</button>
                {" "}
                <button onClick={() => handleClick("/screen_room_list")}>커뮤니티 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_login")}>로그인</button>
                {" "}
                <button onClick={() => handleClick("/screen_register")}>회원가입</button>
                {" "}
                <button onClick={() => handleClick("/screen_test")}>screen_test 페이지</button>
            </div>
            <hr/>
        </>
    );
}

export default Header;