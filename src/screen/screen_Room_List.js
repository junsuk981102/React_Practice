import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase-config";
import Community from "../components/Community";

const ScreenRoomList = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (event) => {
    setShowPopup(event.target.value);
  };
  
  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
  }

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    dbService.collection("community_list").onSnapshot((snapshot) => {
      const communityArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communityArray);
    });
  }, []);

  const renderCommunities = () => {
    return communities.map((community) => (
      <div
        key={community.id}
        style={{
          border: "1px solid gray",
          borderRadius: "5%",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "300px",
          height: "400px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundImage: `url(/image/animal/3.png)`,
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
        <Community communityObj={community} />
        </div>
      </div>
    ));
  };
  return (
    <>
      <div style={{ paddingLeft: "88px", paddingRight: "88px" }}>
        <h3 style={{ margin: "0",marginTop: "35px", marginBottom: "20px", fontSize: "28px", fontWeight: "bold" }}>커뮤니티</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {renderCommunities()}
        </div>
      </div>
    </>
  );
};

export default ScreenRoomList;