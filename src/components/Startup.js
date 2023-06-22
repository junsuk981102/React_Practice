import React from "react";
import { useNavigate } from "react-router-dom";

const Startup = ({ startupObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_startup_info`, {
      state: {
        id: startupObj.id,
        sup_name : startupObj.sup_name,
        sup_category : startupObj.sup_category,
        sup_info : startupObj.sup_info,
      },
    });
  }

  return (
    <div>
      <h4>{startupObj.sup_name}</h4>
      <button onClick={() => handleClick()}>Move to Startup</button>
      <br />
      {/* <button>Delete Community</button>
        <button>Edit Community name</button> */}
    </div>
  );
};
export default Startup;
