import React from "react";
import { useNavigate } from "react-router-dom";

const Startup = ({ startupObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_room_info`, {
      state: {
        id: startupObj.id,
        sup_name : startupObj.com_name,
        sup_category : startupObj.com_category,
        sup_info : startupObj.com_info,
        sup_total_investment : startupObj.com_total_investment,
        sup_now_investment : startupObj.com_now_investment,
        sup_ticket_price : startupObj.com_ticket_price,
        sup_ticket_max : startupObj.com_ticket_max,
        sup_member : startupObj.com_member,
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
