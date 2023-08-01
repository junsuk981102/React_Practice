import React, { useState } from "react";
import { deleteDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "../../firebase-config";
import { db } from "../../firebase-config";
import { Box, Button, FormControl, Image, Input } from "@chakra-ui/react";

const Thread = ({ threadObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newThread, setNewThread] = useState(threadObj.text);
  const ThreadTextRef = doc(db, "threads", `${threadObj.id}`);
  const desertRef = ref(storageService, threadObj.attachmentUrl);

  const onDelete = async (e) => {
    const ok = window.confirm("이 스레드를 삭제 하시겠습니까?");
    if (ok) {
      console.log(threadObj.id);
      await deleteDoc(ThreadTextRef);
      if (threadObj.attachmentUrl !== "") {
        await deleteObject(desertRef);
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
    const {
      target: { value },
    } = e;
    setNewThread(value);
  };

  return (
    <Box>
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
            <Button onClick={onSubmit}>Update thread </Button>
          </FormControl>
          <Button onClick={toggleEditing}>Cancel</Button>
        </>
      ) : (
        <>
          <h4>{threadObj.text}</h4>
          {threadObj.attachmentUrl && <Image src={threadObj.attachmentUrl} />}
          {isOwner && (
            <Box>
              <Button onClick={onDelete}>Delete</Button>
              <Button onClick={toggleEditing}>Edit</Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
export default Thread;
