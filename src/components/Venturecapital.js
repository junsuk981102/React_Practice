import React from "react";
import { useNavigate } from "react-router-dom";

const Venturecapital = ({ venturecapitalObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_room_info`, {
      state: {
        id: venturecapitalObj.id,
        vc_name : venturecapitalObj.com_name,
        vc_category : venturecapitalObj.com_category,
        vc_info : venturecapitalObj.com_info,
        vc_total_investment : venturecapitalObj.com_total_investment,
        vc_now_investment : venturecapitalObj.com_now_investment,
        vc_ticket_price : venturecapitalObj.com_ticket_price,
        vc_ticket_max : venturecapitalObj.com_ticket_max,
        vc_member : venturecapitalObj.com_member,
      },
    });
  }

  return (
    <div>
      <h4>{venturecapitalObj.com_name}</h4>
      <button onClick={() => handleClick()}>Move to Startup</button>
      <br />
      {/* <button>Delete Community</button>
        <button>Edit Community name</button> */}
    </div>
  );
};
export default Venturecapital;
