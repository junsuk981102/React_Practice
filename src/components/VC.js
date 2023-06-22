import React from "react";
import { useNavigate } from "react-router-dom";

const VC = ({ vcObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_room_info`, {
      state: {
        id: vcObj.id,
        vc_name : vcObj.com_name,
        vc_category : vcObj.com_category,
        vc_info : vcObj.com_info,
        vc_total_investment : vcObj.com_total_investment,
        vc_now_investment : vcObj.com_now_investment,
        vc_ticket_price : vcObj.com_ticket_price,
        vc_ticket_max : vcObj.com_ticket_max,
        vc_member : vcObj.com_member,
      },
    });
  }

  return (
    <div>
      <h4>{vcObj.com_name}</h4>
      <button onClick={() => handleClick()}>Move to Startup</button>
      <br />
      {/* <button>Delete Community</button>
        <button>Edit Community name</button> */}
    </div>
  );
};
export default VC;
