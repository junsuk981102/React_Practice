import React, { useState, useEffect } from "react";
import {
  deleteDoc,
  onSnapshot,
  getFirestore,
  doc,
  updateDoc,
  increment,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "../../firebase-config";
import { db } from "../../firebase-config";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import {
  Flex,
  Text,
  Box,
  Button,
  FormControl,
  Image,
  Input,
} from "@chakra-ui/react";
import Reply from "./cpn_Replies";

const Thread = ({ threadObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newThread, setNewThread] = useState(threadObj.text);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(threadObj.likes); // 원래 저장되어있던 좋아요 값으로 초기화

  const [replies, setReplies] = useState([]); //replies를 저장하는 Array

  const ThreadTextRef = doc(db, "threads", `${threadObj.id}`);
  const attachmentRef = ref(storageService, threadObj.attachmentUrl);

  const defaultProfileImage = "/image/user/icon_user.png"; // 기본 디폴트 이미지 경로

  const onDelete = async (e) => {
    const ok = window.confirm("이 스레드를 삭제 하시겠습니까?");
    if (ok) {
      await deleteDoc(ThreadTextRef);
      if (threadObj.attachmentUrl !== "") {
        console.log("Delete attachment!!");
        console.log(threadObj.attachmentUrl);
        await deleteObject(attachmentRef);
      }
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(ThreadTextRef, {
      text: newThread,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewThread(value);
  };

  // Function to add a new reply
  const addReply = (reply) => {
    setReplies((prevReplies) => [...prevReplies, reply]);
  };

  useEffect(() => {
    // Firestore에서 해당 thread의 replies 컬렉션 데이터를 시간 순서대로 가져오는 쿼리
    const q = query(
      collection(db, "threads", threadObj.id, "replies"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = getDocs(q).then((querySnapshot) => {
      const replyData = [];
      querySnapshot.forEach((doc) => {
        replyData.push({ id: doc.id, ...doc.data() });
      });
      setReplies(replyData);
    });

    return () => {
      // Cleanup: 컴포넌트가 언마운트되면 Firestore 구독을 정리합니다.
      unsubscribe();
    };
  }, [threadObj.id]);

  const onLike = async () => {
    if (!userObj) {
      // If the user is not logged in, do nothing
      return;
    }

    const threadRef = doc(db, "threads", threadObj.id);

    if (liked) {
      // If already liked, remove the user's like
      if (likesCount > 0) {
        await updateDoc(threadRef, {
          likes: increment(-1),
        });
      }
    } else {
      // If not liked, add the user's like
      await updateDoc(threadRef, {
        likes: increment(1),
      });
    }

    // Toggle the liked state and update the likesCount state
    setLiked((prevLiked) => !prevLiked);
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <Flex
      direction="column"
      borderWidth="1px"
      borderRadius="md"
      p="4"
      mt="4"
      w="100%"
      maxW="700px"
    >
      <Flex align="center" mb="2">
        <Image
          src={threadObj.creatorPhotoUrl || defaultProfileImage}
          w="32px"
          h="32px"
          rounded="full"
          mr="2"
          alt="Profile"
        />
        <Text fontWeight="bold">{threadObj.creatorName}</Text>
        <Text ml="2" color="gray.500">
          {threadObj.creatorEmail}
        </Text>
      </Flex>
      {editing ? (
        <>
          <FormControl>
            <Input
              type="text"
              placeholder="Edit your thread"
              value={newThread}
              required
              autoFocus
              onChange={onChange}
            />
            <Button onClick={onSubmit} mt="2">
              Update thread
            </Button>
          </FormControl>
          <Button onClick={toggleEditing} mt="2">
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Text fontSize="xl" fontWeight="bold" mb="2">
            {threadObj.text}
          </Text>
          {threadObj.attachmentUrl && (
            <Image src={threadObj.attachmentUrl} mb="2" />
          )}
          {isOwner && (
            <Flex>
              <Button onClick={onDelete} mr="2">
                Delete
              </Button>
              <Button onClick={toggleEditing}>Edit</Button>
            </Flex>
          )}
          {/* 좋아요 기능 */}
          <Flex align="center" mt={2}>
            {/* Conditional rendering for heart icon */}
            <Box
              as="button"
              onClick={onLike}
              display="flex"
              alignItems="center"
            >
              {liked ? (
                <FaHeart color="red" size={24} /> // Filled red heart
              ) : (
                <FaRegHeart color="black" size={24} /> // Outlined black heart
              )}
              <Text ml="2">{threadObj.likes}</Text>
            </Box>
          </Flex>
        </>
      )}
      {/* Render the reply component and pass the threadId and userObj props */}
      <Reply threadId={threadObj.id} userObj={userObj} addReply={addReply} />

      {/* Render the list of replies */}
      {replies.map((reply) => (
        <Flex key={reply.id} mt="2" align="center">
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
          <Text ml="2">{reply.text}</Text>
          {/* ... (Additional rendering for reply content) */}
        </Flex>
      ))}
    </Flex>
  );
};
export default Thread;
