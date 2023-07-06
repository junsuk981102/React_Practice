import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "../components/cpn_Register";

const ScreenRegister = (props) => {
  const navi = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#E5F2F2",
        borderTop: "1px solid #00A29D",
      }}
    >
      <Register />
    </div>
  );
};

export default ScreenRegister;
