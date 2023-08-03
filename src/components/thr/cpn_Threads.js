import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  onSnapshot,
  orderBy,
  getDocs,
  query,
} from "firebase/firestore";
import Thread from "./cpn_Thread";
import ThreadCreator from "./cpn_Thread_Creator";
import { Box } from "@chakra-ui/react";

const Threads = ({ userObj }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "threads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const threadArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setThreads(threadArr);
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, []);

  /*
  const getThreads = async () => {
    try {
      const q = query(collection(db, "threads"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot || querySnapshot.empty) {
        console.log("쓰레드가 없습니다.");
        return;
      }

      const threadArr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setThreads(threadArr);
    } catch (error) {
      console.error("쓰레드를 불러오는 중 오류가 발생했습니다:", error);
    }
  };
  */

  return (
    <Box>
      <ThreadCreator userObj={userObj} />
      <Box>
        {threads.map((thread) => (
          <Thread
            key={thread.id}
            userObj={userObj}
            threadObj={thread}
            isOwner={thread.creatorId === userObj.uid}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Threads;
