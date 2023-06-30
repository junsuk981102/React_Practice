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
        <div
          style={{
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
