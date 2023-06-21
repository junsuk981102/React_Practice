import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase-config";
import Community from "../components/Community";

const ScreenRoomList = (props) => {

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (event) => {
    setShowPopup(event.target.value)
  };
  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`)
  }

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    dbService.collection("community_list").onSnapshot(snapshot => {
      const communityArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communityArray);
    })
  }, [])

    return (
        <>
      <h3>ScreenRoomList 페이지입니다.</h3>
      <button onClick={() => handleClick("/screen_wallet_token")}>screen_wallet_token 페이지</button>
      <button onClick={() => handleClick("/screen_room_list")}>screen_room_list 페이지</button>
      <button onClick={() => handleClick("/screen_profile")}>screen_profile 페이지</button>
      <br/><br/><br/>
      <div>
        {communities.map(community => (
          <Community key={community.id} communityObj={community} />
        ))}
      </div>
      <h3>원하는 커뮤니티가 없으신가요?</h3>
      
      <button className="open" onClick={togglePopup} value='false'>커뮤니티를 직접 만들거나 찾아보세요</button>
      {showPopup ? (
        <div className="popup">
          <div className="popup_inner">
            <button onClick={() => handleClick("/screen_room_make")}>screen_room_make 페이지</button>
            <button onClick={() => handleClick("/screen_room_find")}>screen_room_find 페이지</button>
            <br/>
            <button className="close"  onClick={togglePopup}>
              Close me
            </button>
          </div>
        </div>
      ) : null}
        </>
    );
}

export default ScreenRoomList;