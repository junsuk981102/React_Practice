import { auth } from "../firebase-config";

const Logout = () => {
  return (
    <>
      <button onClick={() => auth.signOut()} className="btn-login btn-logout">
        <i className="fa-brands fa-google"></i>
        Logout
      </button>
    </>
  );
};

export default Logout;
