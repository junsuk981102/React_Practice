import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase-config";
import Community from "../components/Community";

const ScreenRoomList = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

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
          borderColor: "#00A29D",  // 테두리 색상
          boxShadow: "0 0 15px #00A29D"  // 그림자 효과
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
    <div style={{ backgroundColor: "#E5F2F2", minHeight: "100vh", borderTop: "1px solid #00A29D" }}>
      <div
        style={{ paddingLeft: `${windowWidth > 1700 ? '500px' : '50px'}`, paddingRight: `${windowWidth > 1700 ? '500px' : '10px'}` }}
      >
        <h3 style={{ margin: "0", paddingTop: "50px", marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>커뮤니티</h3>
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
    </div>
  );
};

export default ScreenRoomList;