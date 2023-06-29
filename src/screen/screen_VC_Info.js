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
                    <div className="test"
                        style={{
                        width: "1000px",height: "1000px",backgroundColor: "white",border: "3px solid #00A29D",
                        padding: "30px",display: "flex",position: "relative",borderRadius: "15px",
                        }}
                    >
                    <img
                    src="../image/animal/2.png"
                    alt="Animal"
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "50%"
                    }}
                    />
                    <div style={{ padding: "20px"}}>
                        <h4 style={{fontSize: "50px",fontWeight: "bold",marginBottom:"200px"}}>VC 이름: {state.vc_name}</h4>
                        <h4 style={{fontSize: "35px",fontWeight: "bold"}}>VC 범주: {state.vc_category}</h4>
                        <h4 style={{fontSize: "25px",fontWeight: "bold"}}>VC 정보: {state.vc_info}</h4>
                    </div>
                  </div>
                </div>
            </div>
        </>
    );
}


export default ScreenVCInfo;