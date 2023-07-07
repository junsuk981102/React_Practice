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

  const communityid = state.id;
  const communityaddress = "community_list/" + communityid + "/message";

  useEffect(() => {
    const q = query(collection(db, communityaddress), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessage(messages);
    });
    return () => unsubscribe();
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
