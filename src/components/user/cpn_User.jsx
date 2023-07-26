import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../../firebase-config";
import Logout from "./cpn_Logout";
import { Box, Image, Text, Grid, Heading, Flex } from "@chakra-ui/react";

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
      <Flex
        key={startup.id}
        //정렬
        flexDirection="column"
        alignItems="center"
        //크기 및 여백
        w="150px"
        h="150px"
        p="10px"
        m="10px"
        //배경
        border="1px solid black"
        borderRadius="lg"
      >
        <Image
          //사진 위치
          src={startup.sup_logo}
          //크기
          w="100px"
          //배경
          borderRadius="lg"
        />
        <Text
          //글자
          fontSize="md"
          fontWeight="bold"
        >
          {startup.sup_name}
        </Text>
      </Flex>
    ));
  };

  const defaultProfileImage = "/image/user/icon_user.png"; // 기본 디폴트 이미지 경로
  const photo = user?.photoURL || defaultProfileImage;
  const name = user?.displayName;
  const id = user?.id;

  return (
    <Flex
      //정렬
      flexDirection="column"
      //크기
      w="700px"
    >
      <Heading
        //여백
        marginY="30px"
        //글자
        size="lg"
      >
        마이페이지
      </Heading>
      <Flex
        //정렬
        flexDirection="column"
        alignItems="center"
        //크기 및 여백
        p="35px"
        //배경
        bg="white"
        borderRadius="xl"
      >
        <Box
          //크기
          w="100%"
        >
          <Image
            //사진 위치
            src={photo}
            fallbackSrc={defaultProfileImage}
            //크기 및 여백
            w="100px"
            mb="15px"
            //배경
            borderRadius="50%"
          />
          <Text
            //글자
            fontSize="lg"
            fontWeight="bold"
          >
            {userId || "익명의 투자자"}
          </Text>
        </Box>
        <Grid
          //형식
          gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          gap="20px"
        >
          {renderStartupCards()}
        </Grid>
        <Logout />
      </Flex>
    </Flex>
  );
};

export default User;

//23.07.24 1차 코드 수정 완료(추가 수정 필수)