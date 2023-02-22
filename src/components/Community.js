import React from "react";
import { useNavigate } from "react-router-dom";

const Community = ({ communityObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_room_info`, {
      state: {
        id: communityObj.id,
        name: communityObj.name,
        member: communityObj.member,
      },
    });
  }

  function handleClick_chat() {
    navi(`/screen_chat`, {
      state: {
        id: communityObj.id,
        name: communityObj.name,
        member: communityObj.member,
      },
    });
  }

  return (
    <div>
      <h4>{communityObj.name}</h4>
      <button onClick={() => handleClick()}>Move to Community</button>
      <br />
      <button onClick={() => handleClick_chat()}>Move to ChatRoom</button>
      <br />
      {/* <button>Delete Community</button>
        <button>Edit Community name</button> */}
    </div>
  );
};
export default Community;
