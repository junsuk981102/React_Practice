import React from 'react';
import { useState } from "react";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
// import {useNavigate} from "react-router-dom";


const ScreenProfile = (props) => {
  const [user, setUser] = useState({});

//   const navi = useNavigate();

//     function handleClick(text) {
//         navi(`${text}`)
//     }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };

    return (
        <>
    <h3>ScreenProfile 페이지입니다.</h3>

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
        </>
    );
}

export default ScreenProfile;