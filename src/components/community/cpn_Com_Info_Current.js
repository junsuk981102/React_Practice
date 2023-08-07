import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { dbService } from "../../firebase-config";

const ComInfoCurrent = ({ state }) => {
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
    <Flex justifyContent="center" m="100px 0 0 0">
      {/* 커뮤니티 참여인원 */}
      <Flex
        alignItems="center"
        justifyContent="center"
        w="120px"
        h="30px"
        bg="#E5F2F2"
        border="1px solid black"
        borderRadius="xl"
        fontSize="md"
      >
        {member}명 참여중
      </Flex>
    </Flex>
  );
};

export default ComInfoCurrent;

//23.07.27 1차 코드 수정
