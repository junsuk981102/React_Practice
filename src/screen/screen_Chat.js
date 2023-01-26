import Chat from '../components/cpn_Chat'
import '../chat.css'
import {useNavigate} from "react-router-dom";

function ScreenChat() {
  const navi = useNavigate();

  function handleClick(text) {
      navi(`${text}`)
  }

  return (
    <>
        <h3>ScreenChat 페이지입니다.</h3>
        <button onClick={() => handleClick("/screen_room_list")}>뒤로가기</button>
        <br/><br/>
        <div className="ScreenChat">
          <Chat/>
        </div>
    </>
  )
}

export default ScreenChat;