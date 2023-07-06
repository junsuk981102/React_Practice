import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Box, Image, Text } from "@chakra-ui/react";
import Logout from "./cpn_Logout";

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
    <Box
      bg="#f5f8fc"
      borderRadius="25px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      padding="20px"
      width="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="space-between"
        padding="15px"
        width="100%"
      >
        <Image
          src={photo}
          alt="User Profile"
          width="100px"
          borderRadius="50%"
          display="block"
          margin="0 0 15px 0"
          fallbackSrc={defaultProfileImage}
        />
        <Text width="100px" fontSize="18px" fontWeight="bold">
          {userId || "익명의 투자자"}
        </Text>
      </Box>
      <Logout />
    </Box>
  );
};

export default User;
