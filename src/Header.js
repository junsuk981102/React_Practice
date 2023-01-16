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
                <Link to={"/product"}>상품 페이지</Link>
            </div>
            <hr/>
            <br />
            <div>
                <h1>useNavigate 방식</h1>
                <button onClick={() => handleClick("")}>메인 페이지</button>
                {" "}
                <button onClick={() => handleClick("/product")}>상품 페이지</button>

            </div>
            <hr/>
        </>
    );
}

export default Header;
