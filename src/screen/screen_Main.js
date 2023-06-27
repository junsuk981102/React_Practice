import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase-config";
import Startup from "../components/Startup";
import VC from "../components/VC";

const ScreenMain = (props) => {
  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
  }

  const [startups, setStartups] = useState([]);
  const [vcs, setVCs] = useState([]);

  useEffect(() => {
    dbService.collection("startup_list").onSnapshot((snapshot) => {
      const startupArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStartups(startupArray);
    });
  }, []);

  useEffect(() => {
    dbService.collection("vc_list").onSnapshot((snapshot) => {
      const vcArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVCs(vcArray);
    });
  }, []);

  const renderStartups = () => {
    return startups.map((startup) => (
      <div
        key={startup.id}
        style={{
          border: "1px solid gray",
          borderRadius: "5%",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "500px",
          height: "360px",
          position: "relative",
          overflow: "hidden",
          borderColor: "#00A29D",  // 테두리 색상
          boxShadow: "0 0 15px #00A29D"  // 그림자 효과
        }}
      >
        <div
          style={{
            backgroundImage: `url(/image/animal/1.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "50%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
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
          <Startup startupObj={startup} />
        </div>
      </div>
    ));
  };

  const renderVCs = () => {
    return vcs.map((vc) => (
      <div
        key={vc.id}
        style={{
          border: "1px solid gray",
          borderRadius: "5%",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "500px",
          height: "360px",
          position: "relative",
          overflow: "hidden",
          borderColor: "#00A29D",  // 테두리 색상
          boxShadow: "0 0 15px #00A29D"  // 그림자 효과
        }}
      >
        <div
          style={{
            backgroundImage: `url(/image/animal/2.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "50%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
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
          <VC vcObj={vc} />
        </div>
      </div>
    ));
  };

  return (
    <>
      <img
        src="image/stot_main.png"
        alt="logo"
        style={{
          marginBottom: "35px",
          width: "100%",
          height: "auto",
        }}
      />
      <div style={{ paddingLeft: "500px", paddingRight: "500px" }}>
        <h3 style={{ margin: "0", marginBottom: "5px", fontSize: "20px"}}>새로운 스타트업 찾기</h3>
        <h3 style={{ margin: "0", marginBottom: "20px", fontSize: "28px", fontWeight: "bold" }}>투자 중인 스타트업</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "20px",
          }}
        >
          {renderStartups()}
        </div>
        <h3 style={{ margin: "0", marginTop: "40px", marginBottom: "5px", fontSize: "20px"}}>새로운 VC 찾기</h3>
        <h3 style={{ margin: "0", marginBottom: "20px", fontSize: "28px", fontWeight: "bold" }}>투자 중인 VC</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "20px",
          }}
        >
          {renderVCs()}
        </div>
      </div>
    </>
  );
};

export default ScreenMain;