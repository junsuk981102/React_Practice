import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase-config";
import Startup from "../components/Startup";
import VC from "../components/VC";

const ScreenMain = (props) => {
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    const [startups, setStartups] = useState([]);
    const [vcs, setVCs] = useState([]);

    useEffect(() => {
      dbService.collection("startup_list").onSnapshot(snapshot => {
        const startupArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStartups(startupArray);
      })
    }, [])
    useEffect(() => {
      dbService.collection("vc_list").onSnapshot(snapshot => {
        const vcArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVCs(vcArray);
      })
    }, [])
    
    return (
        <>
            <img src="image/stot_main.png" alt="logo"/>
            <h3>새로운 스타트업 찾기</h3>
            <div>
                {startups.map(startup => (
                <Startup key={startup.id} startupObj={startup} />
                ))}
            </div>
            <h3>새로운 VC 찾기</h3>
            <div>
                {vcs.map(vc => (
                <VC key={vc.id} vcObj={vc} />
                ))}
            </div>
        </>
    );
};

export default ScreenMain;