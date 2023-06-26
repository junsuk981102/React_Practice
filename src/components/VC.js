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
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <h4 style={{ position: "absolute", top: 30, left: 20 }}>{vcObj.vc_name}</h4>
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
        <h4 style={{ margin: 0 }}>{vcObj.vc_category}</h4>
      </div>
      <button style={{ position: "absolute", top: 30, right: 20 }} onClick={() => handleClick()}>
        자세히 보기 >
      </button>
      <h4 style={{ position: "absolute", top: 60, left: 20 }}>{vcObj.vc_info}</h4>
    </div>
  );
};
export default VC;