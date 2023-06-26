import React from "react";
import { useNavigate } from "react-router-dom";

const Startup = ({ startupObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_startup_info`, {
      state: {
        id: startupObj.id,
        sup_name: startupObj.sup_name,
        sup_category: startupObj.sup_category,
        sup_info: startupObj.sup_info,
      },
    });
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <h4 style={{ position: "absolute", top: 0, left: 0 }}>{startupObj.sup_name}</h4>
      <button style={{ position: "absolute", top: 0, right: 0 }} onClick={() => handleClick()}>
        자세히 보기
      </button>
      {/* <button>Delete Community</button>
        <button>Edit Community name</button> */}
    </div>
  );
};

export default Startup;