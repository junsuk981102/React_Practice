import React from 'react';
import {Link, useNavigate} from "react-router-dom";

function Header(props) {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <h1>헤더입니다.</h1>
            <hr/>
            <div>
                <h1>Link 방식</h1>
                <Link to={"/"}>메인 페이지</Link>
                {" "}
                <Link to={"/example"}>예시 페이지</Link>
                {" "}
                <Link to={"/landing"}>Landing 페이지</Link>
                {" "}
                <Link to={"/login"}>로그인 페이지</Link>
                {" "}
                <Link to={"/register"}>회원가입 페이지</Link>
                {" "}
                <Link to={"/metamask"}>Metamask 페이지</Link>
                {" "}
                <Link to={"/chatlist"}>ChatList 페이지</Link>
                {" "}
                <Link to={"/makingroom"}>MakingRoom 페이지</Link>
                {" "}
                <Link to={"/findingroom"}>FindingRoom 페이지</Link>
                {" "}
                <Link to={"/chatroom"}>ChatRoom 페이지</Link>
                {" "}
                <Link to={"/profile"}>Profile 페이지</Link>
            </div>
            <hr/>
            <br />
            <div>
                <h1>useNavigate 방식</h1>
                <button onClick={() => handleClick("")}>메인 페이지</button>
                {" "}
                <button onClick={() => handleClick("/example")}>예시 페이지</button>
                {" "}
                <button onClick={() => handleClick("/landing")}>Landing 페이지</button>
                {" "}
                <button onClick={() => handleClick("/login")}>로그인 페이지</button>
                {" "}
                <button onClick={() => handleClick("/register")}>회원가입 페이지</button>
                {" "}
                <button onClick={() => handleClick("/metamask")}>Metamask 페이지</button>
                {" "}
                <button onClick={() => handleClick("/chatlist")}>ChatList 페이지</button>
                {" "}
                <button onClick={() => handleClick("/makingroom")}>MakingRoom 페이지</button>
                {" "}
                <button onClick={() => handleClick("/findingroom")}>Findingroom 페이지</button>
                {" "}
                <button onClick={() => handleClick("/chatroom")}>ChatRoom 페이지</button>
                {" "}
                <button onClick={() => handleClick("/profile")}>Profile 페이지</button>
            </div>
            <hr/>
        </>
    );
}

export default Header;
