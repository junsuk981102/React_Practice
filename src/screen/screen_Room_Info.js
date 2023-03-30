import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";

const ScreenRoomInfo = (props) => {
    const { state } = useLocation();
    console.log(state.name);

    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <h3>ScreenRoomInfo 페이지입니다.</h3>
            <h3>ScreenRoomInfo 페이지입니다.</h3>
            <h4>커뮤니티 이름: {state.com_name}</h4>
            <h4>커뮤니티 범주: {state.com_category}</h4>
            <h4>커뮤니티 정보: {state.com_info}</h4>
            <h4>커뮤니티 목표 투자금액: {state.com_total_investment}원</h4>
            <h4>커뮤니티 현재 투자금액: {state.com_now_investment}원</h4>
            <h4>커뮤니티 티켓 가격: {state.com_ticket_price}원</h4>
            <h4>커뮤니티 티켓 최대 개수: {state.com_ticket_max}개</h4>
            <h4>커뮤니티 참여 인원 수: {state.com_member}명</h4>
            <button onClick={() => handleClick("/screen_room_find")}>뒤로가기</button>
            <br/><br/>
            <button onClick={() => handleClick("/screen_chat")}>screen_chat 페이지</button>
        </>
    );
}

export default ScreenRoomInfo;