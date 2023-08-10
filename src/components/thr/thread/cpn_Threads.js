import React, { useState, useEffect } from "react";
import { db } from "../../../firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Thread from "./cpn_Thread";
import ThreadCreator from "./cpn_Thread_Creator";
import { Box } from "@chakra-ui/react";

const Threads = ({ userObj }) => {
  //스레드들을 저장하는 변수
  const [threads, setThreads] = useState([]);

  //firebase에서 스레드들을 불러오는 동작
  useEffect(() => {
    //스레드들을 생성일자 기준으로 내림차순 정렬하여 불러옴
    const q = query(collection(db, "threads"), orderBy("createdAt", "desc"));

    //데이터베이스의 변경 사항을 실시간으로 감지하는 함수
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // 불러온 문서들을 배열 형태로 매핑
      const threadArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //스레드 배열 업데이트
      setThreads(threadArr);
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, []);

  return (
    <Box>
      {/* 스레드 생성 컴포넌트 */}
      <ThreadCreator userObj={userObj} />
      <Box>
        {/* 스레드 컴포넌트 호출 */}
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

//23.08.09 1차 코드 정리
