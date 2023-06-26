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
      <h4 style={{ position: "absolute", top: 30, left: 20, fontSize: "28px", fontWeight: "bold"}}>{startupObj.sup_name}</h4>
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
        <h4 style={{ margin: 0, fontSize: "12px", fontWeight: "bold" }}>{startupObj.sup_category}</h4>
      </div>
      <button style={{ position: "absolute", top: 30, right: 20, fontSize: "20px", fontWeight: "bold" }} onClick={() => handleClick()}>
        자세히 보기 {'>'}
      </button>
      <h4 style={{ position: "absolute", top: 60, left: 20,fontSize: "16px"}}>{startupObj.sup_info}</h4>
    </div>
  );
};

export default Startup;