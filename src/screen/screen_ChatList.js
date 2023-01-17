import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Example = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    
    const togglePopup = (event) => {
        setShowPopup(event.target.value)
    };
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    return (
        <>
            <div className="App">
      <h1>새로운 방 추가하기</h1>
      <button className="open" onClick ={togglePopup} value = 'false'>새로운 방 추가</button>
      {showPopup ? (
        <div className="popup">
          <div className="popup_inner">
            <button onClick={() => handleClick("/makingroom")}>MakingRoom 페이지</button>
            <button onClick={() => handleClick("/findingroom")}>Findingroom 페이지</button>
            <br/>
            <button className="close"  onClick={togglePopup}>
              Close me
            </button>
          </div>
        </div>
      ) : null}
    </div>

            
        </>
    );
}

export default Example;
