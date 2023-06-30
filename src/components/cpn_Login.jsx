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
    <>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        style={{ margin: "5px" }} // margin 추가
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        style={{ margin: "5px" }} // margin 추가
      />
      <button
        className="btn-login"
        onClick={handleEmailLogin}
        style={{ margin: "5px" }} // margin 추가
      >
        Sign in with Email
      </button>
      <p>or</p>
      <button
        className="btn-login"
        onClick={handleGoogleSignIn}
        style={{ margin: "5px" }} // margin 추가
      >
        Sign in with Google
      </button>
    </>
  );
};

export default Login;
