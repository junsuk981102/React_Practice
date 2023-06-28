import React from 'react';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const ScreenRegister = (props) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      <div style={{ width: "600px", padding: "20px", backgroundColor: "#E5F2F2"}}>
        <h3 style={{ textAlign: "center", marginBottom: "30px", fontSize: "24px", fontWeight: "bold"}}>회원가입</h3>
        <div style={{ display: "flex", flexDirection: "column"}}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
            <label htmlFor="id" style={{fontSize: "20px", fontWeight: "bold"}}>아이디:</label>
            <input type="text" id="id" placeholder="아이디를 입력해주세요" 
              style={{fontSize: "15px", fontWeight: "bold", maxWidth: "300px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
            <label htmlFor="email" style={{fontSize: "20px", fontWeight: "bold"}}>이메일:</label>
            <input type="text" id="email" placeholder="예: stot1234@stot.com" value={registerEmail}
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
              style={{fontSize: "15px", fontWeight: "bold", maxWidth: "300px"}}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
            <label htmlFor="password" style={{fontSize: "20px", fontWeight: "bold"}}>비밀번호:</label>
            <input type="text" id="password" placeholder="비밀번호를 입력해주세요" value={registerPassword}
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
              style={{fontSize: "15px", fontWeight: "bold", maxWidth: "300px"}}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
            <label htmlFor="confirmPassword" style={{fontSize: "20px", fontWeight: "bold"}}>비밀번호 확인:</label>
            <input type="text" id="confirmPassword" placeholder="비밀번호를 한 번 더 입력해주세요" value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              style={{fontSize: "15px", fontWeight: "bold", maxWidth: "300px"}}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
            <label htmlFor="birthDate" style={{fontSize: "20px", fontWeight: "bold", marginRight: "50px"}}>생년월일:</label>
            <div style={{ width: "150px" }} />
            <input type="date" id="birthDate" style={{fontSize: "15px", fontWeight: "bold"}}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
            <label htmlFor="address" style={{fontSize: "20px", fontWeight: "bold"}}>주소:</label>
            <input type="text" id="address" placeholder="주소를 입력해주세요" style={{fontSize: "15px", fontWeight: "bold", maxWidth: "300px" }}/>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px"}}>
            <button onClick={register} style={{fontSize: "20px", fontWeight: "bold"}}>가입하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenRegister;