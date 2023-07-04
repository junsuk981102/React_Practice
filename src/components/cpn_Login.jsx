import { useState } from "react";
import { auth } from "../firebase-config";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        console.log("로그인 성공:", user);
      })
      .catch((error) => {
        // 로그인 실패 처리
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("로그인 실패:", errorCode, errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
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
          <i className="fa-brands fa-google"></i>
          Sign in with Google
        </button>
      </div>
    </form>
  );
};

export default Login;
