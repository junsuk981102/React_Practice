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
                <Link to={"/screen_login"}>screen_login 페이지</Link>
                {" "}
                <Link to={"/screen_register"}>screen_register 페이지</Link>
                {" "}
                <Link to={"/screen_wallet_connect"}>screen_wallet_connect 페이지</Link>
                {" "}
                <Link to={"/screen_wallet_token"}>screen_wallet_token 페이지</Link>
                {" "}
                <Link to={"/screen_room_list"}>screen_room_list 페이지</Link>
                {" "}
                <Link to={"/screen_room_make"}>screen_room_make 페이지</Link>
                {" "}
                <Link to={"/screen_room_setting"}>screen_room_setting 페이지</Link>
                {" "}
                <Link to={"/screen_room_find"}>screen_room_find 페이지</Link>
                {" "}
                <Link to={"/screen_room_info"}>screen_room_info 페이지</Link>
                {" "}
                <Link to={"/screen_chat"}>screen_chat 페이지</Link>
                {" "}
                <Link to={"/screen_profile"}>screen_profile 페이지</Link>
                {" "}
                <Link to={"/screen_profile_info"}>screen_profile_info 페이지</Link>
                {" "}
                <Link to={"/screen_profile_user"}>screen_profile_user 페이지</Link>
                {" "}
                <Link to={"/screen_example"}>screen_example 페이지</Link>
            </div>
            <hr/>
            <br/>
            */}
            <div>
                {/*<h1>useNavigate 방식</h1>*/}
                <button onClick={() => handleClick("")}>screen_main 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_login")}>screen_login 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_register")}>screen_register 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_wallet_connect")}>screen_wallet_connect 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_wallet_token")}>screen_wallet_token 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_room_list")}>screen_room_list 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_room_make")}>screen_room_make 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_room_setting")}>screen_room_setting 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_room_find")}>screen_room_find 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_room_info")}>screen_room_info 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_chat")}>screen_chat 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_profile")}>screen_profile 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_profile_info")}>screen_profile_info 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_profile_user")}>screen_profile_user 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_minting")}>screen_minting 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_my_animal")}>screen_my_animal 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_my_plant")}>screen_my_plant 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_my_governance")}>screen_my_governance 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_example")}>screen_example 페이지</button>
                {" "}
                <button onClick={() => handleClick("/screen_test")}>screen_test 페이지</button>
            </div>
            <hr/>
        </>
    );
}

export default Header;