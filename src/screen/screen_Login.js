import User from "../components/cpn_User";
import "../chat.css";

function ScreenLogin() {
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
          <User />
        </div>
      </div>
    </>
  );
}

export default ScreenLogin;
