import React from 'react';
import { useState } from "react";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import {useNavigate} from "react-router-dom";


const ScreenProfile = (props) => {
  const [user, setUser] = useState({});

  const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };

    return (
        <>
    <h3>ScreenProfile 페이지입니다.</h3>
    <button onClick={() => handleClick("/screen_wallet_token")}>screen_wallet_token 페이지</button>
    <button onClick={() => handleClick("/screen_room_list")}>screen_room_list 페이지</button>
    <button onClick={() => handleClick("/screen_profile")}>screen_profile 페이지</button>
    <br/><br/><br/>

    <button onClick={() => handleClick("/screen_profile_info")}>screen_profile_info 페이지</button>
    {" "}
    <button onClick={() => handleClick("/screen_profile_user")}>screen_profile_user 페이지</button>
    {" "}
    
      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
        </>
    );
}

export default ScreenProfile;