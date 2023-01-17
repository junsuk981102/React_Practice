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
            {/*
            <hr/>
            <div>
                <h1>Link 방식</h1>
                <Link to={"/"}>메인 페이지</Link>
                {" "}
                <Link to={"/login"}>로그인 페이지</Link>
                {" "}
                <Link to={"/register"}>회원가입 페이지</Link>
                {" "}
                <Link to={"/metamask_token"}>Metamask_Token 페이지</Link>
                {" "}
                <Link to={"/room_list"}>Room_List 페이지</Link>
                {" "}
                <Link to={"/make_room"}>Make_Room 페이지</Link>
                {" "}
                <Link to={"/find_room"}>Find_Room 페이지</Link>
                {" "}
                <Link to={"/room_info"}>Room_Info 페이지</Link>
                {" "}
                <Link to={"/chat"}>Chat 페이지</Link>
                {" "}
                <Link to={"/profile"}>Profile 페이지</Link>
                {" "}
                <Link to={"/example"}>예시 페이지</Link>
            </div>
            <hr/>
            <br/>
            */}
            <div>
                {/*<h1>useNavigate 방식</h1>*/}
                <button onClick={() => handleClick("")}>메인 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_login")}>screen_login 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_register")}>screen_register 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_wallet_token")}>screen_wallet_token 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_room_list")}>screen_room_list 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_make_room")}>screen_make_room 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_find_room")}>screen_find_room 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_room_info")}>screen_room_info 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_chat")}>screen_chat 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_profile")}>screen_profile 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_example")}>screen_example 페이지</button>
            </div>
            <hr/>
        </>
    );
}

export default Header;
