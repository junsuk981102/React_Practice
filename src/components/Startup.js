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
        sup_logo: startupObj.sup_logo,
        sup_backgroundImg: startupObj.sup_backgorundImg,
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
          src={startupObj.sup_backgroundImg}
          alt="Startup Logo"
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
              src={startupObj.sup_logo}
              alt="Startup Logo"
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
            {startupObj.sup_name}
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
              {startupObj.sup_category}
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
            {startupObj.sup_info}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Startup;
