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
      display="flex"
      alignItems="center"
      flexDirection="column"
      bg="white"
      borderRadius="lg"
      p="35px"
    >
      <Box width="100%">
        <Image
          src={photo}
          alt="User Profile"
          w="100px"
          borderRadius="50%"
          mb="15px"
          fallbackSrc={defaultProfileImage}
        />
        <Text w="100px" fontSize="lg" fontWeight="bold">
          {userId || "익명의 투자자"}
        </Text>
      </Box>
      <Logout />
    </Box>
  );
};

export default User;
