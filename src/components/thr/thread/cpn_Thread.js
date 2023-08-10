import React, { useState, useEffect } from "react";
import {
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { storageService } from "../../../firebase-config";
import { db } from "../../../firebase-config";
import {
  FaHeart,
  FaRegHeart,
  FaEdit,
  FaTrashAlt,
  FaArrowCircleUp,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
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

// Thread 컴포넌트 정의
const Thread = ({ threadObj, isOwner, userObj }) => {
  // 스레드 상태 관리를 위한 변수 및 함수 설정
  const [editing, setEditing] = useState(false); // 스레드 수정 모드
  const [newThread, setNewThread] = useState(threadObj.text); // 수정할 스레드 텍스트
  const [newAttachment, setNewAttachment] = useState(threadObj.attachmentUrl); // 수정할 스레드 첨부 파일
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likesCount, setLikesCount] = useState(threadObj.likes); // 좋아요 수

  //스레드의 주소, 수정할때 updateDoc()에 사용
  const ThreadRef = doc(db, "threads", `${threadObj.id}`);
  const attachmentRef = ref(storageService, threadObj.attachmentUrl);

  //유저 프로필의 디폴트 이미지
  const defaultProfileImage = "/image/user/icon_user.png";

  //스레드의 댓글 창이 열렸는지 상태를 저장하는 변수
  const [isOpen, setIsOpen] = useState(false);
  //스레드의 하위 1-depth replies들을 저장하는 변수
  const [replies, setReplies] = useState([]);
  //?
  const [allReplies, setAllReplies] = useState([]);

  //스레드의 댓글창을 열고 닫는 동작
  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  //스레드 수정창을 열고 닫는 동작
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  //스레드를 삭제하는 동작
  const onDelete = async (e) => {
    const ok = window.confirm("이 스레드를 삭제 하시겠습니까?");
    if (ok) {
      await deleteDoc(ThreadRef);
      if (threadObj.attachmentUrl !== "") {
        console.log("Delete attachment!!");
        console.log(threadObj.attachmentUrl);
        await deleteObject(attachmentRef);
      }
    }
  };

  //스레드 수정 제출 동작
  const onSubmit = async (e) => {
    e.preventDefault();
    let updatedAttachmentUrl = threadObj.attachmentUrl;

    // 첨부 파일이 변경되었을 경우에만 처리
    if (newAttachment !== threadObj.attachmentUrl) {
      // 이전 첨부 파일 삭제 로직 추가
      if (threadObj.attachmentUrl !== "") {
        const attachmentRef = ref(storageService, threadObj.attachmentUrl);
        await deleteObject(attachmentRef);
      }

      // 새로운 첨부 파일 업로드
      if (newAttachment !== "") {
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(
          attachmentRef,
          newAttachment,
          "data_url"
        );
        updatedAttachmentUrl = await getDownloadURL(response.ref);
      }
    }

    // 스레드 업데이트
    await updateDoc(ThreadRef, {
      text: newThread,
      attachmentUrl: updatedAttachmentUrl,
    });

    setEditing(false);
  };

  //스레드의 Text 상태 변화를 감지하고 변경하는 동작
  const onChange = (e) => {
    const { value } = e.target;
    setNewThread(value);
  };

  //스레드의 파일 상태 변화를 감지하고 변경하는 동작
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const thrFile = files[0];

    // 파일이 선택되지 않았을 경우에 처리.
    if (!thrFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setNewAttachment(result);
    };
    reader.readAsDataURL(thrFile);
  };

  //스레드에 댓글을 추가하는 동작
  const addReply = (reply) => {
    setReplies((prevReplies) => [...prevReplies, reply]);
  };

  //각각 스레드의 댓글을 가져오는 동작
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

  //스레드의 좋아요를 누르는 동작
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
        setLikesCount((prevCount) => prevCount - 1); // likesCount 감소
      }
    } else {
      await updateDoc(threadRef, {
        likes: increment(1),
      });
      setLikesCount((prevCount) => prevCount + 1); // likesCount 증가
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
            {/* 스레드 수정 화면 */}
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
            <FormControl>
              <Input
                type="text"
                placeholder="게시물 수정"
                value={newThread}
                required
                autoFocus
                onChange={onChange}
              />
              <Input type="file" accept="image/*" onChange={onFileChange} />
              <Button
                onClick={onSubmit}
                mt="2"
                size="sm"
                leftIcon={<FaArrowCircleUp />}
              >
                업데이트
              </Button>
            </FormControl>
            <Button
              onClick={toggleEditing}
              mt="2"
              size="sm"
              leftIcon={<MdCancel />}
            >
              취소
            </Button>
          </>
        ) : (
          <>
            {isOpen ? (
              <>
                {/* 스레드 댓글창 열린 화면 */}
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
                  <Text fontSize="l" fontWeight="regular" mb="2">
                    {threadObj.text}
                  </Text>
                  {threadObj.attachmentUrl && (
                    <Image src={threadObj.attachmentUrl} mb="2" />
                  )}
                </Box>
                {/* 스레드의 소유자만 수정,삭제 가능 */}
                {isOwner && (
                  <Flex>
                    <Button
                      onClick={onDelete}
                      mb={2}
                      size="sm"
                      mr="2"
                      leftIcon={<FaTrashAlt />}
                    >
                      삭제
                    </Button>
                    <Button
                      onClick={toggleEditing}
                      mb={2}
                      size="sm"
                      leftIcon={<FaEdit />}
                    >
                      수정
                    </Button>
                  </Flex>
                )}
                <Flex align="center" mt={2} mb={2}>
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
                  <Text fontSize="l" fontWeight="regular" mb="2">
                    {threadObj.text}
                  </Text>
                  {threadObj.attachmentUrl && (
                    <Image src={threadObj.attachmentUrl} mb="2" />
                  )}
                </Box>
                {isOwner && (
                  <Flex>
                    <Button
                      onClick={onDelete}
                      mb={2}
                      size="sm"
                      mr="2"
                      leftIcon={<FaTrashAlt />}
                    >
                      삭제
                    </Button>
                    <Button
                      onClick={toggleEditing}
                      mb={2}
                      size="sm"
                      leftIcon={<FaEdit />}
                    >
                      수정
                    </Button>
                  </Flex>
                )}
                <Flex align="center" mt={2} mb={2}>
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
                {/* 1-depth reply 호출 */}
                <Reply
                  threadId={threadObj.id}
                  userObj={userObj}
                  addReply={addReply}
                  replies={allReplies} // 전체 댓글의 배열을 Reply 컴포넌트로 전달
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

//23.08.10 1차 정리
