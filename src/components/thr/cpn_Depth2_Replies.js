import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  FormControl,
  Flex,
  Image,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const Depth2Reply = ({ threadId, userObj, reply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [depth2Replies, setDepth2Replies] = useState([]);

  const defaultProfileImage = "/image/user/icon_user.png";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "threads", threadId, "replies", reply.id, "replies"),
        orderBy("createdAt", "asc")
      ),
      (snapshot) => {
        const depth2ReplyData = [];
        snapshot.forEach((doc) => {
          depth2ReplyData.push({ id: doc.id, ...doc.data() });
        });
        setDepth2Replies(depth2ReplyData);
      }
    );

    return () => unsubscribe();
  }, [threadId, reply.id]);

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
      await addDoc(
        collection(db, "threads", threadId, "replies", reply.id, "replies"),
        newReply
      );
      setReplyText("");
    } catch (error) {
      console.error("Error adding depth 2 reply:", error);
    }
  };

  return (
    <Box ml="20px">
      <Box
        borderWidth="1px"
        borderRadius="md"
        p="4"
        mt="4"
        w="100%"
        maxW="700px"
      >
        <Box cursor="pointer" onClick={onToggleReplies}>
          <Flex align="center" mb="2">
            <Image
              src={reply.creatorPhotoUrl || defaultProfileImage}
              w="32px"
              h="32px"
              rounded="full"
              mr="2"
              alt="Profile"
            />
            <Text fontWeight="bold">{reply.creatorName}</Text>
            <Text ml="2" color="gray.500">
              {reply.creatorEmail}
            </Text>
          </Flex>
          <Text fontSize="l" fontWeight="regular" mb="2">
            {reply.text}
          </Text>
        </Box>
        {depth2Replies && depth2Replies.length >= 0 && (
          <>
            {userObj && (
              <Box>
                <FormControl as="form" onSubmit={handleAddReply}>
                  <Flex align="center">
                    <Input
                      type="text"
                      placeholder="Write a 2-depth reply"
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
            {showReplies &&
              depth2Replies.map((depth2Reply) => (
                <Box
                  key={depth2Reply.id}
                  ml="20px"
                  borderWidth="1px"
                  borderRadius="md"
                  p="4"
                  mt="4"
                  w="100%"
                  maxW="700px"
                >
                  <Flex align="center" mb="2">
                    <Image
                      src={reply.creatorPhotoUrl || defaultProfileImage}
                      w="32px"
                      h="32px"
                      rounded="full"
                      mr="2"
                      alt="Profile"
                    />
                    <Text>{depth2Reply.creatorName}</Text>
                    <Text ml="2" color="gray.500">
                      {depth2Reply.creatorEmail}
                    </Text>
                  </Flex>
                  <Text fontSize="l" fontWeight="regular" mb="2">
                    {depth2Reply.text}
                  </Text>
                </Box>
              ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Depth2Reply;
