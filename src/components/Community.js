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
    <div>
      <h4>{communityObj.name}</h4>
      <button onClick={() => handleClick()}>Move to Community</button>
      <br />
      <button onClick={() => handleClick_chat()}>Move to ChatRoom</button>
      <br />
      {/* <button>Delete Community</button>
        <button>Edit Community name</button> */}
    </div>
  );
};
export default Community;
