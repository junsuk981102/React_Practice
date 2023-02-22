// import React from 'react';
// import {useNavigate} from "react-router-dom";

import React, { useState} from "react";
import { dbService } from "../firebase-config";

const ScreenRoomMake = (props) => {
    // const navi = useNavigate();

    // function handleClick(text) {
    //     navi(`${text}`)
    // }

    const [community, setCommunity] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("community_list").add({
            name: community,
            createAt: Date.now(),
            member: 0,
        });
        setCommunity("")
    }

    const onChange = (event) => {
        const {
          target: { value }
        } = event;
        setCommunity(value);
      }

    return (
        <>
            <h3>ScreenRoomMake 페이지입니다.</h3>
            <div>
                <form onSubmit={onSubmit}>
                    <input value={community} onChange={onChange} type="text" placeholder="어떤 커뮤니티를 만드실건가요?" maxLength={120} />
                    <input type="submit" value="커뮤니티 만들기" />
                </form>
            </div>

            {/* <button onClick={() => handleClick("/screen_room_list")}>뒤로가기</button>
            <br/><br/>
            <button onClick={() => handleClick("/screen_room_setting")}>screen_room_setting 페이지</button> */}
        </>
    );
}

export default ScreenRoomMake;