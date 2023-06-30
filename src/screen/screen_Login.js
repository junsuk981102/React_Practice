import User from "../components/cpn_User";
import "../chat.css";

function ScreenLogin() {
  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "#E5F2F2",
          borderTop: "1px solid #00A29D",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {/* <h3>ScreenLogin 페이지입니다.</h3> */}
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <User />
        </div>
      </div>
    </>
  );
}

export default ScreenLogin;

// import React from 'react';
// import { useState } from "react";
// import {
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../firebase-config";
// import { useNavigate } from "react-router-dom";

// const ScreenLogin = (props) => {
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [setUser] = useState({});

//   const navi = useNavigate();

//   function handleClick(text) {
//     navi(`${text}`)
//   }

//   //onAuthStateChanged(auth, (currentUser) => {
//   //  setUser(currentUser);
//   // });

//   const login = async () => {
//     try {
//       const user = await signInWithEmailAndPassword(
//         auth,
//         loginEmail,
//         loginPassword
//       );
//       console.log(user);
//       handleClick("/screen_wallet_connect");

//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <>
//       <div>
//         <h3>ScreenLogin 페이지입니다.</h3>
//         아이디 :
//         <input
//           placeholder="Email..."
//           onChange={(event) => {
//             setLoginEmail(event.target.value);
//           }}
//         />
//         <br />
//         비밀번호 :
//         <input
//           placeholder="Password..."
//           onChange={(event) => {
//             setLoginPassword(event.target.value);
//           }}
//         />
//         <br />
//         <button onClick={login}> 로그인 </button>
//       </div>

//       <br />
//       <button onClick={() => handleClick("/screen_register")}>screen_register 페이지</button>
//     </>
//   );
// }

// export default ScreenLogin;
