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
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase-config";
import { FaTrashAlt } from "react-icons/fa";

const Depth2Reply = ({ threadId, userObj, reply }) => {
  // 2-depth replies의 댓글을 보여줄지 여부를 결정하는 상태 변수
  const [showReplies, setShowReplies] = useState(false);
  //사용자가 입력한 댓글 내용을 저장하는 상태 변수
  const [replyText, setReplyText] = useState("");
  //현재 댓글에 대한 2-depth replies를 저장하는 배열 상태 변수
  const [depth2Replies, setDepth2Replies] = useState([]);

  //유저 프로필 디폴트 이미지
  const defaultProfileImage = "/image/user/icon_user.png";

  //db에서 2-dpeth replies를 가져오는 동작
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

  //1-depth replies에서 2-depth replies 댓글창을 여는 동작
  const onToggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  // 1-depth replies 추가 동작
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
      creatorPhotoUrl: userObj.photoURL,
      text: replyText,
    };

    try {
      await addDoc(
        collection(db, "threads", threadId, "replies", reply.id, "replies"),
        newReply
      );
      setReplyText(""); //댓글 내용 초기화
    } catch (error) {
      console.error("Error adding depth 2 reply:", error);
    }
  };

  //1-depth reply 삭제 동작
  const onDeleteReply = async (replyId) => {
    if (!userObj) {
      return;
    }

    const replyRef = doc(db, "threads", threadId, "replies", replyId);

    try {
      await deleteDoc(replyRef);
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  //2-depth reply 삭제 동작
  const onDeleteDepth2Reply = async (depth2ReplyId) => {
    if (!userObj) {
      return;
    }

    const depth2ReplyRef = doc(
      db,
      "threads",
      threadId,
      "replies",
      reply.id,
      "replies",
      depth2ReplyId
    );

    try {
      await deleteDoc(depth2ReplyRef);
    } catch (error) {
      console.error("Error deleting depth 2 reply:", error);
    }
  };

  return (
    <Box ml="20px">
      {/* 2-depth replies의 정보를 표시하는 Box 컴포넌트 */}
      <Box
        borderWidth="1px"
        borderRadius="md"
        p="4"
        mt="4"
        w="100%"
        maxW="700px"
      >
        {/* 댓글 부분을 클릭하면 2-depth replies를 토글하여 보여주는 기능 */}
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
          {/* 사용자가 댓글 작성자인 경우에만 댓글 삭제 버튼 표시 */}
          {userObj && userObj.uid === reply.creatorId && (
            <Button
              ml="auto"
              mb={2}
              size="sm"
              leftIcon={<FaTrashAlt />}
              onClick={() => onDeleteReply(reply.id)}
            >
              Delete
            </Button>
          )}
        </Box>
        {/* 2-depth replies가 있고, 토글이 활성화된 경우에만 표시 */}
        {depth2Replies && depth2Replies.length >= 0 && (
          <>
            {/* 새로운 2-depth reply를 작성하는 폼 */}
            {userObj && (
              <Box>
                <FormControl as="form" onSubmit={handleAddReply}>
                  <Flex align="center">
                    <Input
                      type="text"
                      placeholder="의견을 들려주세요!"
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
            {/* 2-depth replies를 맵을 통해 렌더링 */}
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
                  {/* 2-depth reply의 정보 표시 */}
                  <Flex align="center" mb="2">
                    <Image
                      src={depth2Reply.creatorPhotoUrl || defaultProfileImage}
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
                  {/* 사용자가 2-depth reply 작성자인 경우에만 삭제 버튼 표시 */}
                  {userObj && userObj.uid === depth2Reply.creatorId && (
                    <Button
                      ml="auto"
                      size="sm"
                      leftIcon={<FaTrashAlt />}
                      onClick={() => onDeleteDepth2Reply(depth2Reply.id)}
                    >
                      삭제
                    </Button>
                  )}
                </Box>
              ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Depth2Reply;

//23.08.10 1차 정리
