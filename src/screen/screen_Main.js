import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase-config";
import Community from "../components/Community";

const ScreenMain = (props) => {
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
            <img src="image/stot_main.png" alt="logo"/>
            <h3>새로운 스타트업 찾기</h3>
            <h3>투자중인 스타트업</h3>

            <div>
                {communities.map(community => (
                <Community key={community.id} communityObj={community} />
                ))}
            </div>
        </>
    );
};

export default ScreenMain;