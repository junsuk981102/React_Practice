import Login from "./cpn_Login";
import Logout from "./cpn_Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";

const User = () => {
  const [user] = useAuthState(auth);

  const defaultProfileImage = "/image/user.png"; // 기본 디폴트 이미지 경로
  const photo = user?.photoURL || defaultProfileImage;
  const name = user?.displayName;

  return (
    <div
      style={{
        padding: "15px",
        width: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <article
        style={{
          // border: "1px solid #d4d3d3",
          // borderRadius: "25px",
          //backgroundColor: "#f5f8fc",
          backgroundColor: "#E5F2F2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          width: "100%",
        }}
      >
        <img
          src={photo}
          alt="User Profile"
          style={{
            width: "90px",
            borderRadius: "50%",
            display: "block",
          }}
          onError={(e) => {
            e.target.src = defaultProfileImage;
          }}
        />
        <p style={{ fontWeight: "500" }}>{name || ""}</p>
        <h3
          style={{
            textAlign: "center",
            fontSize: "35px",
            fontWeight: "bold",
          }}
        >
          로그인
        </h3>
        {user ? <Logout /> : <Login />}
      </article>
    </div>
  );
};

export default User;
