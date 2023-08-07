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
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  Flex,
  Text,
  Box,
  Button,
  Image,
  Input,
  FormControl,
} from "@chakra-ui/react";
import Reply from "./cpn_Replies";

const Thread = ({ threadObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newThread, setNewThread] = useState(threadObj.text);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(threadObj.likes);

  const ThreadTextRef = doc(db, "threads", `${threadObj.id}`);
  const attachmentRef = ref(storageService, threadObj.attachmentUrl);

  const defaultProfileImage = "/image/user/icon_user.png";

  const [isOpen, setIsOpen] = useState(false);
  const [replies, setReplies] = useState([]);
  const [allReplies, setAllReplies] = useState([]);

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

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

  const addReply = (reply) => {
    setReplies((prevReplies) => [...prevReplies, reply]);
  };

  useEffect(() => {
    const q = query(
      collection(db, "threads", threadObj.id, "replies"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const replyData = [];
      querySnapshot.forEach((doc) => {
        replyData.push({ id: doc.id, ...doc.data() });
      });
      setAllReplies(replyData);
    });

    return () => {
      unsubscribe();
    };
  }, [threadObj.id]);

  const onLike = async () => {
    if (!userObj) {
      return;
    }

    const threadRef = doc(db, "threads", threadObj.id);

    if (liked) {
      if (likesCount > 0) {
        await updateDoc(threadRef, {
          likes: increment(-1),
        });
        setLikesCount((prevCount) => prevCount - 1); // 수정: likesCount 감소
      }
    } else {
      await updateDoc(threadRef, {
        likes: increment(1),
      });
      setLikesCount((prevCount) => prevCount + 1); // 수정: likesCount 증가
    }
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="md"
        p="4"
        mt="4"
        w="100%"
        maxW="700px"
      >
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
            {isOpen ? (
              <>
                <Box onClick={togglePopup} cursor="pointer">
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
                  <Text fontSize="xl" fontWeight="bold" mb="2">
                    {threadObj.text}
                  </Text>
                  {threadObj.attachmentUrl && (
                    <Image src={threadObj.attachmentUrl} mb="2" />
                  )}
                </Box>
                {isOwner && (
                  <Flex>
                    <Button onClick={onDelete} mr="2">
                      Delete
                    </Button>
                    <Button onClick={toggleEditing}>Edit</Button>
                  </Flex>
                )}
                <Flex align="center" mt={2}>
                  <Box
                    as="button"
                    onClick={onLike}
                    display="flex"
                    alignItems="center"
                  >
                    {liked ? (
                      <FaHeart color="red" size={24} />
                    ) : (
                      <FaRegHeart color="black" size={24} />
                    )}
                    <Text ml="2">{likesCount}</Text>
                  </Box>
                </Flex>
                {allReplies.length > 0 && (
                  <Box borderWidth="1px" borderRadius="md" p="4" mt="4">
                    <Flex align="center">
                      <Image
                        src={
                          allReplies[0].creatorPhotoUrl || defaultProfileImage
                        }
                        w="32px"
                        h="32px"
                        rounded="full"
                        mr="2"
                        alt="Profile"
                      />
                      <Text fontWeight="bold">{allReplies[0].creatorName}</Text>
                      <Text ml="2" color="gray.500">
                        {allReplies[0].creatorEmail}
                      </Text>
                    </Flex>
                    <Text ml="2">{allReplies[0].text}</Text>
                  </Box>
                )}
              </>
            ) : (
              <>
                <Box onClick={togglePopup} cursor="pointer">
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
                  <Text fontSize="xl" fontWeight="bold" mb="2">
                    {threadObj.text}
                  </Text>
                  {threadObj.attachmentUrl && (
                    <Image src={threadObj.attachmentUrl} mb="2" />
                  )}
                </Box>
                {isOwner && (
                  <Flex>
                    <Button onClick={onDelete} mr="2">
                      Delete
                    </Button>
                    <Button onClick={toggleEditing}>Edit</Button>
                  </Flex>
                )}
                <Flex align="center" mt={2}>
                  <Box
                    as="button"
                    onClick={onLike}
                    display="flex"
                    alignItems="center"
                  >
                    {liked ? (
                      <FaHeart color="red" size={24} />
                    ) : (
                      <FaRegHeart color="black" size={24} />
                    )}
                    <Text ml="2">{likesCount}</Text>
                  </Box>
                </Flex>
                <Reply
                  threadId={threadObj.id}
                  userObj={userObj}
                  addReply={addReply}
                  replies={allReplies} // 수정: 전체 댓글의 배열을 Reply 컴포넌트로 전달
                />
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Thread;
