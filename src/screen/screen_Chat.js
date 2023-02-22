import Chat from "../components/cpn_Chat";
import "../chat.css";
import { useNavigate, useLocation } from "react-router-dom";

function ScreenChat() {
  const { state } = useLocation();
  const navi = useNavigate();
  console.log(state.name);

  function handleClick(text) {
    navi(`${text}`);
  }

  return (
    <>
      <h3>ScreenChat 페이지입니다.</h3>
      <h4>{state.name}의 커뮤니티 입니다.</h4>
      <button onClick={() => handleClick("/screen_room_list")}>뒤로가기</button>
      <br />
      <br />
      <div className="ScreenChat">
        <Chat />
      </div>
    </>
  );
}

export default ScreenChat;
