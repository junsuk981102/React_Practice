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
          console.log("Startup Uids:", userData.startupUids || []);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // const fetchStartups = async () => {
  //   if (startupUids.length > 0) {
  //     console.log("startup Uid length is more than 3!!");
  //     try {
  //       const startupsQuery = query(
  //         collection(dbService, "startup_list"),
  //         where("id", "in", startupUids)
  //       );

  //       const startupsSnapshot = await getDocs(startupsQuery);
  //       const startupArray = startupsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       if (startupArray.length > 0) {
  //         console.log("Startup Array:", startupArray);
  //         setStartups(startupArray);
  //       } else {
  //         console.log("No startups found for any uid.");
  //         // 스타트업이 하나도 없을 때 처리할 로직 추가
  //         // 예를 들어, 기본값을 설정하거나 사용자에게 알리는 메시지 표시 등
  //       }
  //     } catch (error) {
  //       console.error("Error fetching startups:", error);
  //     }
  //   } else {
  //     setStartups([]); // startupUids가 비어있을 때, startups를 빈 배열로 설정하여 초기화
  //     console.log("startup Uid length is less than 3");
  //   }
  // };

  // fetchStartups();

  // startupUids를 이용하여 데이터를 가져오는 함수
  const fetchStartupData = async (startupUid) => {
    try {
      const startupRef = doc(dbService, "startup_list", startupUid);
      const startupSnapshot = await getDoc(startupRef);

      if (startupSnapshot.exists()) {
        const startupData = startupSnapshot.data();
        console.log("Startup Data for", startupUid, ":", startupData);
        setStartups((prevStartups) => [
          ...prevStartups,
          { id: startupUid, ...startupData },
        ]);
      } else {
        console.log("No Startup Found for uid:", startupUid);
      }
    } catch (error) {
      console.error("Error fetching startup data for uid:", startupUid, error);
    }
  };

  // startupUids에 있는 모든 startupUid에 대해 데이터 가져오기
  useEffect(() => {
    if (startupUids.length > 0) {
      console.log("startup Uid length is more than 0!!");
      startupUids.forEach(fetchStartupData);
    } else {
      console.log("startup Uid length is 0");
    }
  }, [startupUids]);

  const renderStartupCards = () => {
    return startups.map((startup) => (
      <Box
        key={startup.id}
        p="10px"
        m="10px"
        w="150px" // 카드의 너비를 조절합니다.
        h="150px" // 카드의 높이를 조절합니다.
        borderWidth="1px"
        borderRadius="lg"
        borderColor="black"
        display="flex"
        flexDirection="column"
        alignItems="center"
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
