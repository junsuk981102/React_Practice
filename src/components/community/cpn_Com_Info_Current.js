import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { dbService } from "../../firebase-config";

const ComInfoCurrent = ({ state }) => {
  const [member, setMember] = useState(state.com_member);
  //state.com_member의 값이 바뀔 때마다 업데이트
  useEffect(() => {
    const communityDocRef = dbService
      .collection("community_list")
      .doc(state.id);
    const unsubscribe = communityDocRef.onSnapshot((doc) => {
      if (doc.exists) {
        const newData = doc.data();
        setMember(newData.com_member);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [state.id]);

  return (
    <Flex justifyContent="center" mt="100px">
      {/* 커뮤니티 참여인원 */}
      <Flex
        alignItems="center"
        justifyContent="center"
        w="120px"
        h="30px"
        bg="#E5F2F2"
        border="1px solid black"
        borderRadius="xl"
      >
        {member}명 참여중
      </Flex>
    </Flex>
  );
};

export default ComInfoCurrent;

//23.07.27 1차 코드 수정
