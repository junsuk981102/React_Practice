import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Text, Image } from "@chakra-ui/react";

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
      <Box maxW="80%">
        <Text className="user">{message.userName}</Text>
        <Box className="text-message">
          <Text className="text">{message.text}</Text>
        </Box>
        <Box className="user">{`${newDate} . ${time}`}</Box>
      </Box>
      <Image src={message.photo || defaultProfileImage} alt="user profile" />
    </article>
  );
};

export default MessageFormat;
