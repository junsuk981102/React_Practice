import React from 'react';
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
import {useNavigate} from "react-router-dom";


const ScreenRegister = (props) => {
    const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      handleClick("/screen_login");

    } catch (error) {
      console.log(error.message);
    }
  };


    return (
        <>
      <div>
        <h3>ScreenRegister 페이지입니다.</h3>
        아이디 :
        <input placeholder="ID..."/>
        <br/>
        Email :
        <input placeholder="Email..." onChange={(event) => {setRegisterEmail(event.target.value);}}/>
        <br/>
        비밀번호 :
        <input placeholder="Password..." onChange={(event) => {setRegisterPassword(event.target.value);}} />
        <br/>
        비밀번호 확인 :
        <input placeholder="Confirmed Password..."/>
        <br/>
        생년월일 :
        <input placeholder="Birth date..."/>
        <br/>
        주소 :
        <input placeholder="Address..."/>
        <br/>
        <button onClick={register}> 회원가입 </button>
        <br/>
        <br/>
        <button onClick={() => handleClick("/screen_login")}>screen_login 페이지</button>
      </div>
        </>
    );
}

export default ScreenRegister;