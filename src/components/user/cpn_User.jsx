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
  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState("");
  const defaultProfileImage = "/image/user/icon_user.png"; // 기본 디폴트 이미지 경로
  const photo = user?.photoURL || defaultProfileImage;
  const [userData, setUserData] = useState(null);
  const [startups, setStartups] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [vcs, setVCs] = useState([]);

  //user list에 있는 정보 자동 업데이트
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(dbService, "user_list", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserId(userData.id);
          // userData에 startupUids, communityUids, vcUids 포함
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
        //커뮤니티
        const communityDocs = await Promise.all(
          userData.communityUids?.map(async (communityUid) => {
            const communityRef = doc(dbService, "community_list", communityUid);
            const communitySnapshot = await getDoc(communityRef);
            return communitySnapshot.exists()
              ? { id: communityUid, ...communitySnapshot.data() }
              : null;
          }) || []
        );
        //스타트업
        const startupDocs = await Promise.all(
          userData.startupUids?.map(async (startupUid) => {
            const startupRef = doc(dbService, "startup_list", startupUid);
            const startupSnapshot = await getDoc(startupRef);
            return startupSnapshot.exists()
              ? { id: startupUid, ...startupSnapshot.data() }
              : null;
          }) || []
        );
        //VC
        const vcDocs = await Promise.all(
          userData.vcUids?.map(async (vcUid) => {
            const vcRef = doc(dbService, "vc_list", vcUid);
            const vcSnapshot = await getDoc(vcRef);
            return vcSnapshot.exists()
              ? { id: vcUid, ...vcSnapshot.data() }
              : null;
          }) || []
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
      <FavorCommunity key={community.id} communityObj={community} />
    ));
  };
  const renderStartupCards = () => {
    return startups.map((startup) => (
      <FavorStartup key={startup.id} startupObj={startup} />
    ));
  };
  const renderVCCards = () => {
    return vcs.map((vc) => <FavorVC key={vc.id} vcObj={vc} />);
  };

  return (
    <Flex flexDirection="column" w="700px">
      <Heading m="30px 0" size="lg">
        마이페이지
      </Heading>
      <Flex flexDirection="column" p="35px" bg="white" borderRadius="xl">
        {/* 프로필 이미지&아이디&로그아웃 */}
        <Flex w="100%">
          {/* 프로필 이미지 */}
          <Image
            src={photo}
            fallbackSrc={defaultProfileImage}
            w="100px"
            m="0 40px 15px 0"
            borderRadius="50%"
          />
          <Flex flexDirection="column">
            {/* 아이디 */}
            <Text fontSize="lg" fontWeight="bold">
              {userId || "익명의 투자자"}
            </Text>
            {/* 로그아웃 버튼 */}
            <Logout />
          </Flex>
        </Flex>
        {/* 즐겨찾기 리스트 */}
        <Heading size="md" mb="10px">
          즐겨찾기
        </Heading>
        <Flex flexDirection="column">
          <Text m="5px 0">커뮤니티</Text>
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
        <Heading size="md" mb="10px">
          내 자산
        </Heading>
        <Flex flexDirection="column">
          <Text>총 자산</Text>
          <Text></Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default User;

//23.07.24 1차 코드 수정
//23.08.09 2차 코드 수정
