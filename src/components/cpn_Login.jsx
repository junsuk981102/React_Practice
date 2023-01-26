import { auth } from '../firebase-config';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

const Login = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }

  return (
    <>
      <button 
        className='btn-login' 
        onClick={googleSignIn}
      >
        <i className="fa-brands fa-google"></i>
        Sign in with Google
      </button>
    </>
  );
}
 
export default Login;