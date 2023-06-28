import React from "react";
import { useNavigate } from "react-router-dom";

const Community = ({ communityObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_room_info`, {
      state: {
        id: communityObj.id,
        com_name : communityObj.com_name,
        com_category : communityObj.com_category,
        com_info : communityObj.com_info,
        com_total_investment : communityObj.com_total_investment,
        com_now_investment : communityObj.com_now_investment,
        com_ticket_price : communityObj.com_ticket_price,
        com_ticket_max : communityObj.com_ticket_max,
        com_member : communityObj.com_member,
      },
    });
  }

  function handleClick_chat() {
    navi(`/screen_chat`, {
      state: {
        id: communityObj.id,
        com_name : communityObj.com_name,
        com_category : communityObj.com_category,
        com_info : communityObj.com_info,
        com_total_investment : communityObj.com_total_investment,
        com_now_investment : communityObj.com_now_investment,
        com_ticket_price : communityObj.com_ticket_price,
        com_ticket_max : communityObj.com_ticket_max,
        com_member : communityObj.com_member,
      },
    });
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <h4 style={{ position: "absolute", top: 10, left: 10, fontSize: "28px", fontWeight: "bold" }}>{communityObj.com_name}</h4>
    <h4 style={{ position: "absolute", top: 50, left: 12, fontSize: "12px", fontWeight: "bold", color: "#00A29D" }}>{communityObj.com_category}</h4>
    <button style={{ position: "absolute", top: 15, right: 20, fontSize: "10px",fontWeight: "bold" }} onClick={() => handleClick()}>
    자세히 보기 {'>'}
    </button>
    <button style={{ position: "absolute",borderRadius: "10px",color: "white",backgroundColor: "#00A29D",padding: "4px 8px",bottom: 15, right: 20, fontSize: "18px", fontWeight: "bold" }} onClick={() => handleClick_chat()}>
    채팅방 입장 {'>'}
    </button>
    <h4 style={{ position: "absolute", bottom: 20, left: 12, fontSize: "16px", color: "#00A29D", fontWeight: "bold" }}>현재 : {communityObj.com_member}명</h4>
    </div>
  );
};
export default Community;

