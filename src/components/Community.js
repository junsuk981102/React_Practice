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
    <h4 style={{ position: "absolute", top: 30, left: 20 }}>{communityObj.com_name}</h4>
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 20,
        borderRadius: "20%",
        backgroundColor: "#00A29D",
        padding: "4px 8px",
      }}
    >
      <h4 style={{ margin: 0 }}>{communityObj.com_category}</h4>
    </div>
    <button style={{ position: "absolute", top: 30, right: 20 }} onClick={() => handleClick()}>
    자세히 보기 {'>'}
    </button>
    <h4 style={{ position: "absolute", top: 60, left: 20 }}>{communityObj.com_info}</h4>
    <button style={{ position: "absolute", top: 60, right: 20 }} onClick={() => handleClick()}>
    채팅방 입장 {'>'}
    </button>
    </div>
  );
};
export default Community;

