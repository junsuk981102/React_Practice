import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ThrInfo from "../../components/thr/cpn_Thr_Info";
import ThrTab from "../../components/thr/cpn_Thr_Tab";
import { Flex } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { dbService, auth } from "../../firebase-config";

function ScreenChat() {
  const { state } = useLocation();
  const [userObj, setUserObj] = useState(null);

  const defaultProfileImage = "/image/user/icon_user.png";
  const [userTicket, setUserTicket] = useState(0);
  const [userUid, setUserUid] = useState("");

  useEffect(() => {
    const getUserUid = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserUid(user.uid);
        }
      } catch (error) {
        console.log("사용자 UID 가져오기 실패:", error);
      }
    };

    getUserUid();
  }, []);

  useEffect(() => {
    const fetchUserTicket = async () => {
      if (userUid) {
        const communityUid = state.id;
        const userColRef = dbService
          .collection("user_list")
          .doc(userUid)
          .collection("ticket_list");
        const userDoc = await userColRef.doc(communityUid).get();
        const fetchedUserTicket = userDoc.data()?.ticket || 0;
        setUserTicket(fetchedUserTicket);
      }
    };
    fetchUserTicket();
  }, [userUid, state.id]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        const photo = user?.photoURL || defaultProfileImage;
        setUserObj(user);
      } else {
        setUserObj(null);
      }
    });
  }, []);

  let comCategory = [];
  if (typeof state.com_category === "string") {
    comCategory = state.com_category.split(",");
  } else if (Array.isArray(state.com_category)) {
    comCategory = state.com_category;
  } else {
    console.error("Invalid category format");
  }

  return (
    <>
      {/* 커뮤니티 전체 화면 */}

      {/* 커뮤니티 전체 화면 배경 */}
      <Flex
        flexDirection="column"
        alignItems="center"
        h="auto"
        pb="200px"
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 커뮤니티 구조 */}
        <Flex
          flexDirection="column"
          w="750px"
          h="auto"
          maxH="1500px"
          m="60px 0 0 0"
          p="0 0 50px 0"
          bg="white"
          border="1px solid black"
        >
          {/* 커뮤니티 정보 섹션 */}
          <ThrInfo state={state} comCategory={comCategory} />
          {/* 커뮤니티 Tab */}
          <ThrTab
            state={state}
            ownerCount={userTicket}
            setOwnerCount={setUserTicket}
            userObj={userObj}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default ScreenChat;

//23.07.27 1차 코드 수정
