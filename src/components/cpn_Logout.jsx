import { auth } from '../firebase-config';

const Logout = () => {
    const signOut = () => {
        signOut(auth);
    }
    
    return ( 
        <>
            <h3>ScreenLogOut 페이지입니다.</h3>
            <button 
                onClick={() => auth.signOut()}
                className='btn-login btn-logout'
            >
                <i className="fa-brands fa-google"></i>
                Logout
            </button>
        </>
    );
}
    
export default Logout;
