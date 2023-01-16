import "./App.css";
import { useNavigate } from "react-router-dom";

export default function home() {
  const movePage = useNavigate();

  function gohome(){
     movePage('/user/mypage');
   }
  return (
    
    <div className="home">
        홈 입니다.
        첫 페이지
      <button onClick={gohome}>홈으로이동</button>
      </div>
  );
}