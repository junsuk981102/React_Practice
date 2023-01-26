import Login from './cpn_Login'
import Logout from './cpn_Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';

const User = () => {
    const [user] = useAuthState(auth);

    const photo = user ? user.photoURL : "/userImage.png";
    const name = user ? user.displayName : "Name User";
    return ( 
        <div className='right-side'>
            <h1><i className="fa-solid fa-cat"></i>ScreenLog 페이지입니다.</h1>
            <article className='card-user'>
                <img src={photo} alt="user default" />
                <p>{name}</p>
                { user ? <Logout/> : <Login/> }
            </article>
        </div>
    );
}
 
export default User;