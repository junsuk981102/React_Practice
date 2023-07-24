import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { db, auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import MessageFormat from "./cpn_Message_Format";
import MessageSend from "./cpn_Message_Send";
import { Box } from "@chakra-ui/react";

const Chat = () => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState([]);
  const { state } = useLocation();
  const boxRef = useRef(null);
  const scroll = useRef();

  const communityid = state.id;
  const communityaddress = "community_list/" + communityid + "/message";

  const scrollToBottom = () => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, communityaddress),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.unshift({ ...doc.data(), id: doc.id });
      });
      setMessage(messages);

      // 스크롤을 맨 아래로 이동시키는 작업
      if (boxRef.current) {
        boxRef.current.scrollTop = boxRef.current.scrollHeight;
      }
    });
    return () => unsubscribe();
  }, []);

  // 23.7.13 스크롤 내려가는게 나을지 그냥 두는게 나을지 토른중
  // 아래 봉인을 풀면 채팅방 입장 시 스크롤이 쭉쭉 내려가 버립니다.
  // useEffect(() => {
  //   scrollToBottom(); // 컴포넌트가 처음 렌더링될 때 스크롤을 맨 아래로 이동시킴
  // }, []);

  return (
    <Box
      //크기 및 여백
      w="auto"
      h="70vh"
      pl="30px"
      pr="30px"
      //배경
      bg="#FFFFFF"
      borderRadius="10px"
      overflow="auto"
      ref={boxRef} // <Box> 컴포넌트에 ref 추가
    >
      {message &&
        message.map((item) => <MessageFormat key={item.id} message={item} />)}
      {user && (
        <Box
          //위치
          position="sticky"
          bottom={0}
          left={0}
          //크기
          width="100%"
        >
          <MessageSend scroll={scroll} />
        </Box>
      )}
      <span ref={scroll}></span>
    </Box>
  );
};

export default Chat;
