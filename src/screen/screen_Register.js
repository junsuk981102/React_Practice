import React from 'react';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const ScreenRegister = (props) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#E5F2F2",
      }}
    >
      <div style={{ width: "300px", padding: "20px", backgroundColor: "#FFFFFF" }}>
        <h3 style={{ textAlign: "center" }}>회원가입</h3>
        <div>
          <label htmlFor="id">아이디:</label>
          <input type="text" id="id" placeholder="ID..." />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email..."
            value={registerEmail}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            placeholder="Password..."
            value={registerPassword}
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input type="password" id="confirmPassword" placeholder="Confirmed Password..." />
        </div>
        <div>
          <label htmlFor="birthDate">생년월일:</label>
          <input type="date" id="birthDate" placeholder="Birth date..." />
        </div>
        <div>
          <label htmlFor="address">주소:</label>
          <input type="text" id="address" placeholder="Address..." />
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={register}>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default ScreenRegister;