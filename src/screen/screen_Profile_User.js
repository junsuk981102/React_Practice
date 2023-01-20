import React from 'react';
import { useState } from "react";
import {
  // onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import {useNavigate} from "react-router-dom";

const ScreenProfileUser = (props) => {
    // const [user, setUser] = useState({});
    const [user] = useState({});

  const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  const logout = async () => {
    await signOut(auth);
  };

    return (
        <>
            <h3>ScreenProfileUser 페이지입니다.</h3>
            <button onClick={() => handleClick("/screen_profile")}>뒤로가기</button>
            <br/><br/>
            아이디 : <br/>
            Email : <br/>
            비밀번호 : <br/>
            생년월일 : <br/>
            주소 : <br/>
            <h4> User Logged In: </h4>
            {user?.email}

            <button onClick={logout}> Sign Out </button>
        </>
    );
}

export default ScreenProfileUser;