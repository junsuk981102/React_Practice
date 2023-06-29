import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";

const ScreenVCInfo = (props) => {
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

    const { state } = useLocation();
    console.log(state.name);

    return (
        <>
            <div style={{ backgroundColor: "#E5F2F2", minHeight: "100vh", borderTop: "1px solid #00A29D" }}>
                <div
                style={{ paddingLeft: `${windowWidth > 1700 ? '500px' : '50px'}`, paddingRight: `${windowWidth > 1700 ? '500px' : '10px'}` }}
                >
                    <h3 style={{ margin: "0", paddingTop: "50px", marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>VC 소개</h3>
                    <h4>VC 이름: {state.vc_name}</h4>
                    <h4>VC 범주: {state.vc_category}</h4>
                    <h4>VC 정보: {state.vc_info}</h4>
                </div>
            </div>
        </>
    );
}



export default ScreenVCInfo;