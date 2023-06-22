import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";

const ScreenStartupInfo = (props) => {
    const { state } = useLocation();
    console.log(state.name);

    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <h3>ScreenStartupInfo 페이지입니다.</h3>
            <h4>커뮤니티 이름: {state.sup_name}</h4>
            <h4>커뮤니티 범주: {state.sup_category}</h4>
            <h4>커뮤니티 정보: {state.sup_info}</h4>
            <h4>커뮤니티 목표 투자금액: {state.sup_total_investment}원</h4>
            <h4>커뮤니티 현재 투자금액: {state.sup_now_investment}원</h4>
            <h4>커뮤니티 티켓 가격: {state.sup_ticket_price}원</h4>
            <h4>커뮤니티 티켓 최대 개수: {state.sup_ticket_max}개</h4>
            <h4>커뮤니티 참여 인원 수: {state.sup_member}명</h4>
        </>
    );
}

export default ScreenStartupInfo;