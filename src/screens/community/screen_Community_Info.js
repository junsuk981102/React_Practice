import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ComInfoBasic from "../../components/community/cpn_Com_Info_Basic";
import ComInfoCurrent from "../../components/community/cpn_Com_Info_Current";
import ComInfoFavor from "../../components/community/cpn_Com_Info_Favor";
import ComInfoInvest from "../../components/community/cpn_Com_Info_Invest";
import ComInfoTicket from "../../components/community/cpn_Com_Info_Ticket";
import ErrorModal from "../../components/community/cpn_Error_Modal";
import {
  Box,
  Flex,
  Heading,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { dbService, auth } from "../../firebase-config";

const ScreenRoomInfo = () => {
  const { state } = useLocation();
  const navi = useNavigate();
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); // 양쪽 여백
  const [isOpen, setIsOpen] = useState(false); //에러 메시지 Modal 오픈
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
    if (userUid) {
      const communityUid = state.id;
      const userColRef = dbService
        .collection("user_list")
        .doc(userUid)
        .collection("ticket_list")
        .doc(communityUid);

      const unsubscribe = userColRef.onSnapshot((doc) => {
        if (doc.exists) {
          const newData = doc.data();
          setUserTicket(newData.ticket);
        }
      });

      return () => {
        unsubscribe(); // Unsubscribe from the real-time updates when component unmounts
      };
    }
  }, [userUid, state.id]);

  let comCategory = [];
  if (typeof state.com_category === "string") {
    comCategory = state.com_category.split(",");
  } else if (Array.isArray(state.com_category)) {
    comCategory = state.com_category;
  } else {
    console.error("Invalid category format");
  }

  const handleClick_chat = () => {
    if (userTicket === 0) {
      //티켓 X => Modal 팝업
      setIsOpen(true);
    } else {
      //티켓 O => 채팅방 이동
      navi(`/screen_chat`, {
        state: {
          id: state.id,
          com_category: comCategory,
          com_createAt: state.com_createAt,
          com_info: state.com_info,
          com_member: state.com_member,
          com_name: state.com_name,
          com_now_investment: state.com_now_investment,
          com_profileImg: state.com_profileImg,
          com_ticket_max: state.com_ticket_max,
          com_ticket_price: state.com_ticket_price,
          com_total_investment: state.com_total_investment,
          com_total_ticket: state.com_total_ticket,
          com_fall: state.com_fall,
          com_fone: state.com_fone,
          com_ftwo: state.com_ftwo,
          com_fthree: state.com_fthree,
          com_sall: state.com_sall,
          com_syes: state.com_syes,
          com_sno: state.com_sno,
        },
      });
    }
  };

  return (
    <>
      {/* 채팅방 정보 전체 화면 */}

      {/* 채팅방 정보 전체 배경 화면 */}
      <Flex
        flexDirection="column"
        h="auto"
        pb="200px"
        px={boxPadding}
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 제목 섹션 */}
        <Heading m="30px 0" size="lg">
          커뮤니티 소개
        </Heading>
        {/* 정보 섹션 */}
        <Box
          w="900px"
          h="auto"
          p="30px"
          bg="white"
          border="2px solid #00A29D"
          borderRadius="xl"
        >
          {/* 커뮤니티 기본 정보 섹션 */}
          <ComInfoBasic state={state} />
          {/* 커뮤니티 투자 금액 섹션 */}
          <ComInfoInvest state={state} />
          {/* 커뮤니티 티켓 & 관심회사 섹션 */}
          <Flex m="120px 0 0 20px">
            {/* 티켓 섹션 */}
            <ComInfoTicket state={state} />
            {/* 관심회사 섹션 */}
            <ComInfoFavor />
          </Flex>
          {/* 커뮤니티 현황 섹션 */}
          <ComInfoCurrent state={state} />
          {/* 커뮤니티 참여 버튼 */}
          <Flex justifyContent="center" p="20px">
            <Button
              w="600px"
              h="60px"
              bg={userTicket > 0 ? "#00A29D" : "lightgrey"}
              borderRadius="xl"
              variant="none"
              fontSize="lg"
              color="white"
              onClick={handleClick_chat}
            >
              커뮤니티 참여하기
            </Button>
          </Flex>
        </Box>
      </Flex>
      {/* 에러메시지 Modal */}
      <ErrorModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ScreenRoomInfo;

//23.07.25 1차 코드 수정 완료
//23.07.27 2차 코드 수정
