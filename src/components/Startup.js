import React from "react";
import { useNavigate } from "react-router-dom";

const Startup = ({ startupObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_room_info`, {
      state: {
        id: startupObj.id,
        com_name : startupObj.com_name,
        com_category : startupObj.com_category,
        com_info : startupObj.com_info,
        com_total_investment : startupObj.com_total_investment,
        com_now_investment : startupObj.com_now_investment,
        com_ticket_price : startupObj.com_ticket_price,
        com_ticket_max : startupObj.com_ticket_max,
        com_member : startupObj.com_member,
      },
    });
  }

  return (
    <div>
      <h4>{startupObj.com_name}</h4>
      <button onClick={() => handleClick()}>Move to Startup</button>
      <br />
      {/* <button>Delete Community</button>
        <button>Edit Community name</button> */}
    </div>
  );
};
export default Startup;
