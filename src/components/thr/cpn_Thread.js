import React, { useState } from "react";
import { deleteDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "../../firebase-config";
import { db } from "../../firebase-config";
import {
  Flex,
  Text,
  Box,
  Button,
  FormControl,
  Image,
  Input,
} from "@chakra-ui/react";

const Thread = ({ threadObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newThread, setNewThread] = useState(threadObj.text);
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
        </>
      )}
    </Flex>
  );
};
export default Thread;
