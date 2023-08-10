import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Input, FormControl } from "@chakra-ui/react";
import {
  addDoc,
  query,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase-config";
import Depth2Reply from "./cpn_Depth2_Replies";

const Reply = ({ threadId, userObj, addReply }) => {
  // 2-Depth replies를 표시할지 여부를 저장하는 상태 변수
  const [showReplies, setShowReplies] = useState(false);

  // 댓글 내용을 저장하는 상태 변수
  const [replyText, setReplyText] = useState("");

  // 1-Depth replies 정보를 저장하는 상태 변수
  const [replies, setReplies] = useState([]);

  //db에서 replies 정보 가져오는 동작
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "threads", threadId, "replies"),
        orderBy("createdAt", "asc")
      ),
      (snapshot) => {
        const replyData = [];
        snapshot.forEach((doc) => {
          replyData.push({ id: doc.id, ...doc.data() });
        });
        setReplies(replyData);
      }
    );
    return () => unsubscribe();
  }, [threadId]);

  // 2-Depth replies 표시 여부를 토글하는 동작
  const onToggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  //1-depth replies 추가 동작
  const handleAddReply = async (e) => {
    e.preventDefault();

    // 유저 정보가 없거나 댓글이 비어있을 경우 처리하지 않음
    if (!userObj || !replyText.trim()) {
      return;
    }

    const createdAt = serverTimestamp();
    const newReply = {
      createdAt,
      creatorEmail: userObj.email,
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      creatorPhotoUrl: userObj.photoURL,
      text: replyText,
    };
    try {
      // 새로운 댓글 정보 Firestore에 추가
      await addDoc(collection(db, "threads", threadId, "replies"), newReply);
      setReplyText(""); // 댓글 내용 초기화
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <Box>
      {/* 유저 정보가 있을 경우에만 댓글 입력 폼 표시 */}
      {userObj && (
        <Box>
          <FormControl as="form" onSubmit={handleAddReply}>
            <Flex align="center">
              <Input
                type="text"
                placeholder="당신은 어떻게 생각하나요?"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                w="500px"
              />
              <Button type="submit" colorScheme="teal" ml="2">
                Reply
              </Button>
            </Flex>
          </FormControl>
        </Box>
      )}
      {/* 2-depth reply 표시 */}
      {replies.map((reply) => (
        <Box key={reply.id}>
          <Depth2Reply
            threadId={threadId}
            userObj={userObj}
            reply={reply}
            depth2Replies={reply.replies}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Reply;

//23.08.09 1차 코드 정리
