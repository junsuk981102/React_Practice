import React from "react";
import { useNavigate } from "react-router-dom";


const Community = ({ communityObj }) => {

        const navi = useNavigate();
    
        function handleClick() {
            
            navi(`/screen_Room_Info`, {state: {id: communityObj.id, name: communityObj.name, member:communityObj.member}});
        }

    return (
    <div>
        <h4>{communityObj.name}</h4>
        <button onClick={() => handleClick()}>Move to Community</button>
        
        {/* <button>Delete Community</button>
        <button>Edit Community name</button> */}
    </div>
)
}
export default Community;