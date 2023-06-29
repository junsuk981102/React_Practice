import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";

const ScreenStartupInfo = (props) => {
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
                    <h3 style={{ margin: "0", paddingTop: "50px", marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>스타트업 소개</h3>
                    <div
                        style={{
                        width: "1000px",height: "1000px",backgroundColor: "white",border: "3px solid #00A29D",
                        padding: "10px",alignItems: "center",display: "flex",position: "relative",borderRadius: "15px",
                        fontSize: "15px",fontWeight: "bold"
                        }}
                    >
                    <h4>스타트업 이름: {state.sup_name}</h4>
                    <h4>스타트업 범주: {state.sup_category}</h4>
                    <h4>스타트업 정보: {state.sup_info}</h4>
                  </div>
                </div>
            </div>
        </>
    );
}

export default ScreenStartupInfo;