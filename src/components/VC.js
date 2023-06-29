import React from "react";
import { useNavigate } from "react-router-dom";

const VC = ({ vcObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_vc_info`, {
      state: {
        id: vcObj.id,
        vc_name: vcObj.vc_name,
        vc_category: vcObj.vc_category,
        vc_info: vcObj.vc_info,
      },
    });
  }

  return (
    <div>
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "50%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <img
          src={vcObj.vc_backgroundImg}
          alt="vc background image"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "50%",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: -40,
              left: 20,
              width: "80px",
              height: "80px",
              borderRadius: "20%",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src={vcObj.vc_logo}
              alt="VC logo"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20%",
              }}
            />
          </div>
          <h4
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            {vcObj.vc_name}
          </h4>
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 20,
              borderRadius: "15px",
              backgroundColor: "#00A29D",
              padding: "4px 8px",
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: "12px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {vcObj.vc_category}
            </h4>
          </div>
          <button
            style={{
              position: "absolute",
              top: 35,
              right: 20,
              fontSize: "20px",
              fontWeight: "bold",
            }}
            onClick={() => handleClick()}
          >
            자세히 보기 {">"}
          </button>
          <h4
            style={{
              position: "absolute",
              top: 80,
              left: 22,
              fontSize: "16px",
            }}
          >
            {vcObj.vc_info}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default VC;
