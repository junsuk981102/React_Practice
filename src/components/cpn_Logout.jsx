import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); // 페이지 이동을 처리하기 위해 navigate 변수를 선언
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/screen_Login"); // 로그아웃 후 로그인 화면으로 이동
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
      });
  };
  return (
    <>
      <button onClick={handleLogout} className="btn-login btn-logout">
        Logout
      </button>
    </>
  );
};

export default Logout;
