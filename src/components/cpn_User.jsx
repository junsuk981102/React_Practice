import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { dbService } from "../firebase-config";
import { Box, Image, Text, Grid } from "@chakra-ui/react";
import Logout from "./cpn_Logout";

const User = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [userId, setUserId] = useState("");
  const [startupUids, setStartupUids] = useState([]);
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(dbService, "user_list", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserId(userData.id);
          setStartupUids(userData.startupUids || []);
        }
      }
    };

    const fetchStartups = async () => {
      if (startupUids.length > 0) {
        const startupsQuery = query(
          collection(dbService, "startup_list"),
          where("id", "in", startupUids)
        );
        const startupsSnapshot = await getDocs(startupsQuery);
        const startupArray = startupsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStartups(startupArray);
      } else {
        setStartups([]); // startupUids가 비어있을 때, startups를 빈 배열로 설정하여 초기화
      }
    };

    fetchUserData();
    fetchStartups();
  }, [user, startupUids]);

  const renderStartupCards = () => {
    return startups.map((startup) => (
      <Box
        key={startup.id}
        p="10px"
        m="10px"
        h="30px"
        w="30px"
        borderWidth="1px"
        borderRadius="lg"
      >
        <Image
          src={startup.sup_logo}
          alt="Startup Logo"
          w="100px"
          borderRadius="lg"
        />
        <Text fontSize="md" fontWeight="bold">
          {startup.sup_name}
        </Text>
      </Box>
    ));
  };

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
      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
        gap="20px"
      >
        {renderStartupCards()}
      </Grid>
      <Logout />
    </Box>
  );
};

export default User;
