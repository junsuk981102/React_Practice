import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorModal from "../../components/community/cpn_Error_Modal";
import ComInfoBasic from "../../components/community/cpn_Com_Info_Basic";
import ComInfoCurrent from "../../components/community/cpn_Com_Info_Current";
import ComInfoFavor from "../../components/community/cpn_Com_Info_Favor";
import ComInfoInvest from "../../components/community/cpn_Com_Info_Invest";
import ComInfoTicket from "../../components/community/cpn_Com_Info_Ticket";
import {
  Box,
  Button,
  Heading,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";

const ScreenRoomInfo = () => {
  const { state } = useLocation();
  const navi = useNavigate();

  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); // 양쪽 여백

  const [ownerCount, setOwnerCount] = useState(state.com_owner); //티켓 소유 갯수

  const handleClick_sell = (sellCount) => {
    setOwnerCount(ownerCount + sellCount); // ownerCount를 증가시킴
  };

  const [isOpen, setIsOpen] = useState(false);

  let comCategory = [];
  if (typeof state.com_category === "string") {
    comCategory = state.com_category.split(",");
  } else if (Array.isArray(state.com_category)) {
    comCategory = state.com_category;
  } else {
    console.error("Invalid category format");
  }

  const handleClick_chat = () => {
    if (ownerCount === 0) {
      //티켓 X => Modal 팝업
      setIsOpen(true);
    } else {
      //티켓 O => 채팅방 이동
      navi(`/screen_chat`, {
        state: {
          id: state.id,
          com_name: state.com_name,
          com_createAt: state.com_createAt,
          com_category: comCategory,
          com_info: state.com_info,
          com_total_investment: state.com_total_investment,
          com_now_investment: state.com_now_investment,
          com_ticket_price: state.com_ticket_price,
          com_ticket_max: state.com_ticket_max,
          com_member: state.com_member,
          com_profileImg: state.com_profileImg,
          com_owner: state.com_owner,
          com_favorite1: state.com_favorite1,
          com_favorite2: state.com_favorite2,
          com_favorite3: state.com_favorite3,
        },
      });
    }
  };

  return (
    <>
      {/* 채팅방 정보 전체 화면 */}

      {/* 채팅방 정보 전체 배경 화면 */}
      <Box
        //크기 및 여백
        h="auto"
        pb="200px"
        px={boxPadding}
        //배경
        bg="#E5F2F2"
        borderTop="1px solid #00A29D"
      >
        {/* 제목 섹션 */}
        <Heading
          //여백
          marginY="30px"
          //글자
          size="lg"
        >
          커뮤니티 소개
        </Heading>

        {/* 정보 섹션 */}
        <Box
          //크기 및 여백
          w="900px"
          h="auto"
          p="30px"
          //배경
          bg="white"
          border="3px solid #00A29D"
          borderRadius="xl"
        >
          <ComInfoBasic state={state} />

          {/* 커뮤니티 투자 금액 섹션 */}
          <ComInfoInvest state={state} />

          {/* 커뮤니티 티켓 구매 & 관심회사 섹션 */}
          <Flex
            //정렬
            justifyItems="center"
            //여백
            mt="120px"
            ml="20px"
          >
            <ComInfoTicket
              state={state}
              ownerCount={ownerCount}
              onClickSell={handleClick_sell}
            />
            {/* 관심회사 섹션 */}
            <ComInfoFavor />
          </Flex>

          {/* 커뮤니티 현황 섹션 */}
          <ComInfoCurrent state={state} />

          {/* 커뮤니티 참여 섹션 */}
          <Flex justifyContent="center" p="20px">
            <Button
              w="600px"
              h="60px"
              bg={ownerCount > 0 ? "#00A29D" : "grey"}
              borderRadius="xl"
              variant="none"
              fontSize="lg"
              fontWeight="bold"
              color="white"
              onClick={handleClick_chat}
            >
              커뮤니티 참여하기
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* 에러메시지 Modal */}
      <ErrorModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ScreenRoomInfo;

//23.07.25 1차 코드 수정 완료
