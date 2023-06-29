import React, { useState, useEffect } from "react";
import {useNavigate, useLocation} from "react-router-dom";

const ScreenRoomInfo = (props) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    useEffect(() => {
      setWindowWidth(window.innerWidth);
    }, []);

    const { state } = useLocation();
    console.log(state.name);

    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
          <div style={{ backgroundColor: "#E5F2F2", minHeight: "100vh", borderTop: "1px solid #00A29D" }}>
            <div style={{ paddingLeft: `${windowWidth > 1700 ? '500px' : '50px'}`, paddingRight: `${windowWidth > 1700 ? '500px' : '10px'}` }}>
              <h3 style={{ margin: "0", paddingTop: "50px", marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>VC 소개</h3>
              <div className
                style={{
                  width: "1000px",height: "1000px",backgroundColor: "white",border: "3px solid #00A29D",
                  padding: "30px",borderRadius: "15px",
                  }}>
    
                <div style={{height: "auto",display: "flex",position: "relative",alignItems:"center"}}>
                    <img src="../image/animal/2.png" alt="Animal" style={{width: "200px", height: "200px", objectFit: "cover", borderRadius: "50%"}}/>
                    <h4>커뮤니티 이름: {state.com_name}</h4>
                    <h4>커뮤니티 범주: {state.com_category}</h4>
                    <h4>커뮤니티 정보: {state.com_info}</h4>
                </div>
    
                <div style={{height:"auto",padding: "20px",marginTop: "10px"}}>
                    <h4>커뮤니티 목표 투자금액: {state.com_total_investment}원</h4>
                    <h4>커뮤니티 현재 투자금액: {state.com_now_investment}원</h4>
                </div>
    
                <div style={{padding: "20px"}}>
                    <h4>커뮤니티 티켓 가격: {state.com_ticket_price}원</h4>
                    <h4>커뮤니티 티켓 최대 개수: {state.com_ticket_max}개</h4>
                </div>

                <div style={{display:"flex",justifyContent:"center",textAlign:"center"}} >
                    <div style={{border: "1px solid black",padding: "5px",width: "110px",height: "30px",fontSize: "15px", fontWeight: "bold", backgroundColor: "#E5F2F2", borderRadius: "10px"}}>
                        <h4>{state.com_member}명 참여중</h4>
                    </div>
                </div>

                <div style={{padding: "20px",display: "flex",justifyContent:"center"}}>
                    <button onClick={() => handleClick("/screen_chat")} style={{width: "700px",height: "60px",fontSize: "20px", fontWeight: "bold", backgroundColor: "#00A29D", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px" }}>
                        커뮤니티 참여하기
                    </button>
                </div>
              </div>
          </div>
        </div>
      </>
    );
}

export default ScreenRoomInfo;