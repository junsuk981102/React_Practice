import User from "../components/cpn_User";
import "../chat.css";
import { useNavigate } from "react-router-dom";

function ScreenProfileUser() {
  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
  }

  return (
    <>
      <h3>ScreenProfileUser 페이지입니다.</h3>
      <button onClick={() => handleClick("/screen_profile")}>뒤로가기</button>
      <div className="ScreenProfileUser">
        <User />
      </div>
    </>
  );
}

export default ScreenProfileUser;
