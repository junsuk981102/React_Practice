import Login from "../components/cpn_Login";
import "../chat.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";

function ScreenLogin() {
  const [user] = useAuthState(auth);
  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "#E5F2F2",
          borderTop: "1px solid #00A29D",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {/* <h3>ScreenLogin 페이지입니다.</h3> */}
        <div
          style={{
            width: "700px",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Login />
        </div>
      </div>
    </>
  );
}

export default ScreenLogin;
