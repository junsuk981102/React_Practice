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
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width : "500px",
          height : "360px"
        }}
      >
        <Community communityObj={community} />
      </div>
    ));
  };

  return (
    <>
      <div style={{ paddingLeft: "88px", paddingRight: "88px" }}>
        <h3 style={{ margin: "0",marginTop: "35px", marginBottom: "20px" }}>커뮤니티</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {renderCommunities()}
        </div>
      </div>
    </>
  );
};

export default ScreenRoomList;