import Logout from "./cpn_Logout";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const User = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      if (user) {
        const userRef = doc(db, "user_list", user.uid);
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUserId(userData.id);
        }
      }
    };

    fetchUserId();
  }, [user]);

  const defaultProfileImage = "/image/user.png"; // 기본 디폴트 이미지 경로
  const photo = user?.photoURL || defaultProfileImage;
  const name = user?.displayName;
  const id = user?.id;

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
          // backgroundColor: "#f5f8fc",
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
        <p style={{ fontWeight: "500" }}>{userId || "유저이름"}</p>
        <Logout />
      </article>
    </div>
  );
};

export default User;
