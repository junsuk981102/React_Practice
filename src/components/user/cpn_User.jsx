import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../../firebase-config";
import Logout from "./cpn_Logout";
import FavorCommunity from "./cpn_User_Favor_Community";
import FavorStartup from "./cpn_User_Favor_Startup";
import FavorVC from "./cpn_User_Favor_VC";
import { Image, Text, Grid, Heading, Flex } from "@chakra-ui/react";

const User = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [userId, setUserId] = useState("");
  const defaultProfileImage = "/image/user/icon_user.png"; // 기본 디폴트 이미지 경로
  const photo = user?.photoURL || defaultProfileImage;
  const name = user?.displayName;
  const id = user?.id;
  const [userData, setUserData] = useState(null);
  const [startups, setStartups] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [vcs, setVCs] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(dbService, "user_list", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserId(userData.id);
          // userData에는 startupUids, communityUids, vcUids가 들어있습니다.
          setUserData(userData);
        }
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (userData) {
      // 한 번에 모든 데이터 가져오기
      const fetchAllData = async () => {
        const communityDocs = await Promise.all(
          userData.communityUids.map(async (communityUid) => {
            const communityRef = doc(dbService, "community_list", communityUid);
            const communitySnapshot = await getDoc(communityRef);
            return communitySnapshot.exists()
              ? { id: communityUid, ...communitySnapshot.data() }
              : null;
          })
        );
        const startupDocs = await Promise.all(
          userData.startupUids.map(async (startupUid) => {
            const startupRef = doc(dbService, "startup_list", startupUid);
            const startupSnapshot = await getDoc(startupRef);
            return startupSnapshot.exists()
              ? { id: startupUid, ...startupSnapshot.data() }
              : null;
          })
        );
        const vcDocs = await Promise.all(
          userData.vcUids.map(async (vcUid) => {
            const vcRef = doc(dbService, "vc_list", vcUid);
            const vcSnapshot = await getDoc(vcRef);
            return vcSnapshot.exists()
              ? { id: vcUid, ...vcSnapshot.data() }
              : null;
          })
        );
        // null 값 제거하여 중복 데이터 방지
        const filteredStartups = startupDocs.filter((doc) => doc !== null);
        const filteredCommunities = communityDocs.filter((doc) => doc !== null);
        const filteredVCs = vcDocs.filter((doc) => doc !== null);
        // 상태 업데이트
        setStartups(filteredStartups);
        setCommunities(filteredCommunities);
        setVCs(filteredVCs);
      };
      fetchAllData();
    }
  }, [userData]);

  const renderCommunityCards = () => {
    return communities.map((community) => (
      <FavorCommunity
        key={community.id}
        id={community.id}
        com_profileImg={community.com_profileImg}
        com_name={community.com_name}
      />
    ));
  };
  const renderStartupCards = () => {
    return startups.map((startup) => (
      <FavorStartup
        key={startup.id}
        id={startup.id}
        sup_logo={startup.sup_logo}
        sup_name={startup.sup_name}
      />
    ));
  };
  const renderVCCards = () => {
    return vcs.map((vc) => (
      <FavorVC
        key={vc.id}
        id={vc.id}
        vc_logo={vc.vc_logo}
        vc_name={vc.vc_name}
      />
    ));
  };

  return (
    <Flex flexDirection="column" w="700px">
      <Heading m="30px 0" size="lg">
        마이페이지
      </Heading>
      <Flex flexDirection="column" p="35px" bg="white" borderRadius="xl">
        <Flex w="100%">
          <Image
            src={photo}
            fallbackSrc={defaultProfileImage}
            w="100px"
            m="0 40px 15px 0"
            borderRadius="50%"
          />
          <Flex flexDirection="column">
            <Text fontSize="lg" fontWeight="bold">
              {userId || "익명의 투자자"}
            </Text>
            <Logout />
          </Flex>
        </Flex>
        <Heading size="md" mb="10px">
          즐겨찾기
        </Heading>
        <Flex flexDirection="column">
          <Text mb="5px">커뮤니티</Text>
          <Grid templateColumns="repeat(6, 1fr)" gap="20px">
            {renderCommunityCards()}
          </Grid>
          <Text m="5px 0">스타트업</Text>
          <Grid templateColumns="repeat(6, 1fr)" gap="20px">
            {renderStartupCards()}
          </Grid>
          <Text m="5px 0">VC</Text>
          <Grid templateColumns="repeat(6, 1fr)" gap="20px">
            {renderVCCards()}
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default User;

//23.07.24 1차 코드 수정 완료(추가 수정 필수)

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
