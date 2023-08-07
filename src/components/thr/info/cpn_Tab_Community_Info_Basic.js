import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { dbService } from "../../../firebase-config";

const TabCommunityInfoBasic = ({ state }) => {
  // com_createAt을 YYYY-MM-DD 형식으로 출력
  const timestamp = state.com_createAt;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}년 ${month}월 ${day}일`;
  const [member, setMember] = useState(state.com_member);

  useEffect(() => {
    const communityUid = state.id;
    const communityDocRef = dbService
      .collection("community_list")
      .doc(communityUid);

    const unsubscribe = communityDocRef.onSnapshot((doc) => {
      if (doc.exists) {
        const newData = doc.data();
        setMember(newData.com_member);
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the real-time updates when component unmounts
    };
  }, [state.id]);

  return (
    <>
      {/* 커뮤니티 기본 정보 섹션 */}
      {/* 커뮤니티 생성일 */}
      <Text mb="30px">커뮤니티 생성일 : {formattedDate}</Text>
      {/* 커뮤니티 참여인원 */}
      <Text mb="30px">커뮤니티 참여인원 : {member}명</Text>
    </>
  );
};

export default TabCommunityInfoBasic;
