// Reply.js
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
import { Box, Button, Flex, FormControl, Input } from "@chakra-ui/react";

const Reply = ({ threadId, userObj, addReply }) => {
  const [newReply, setNewReply] = useState("");

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

  const onReplyChange = (e) => {
    const { value } = e.target;
    setNewReply(value);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p="4" mt="4" w="100%" maxW="700px">
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
    </Box>
  );
};

export default Reply;
