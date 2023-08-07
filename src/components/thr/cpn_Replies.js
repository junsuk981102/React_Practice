import React, { useState, useEffect } from "react";
import { Box, Text, Button, Flex, Input, FormControl } from "@chakra-ui/react";
import {
  addDoc,
  query,
  collection,
  doc,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Depth2Reply from "./cpn_Depth2_Replies";

const Reply = ({ threadId, userObj, addReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);

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

  const onToggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const handleAddReply = async (e) => {
    e.preventDefault();

    if (!userObj || !replyText.trim()) {
      return;
    }

    const createdAt = serverTimestamp();
    const newReply = {
      createdAt,
      creatorEmail: userObj.email,
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      text: replyText,
    };

    try {
      await addDoc(collection(db, "threads", threadId, "replies"), newReply);
      setReplyText("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <Box>
      {userObj && (
        <Box>
          <FormControl as="form" onSubmit={handleAddReply}>
            <Flex align="center">
              <Input
                type="text"
                placeholder="Write a reply"
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
