import React from 'react';
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";
import {useNavigate} from "react-router-dom";

const Login = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [setUser] = useState({});

  const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      handleClick("/metamask")

    } catch (error) {
      console.log(error.message);
    }
  };

    return (
        <>
      <div>
        <h3> Login </h3>
        아이디 :
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <br/>
        비밀번호 :
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <br/>
        <button onClick={login}> 로그인 </button>
      </div>

      <br/>
      <button onClick={() => handleClick("/register")}>회원가입 페이지</button>
        </>
    );
}

export default Login;