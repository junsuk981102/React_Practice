import React, { useState, useEffect, useRef } from "react";
import MessageFormat from "./cpn_Message_Format";
import { db, auth } from "../firebase-config";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import MessageSend from "./cpn_Message_Send";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";

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
    <>
      <section
        style={{
          backgroundColor: "#FFFFFF",
          width: "70%",
          margin: "0 auto",
          borderRadius: "10px",
          padding: "30px  30px 0", //상우하좌
          height: "80vh",
          overflow: "auto",
        }}
      >
        {message &&
          message.map((item) => <MessageFormat key={item.id} message={item} />)}
        {user && (
          <div
            style={{
              position: "sticky", // MessageSend 컴포넌트의 위치를 sticky로 설정
              bottom: 0, // 하단 여백 조절
              left: 0, // 왼쪽 정렬
              width: "100%", // 너비를 부모에 맞게 설정
            }}
          >
            <MessageSend scroll={scroll} />
          </div>
        )}
        <span ref={scroll}></span>
      </section>
    </>
  );
};

export default Chat;