import React from 'react';
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config";
import {useNavigate} from "react-router-dom";


const Register = (props) => {
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
      handleClick("/login");

    } catch (error) {
      console.log(error.message);
    }
  };
    return (
        <>
      <div>
        <h3> Register User </h3>
        아이디 :
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <br/>
        비밀번호 :
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <br/>
        <button onClick={register}> 회원가입 </button>
        
        <br/>
        <br/>
        <button onClick={() => handleClick("/login")}>로그인 페이지</button>
      </div>
        </>
    );
}

export default Register;