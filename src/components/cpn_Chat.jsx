import React, { useState, useEffect, useRef } from "react";
import MessageFormat from "./cpn_Message_Format";
import { db, auth } from "../firebase-config";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import MessageSend from "./cpn_Message_Send";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const Chat = () => {
  const [message, setMessage] = useState([]);
  const scroll = useRef();
  const [user] = useAuthState(auth);

  const { state } = useLocation();
  const boxRef = useRef(null);

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

  useEffect(() => {
    scrollToBottom(); // 컴포넌트가 처음 렌더링될 때 스크롤을 맨 아래로 이동시킴
  }, []);

  return (
    <Box
      bg="#FFFFFF"
      width="70%"
      margin="0 auto"
      borderRadius="10px"
      padding="30px 30px 0"
      height="80vh"
      overflow="auto"
      ref={boxRef} // <Box> 컴포넌트에 ref 추가
    >
      {message &&
        message.map((item) => <MessageFormat key={item.id} message={item} />)}
      {user && (
        <Box position="sticky" bottom={0} left={0} width="100%">
          <MessageSend scroll={scroll} />
        </Box>
      )}
      <span ref={scroll}></span>
    </Box>
  );
};

export default Chat;
