import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";

const ScreenVCInfo = (props) => {
    const { state } = useLocation();
    console.log(state.name);

    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <h3>ScreenVCInfo 페이지입니다.</h3>
            <h4>커뮤니티 이름: {state.vc_name}</h4>
            <h4>커뮤니티 범주: {state.vc_category}</h4>
            <h4>커뮤니티 정보: {state.vc_info}</h4>
            <h4>커뮤니티 목표 투자금액: {state.vc_total_investment}원</h4>
            <h4>커뮤니티 현재 투자금액: {state.vc_now_investment}원</h4>
            <h4>커뮤니티 티켓 가격: {state.vc_ticket_price}원</h4>
            <h4>커뮤니티 티켓 최대 개수: {state.vc_ticket_max}개</h4>
            <h4>커뮤니티 참여 인원 수: {state.vc_member}명</h4>

        </>
    );
}

export default ScreenVCInfo;