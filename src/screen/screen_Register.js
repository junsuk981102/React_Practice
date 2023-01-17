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
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
        <button onClick={() => handleClick("/login")}>로그인 페이지</button>
      </div>
        </>
    );
}

export default Register;