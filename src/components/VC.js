import React from "react";
import { useNavigate } from "react-router-dom";

const VC = ({ vcObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_vc_info`, {
      state: {
        id: vcObj.id,
        vc_name : vcObj.vc_name,
        vc_category : vcObj.vc_category,
        vc_info : vcObj.vc_info,
      },
    });
  }

  return (
    <div>
      <h4>{vcObj.vc_name}</h4>
      <button onClick={() => handleClick()}>Move to Startup</button>
      <br />
      {/* <button>Delete Community</button>
        <button>Edit Community name</button> */}
    </div>
  );
};
export default VC;
