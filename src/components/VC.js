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
      <h4 style={{ position: "absolute", top: 0, left: 0 }}>{vcObj.vc_name}</h4>
      <button style={{ position: "absolute", top: 0, right: 0 }} onClick={() => handleClick()}>
        자세히 보기
      </button>
    </div>
  );
};
export default VC;