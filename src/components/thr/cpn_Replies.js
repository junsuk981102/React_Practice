import React, { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";

const Reply = ({ threadId, userObj, addReply, reply }) => {
  const [newReply, setNewReply] = useState(""); //1-depth reply
  const [new2DepthReply, setNew2DepthReply] = useState(""); // 2-depth reply를 추가하는 입력 폼 상태

  const onReplySubmit = async (e) => {
    e.preventDefault();

    if (!userObj) {
      // If the user is not logged in, do nothing
      return;
    }

    const threadRef = doc(db, "threads", threadId);
    const repliesRef = collection(threadRef, "replies");

    // Create a new reply document with the text and timestamp
    const newReplyDoc = {
      text: newReply,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      creatorEmail: userObj.email,
    };

    try {
      // Add the new reply to the repliesRef collection
      const docRef = await addDoc(
        collection(threadRef, "replies"),
        newReplyDoc
      );
      // Add the reply to the local state
      addReply({ id: docRef.id, ...newReplyDoc });

      // Update the parent thread's repliesCount field
      await updateDoc(threadRef, {
        repliesCount: increment(1),
      });

      // Clear the reply input field
      setNewReply("");
    } catch (error) {
      console.error("Error adding reply: ", error);
    }
  };

  const add2DepthReply = async (replyId, reply) => {
    const threadRef = doc(db, "threads", threadId);
    const replyRef = doc(db, "threads", threadId, "replies", replyId);
    const depth2RepliesRef = collection(replyRef, "replies");

    // Create a new 2-depth reply document with the text and timestamp
    const new2DepthReplyDoc = {
      text: reply,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      creatorEmail: userObj.email,
    };

    try {
      // Add the new 2-depth reply to the depth2RepliesRef collection
      await addDoc(depth2RepliesRef, new2DepthReplyDoc);
    } catch (error) {
      console.error("Error adding 2-depth reply: ", error);
    }
  };

  const onReplyChange = (e) => {
    const { value } = e.target;
    setNewReply(value);
  };

  const on2DepthReplyChange = (e) => {
    const { value } = e.target;
    setNew2DepthReply(value);
  };

  return (
    <>
      <form onSubmit={onReplySubmit}>
        <FormControl>
          <Input
            type="text"
            placeholder="Reply to this thread"
            value={newReply}
            required
            onChange={onReplyChange}
          />
          <Button type="submit" mt="2">
            Reply
          </Button>
        </FormControl>
      </form>
      {reply && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              add2DepthReply(reply.id, new2DepthReply);
              setNew2DepthReply("");
            }}
          >
            <FormControl mt="4">
              <Input
                type="text"
                placeholder="Reply to this reply (2-depth reply)"
                value={new2DepthReply}
                required
                onChange={on2DepthReplyChange}
              />
              <Button type="submit" mt="2">
                Reply
              </Button>
            </FormControl>
          </form>
        </>
      )}
      {/* Render 1-depth replies here */}
      {reply &&
        reply.replies &&
        reply.replies.map((reply) => (
          <Box
            key={reply.id}
            borderWidth="1px"
            borderRadius="md"
            p="4"
            mt="4"
            ml="4"
          >
            <Flex align="center">
              <Text fontWeight="bold">{reply.creatorName}</Text>
              <Text ml="2" color="gray.500">
                {reply.creatorEmail}
              </Text>
            </Flex>
            <Text ml="2">{reply.text}</Text>
            {/* Additional rendering for reply content */}
            {/* 2-depth 댓글을 표시하는 Reply 컴포넌트 */}
            <Reply
              threadId={threadId}
              userObj={userObj}
              addReply={addReply}
              reply={reply}
            />
          </Box>
        ))}
    </>
  );
};

export default Reply;
