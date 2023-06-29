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
        margin: "15px",
      }}
    >
      <article
        style={{
          border: "1px solid #d4d3d3",
          borderRadius: "25px",
          backgroundColor: "#f5f8fc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          width: "30vw",
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
        <p style={{ fontWeight: "500" }}>{name || "Please Sign in"}</p>
        {user ? <Logout /> : <Login />}
      </article>
    </div>
  );
};

export default User;