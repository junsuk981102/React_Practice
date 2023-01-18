import React from 'react';
import {useNavigate} from "react-router-dom";


const ScreenProfile = (props) => {
  const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
        <h3>ScreenProfile 페이지입니다.</h3>
        <button onClick={() => handleClick("/screen_wallet_token")}>screen_wallet_token 페이지</button>
        <button onClick={() => handleClick("/screen_room_list")}>screen_room_list 페이지</button>
        <button onClick={() => handleClick("/screen_profile")}>screen_profile 페이지</button>
        <br/><br/><br/>

        <button onClick={() => handleClick("/screen_profile_info")}>screen_profile_info 페이지</button>
        <br/>
        <button onClick={() => handleClick("/screen_profile_user")}>screen_profile_user 페이지</button>
        </>
    );
}

export default ScreenProfile;