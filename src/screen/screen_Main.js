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
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Startup startupObj={startup} />
      </div>
    ));
  };

  const renderVCs = () => {
    return vcs.map((vc) => (
      <div
        key={vc.id}
        style={{
          border: "1px solid gray",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <VC vcObj={vc} />
      </div>
    ));
  };

  return (
    <>
      <img src="image/stot_main.png" alt="logo" />
      <h3>새로운 스타트업 찾기</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {renderStartups()}
      </div>
      <h3>새로운 VC 찾기</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {renderVCs()}
      </div>
    </>
  );
};

export default ScreenMain;