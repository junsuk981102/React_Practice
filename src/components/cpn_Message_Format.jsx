import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const MessageFormat = ({ message }) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const defaultProfileImage = "/image/user.png"; // 기본 디폴트 이미지 경로
  const photo = user?.photoURL || defaultProfileImage;

  let newStyles = "";
  if (auth.currentUser) {
    if (message.uid === auth.currentUser.uid) {
      newStyles = "my-message";
    } else {
      newStyles = "message";
    }
  } else {
    newStyles = "message";
  }

  const date = new Date(message.timestamp?.seconds * 1000);
  const options = {
    month: "long",
    day: "numeric",
  };
  let h = date.getHours();
  let m = date.getMinutes();
  let time = h + ":" + m;

  const newDate = date.toLocaleDateString("en-US", options);
  return (
    <article className={newStyles}>
      <div
        style={{
          maxWidth: "80%", // 채팅 버블의 전체 넓이가 채팅창의 80%까지만 차지하도록
        }}
      >
        <p className="user">{message.userName}</p>
        <div className="text-message">
          <p className="text">{message.text}</p>
        </div>
        <p className="user">{`${newDate} . ${time}`}</p>
      </div>
      <img src={message.photo || defaultProfileImage} alt="user profile" />
    </article>
  );
};

export default MessageFormat;
