import { useState } from "react";
//import { auth } from "../firebase-config";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // 페이지 이동을 처리하기 위해 navigate 변수를 선언
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지를 저장할 상태 변수
  const [user, setUser] = useState("");
  const auth = getAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공 후 처리
        const user = userCredential.user;
      })
      .catch((error) => {
        // 로그인 실패 처리
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
      .then(() => {
        navigate("/"); // 로그인 성공 후 홈 페이지로 이동
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage); // 에러 메시지 업데이트
        console.error("로그인 실패:", errorCode, errorMessage);
      });
  };

  return (
    <form
      style={{
        backgroundColor: "#E5F2F2",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontSize: "35px",
          fontWeight: "bold",
        }}
      >
        로그인
      </h3>
      <hr
        style={{
          backgroundColor: "#00A29D",
          height: "2px",
          margin: "30px 0",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label htmlFor="email" style={{ fontSize: "20px", fontWeight: "bold" }}>
          이메일:
        </label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          style={{
            border: "solid 1px #d4d3d3",
            padding: "14px 12px",
            borderRadius: "6px",
            outline: "none",
            flexGrow: "6",
            maxWidth: "450px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label
          htmlFor="confirmpassword"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          비밀번호:
        </label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
          style={{
            border: "solid 1px #d4d3d3",
            padding: "14px 12px",

            borderRadius: "6px",
            outline: "none",
            flexGrow: "6",

            maxWidth: "450px",
          }}
        />
      </div>
      <div style={{ color: "red", textAlign: "center" }}>{error}</div>{" "}
      {/* 에러 메시지 표시 */}
      <hr
        style={{
          backgroundColor: "#00A29D",
          height: "2px",
          margin: "30px 0",
        }}
      />
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          className="btn-login"
          onClick={handleEmailLogin}
          style={{
            width: "150px",
            height: "75px",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "#00A29D",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Sign in with Email
        </button>
      </div>
      <p>or</p>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          className="btn-login"
          onClick={handleGoogleSignIn}
          style={{
            width: "150px",
            height: "75px",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "#00A29D",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Sign in with Google
        </button>
      </div>
    </form>
  );
};

export default Login;
