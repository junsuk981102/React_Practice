import React, { useState } from "react";
import { dbService, storageService } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Box, FormControl, Button, Input, Image, Text } from "@chakra-ui/react";

const ThreadCreator = ({ userObj }) => {
  const [thread, setThread] = useState("");
  const [attachment, setAttachment] = useState("");

  const onChange = ({ target: { value } }) => {
    setThread(value);
  };

  //사진을 추가했을 때 동작
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const thrFile = files[0];

    // 파일이 선택되지 않았을 경우에도 처리해야 합니다.
    if (!thrFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const {
        target: { result }, // result를 가져올 수 있도록 수정되었습니다.
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(thrFile);
  };

  const onSubmit = async (e) => {
    if (thread === "") {
      return;
    }
    e.preventDefault();
    const threadObj = {
      text: thread,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    };
    try {
      const docRef = await addDoc(collection(dbService, "threads"), threadObj);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setThread("");
  };

  return (
    <>
      <FormControl>
        <Input
          value={thread}
          type="text"
          onChange={onChange}
          placeholder="무슨 생각을 하고 있나요?"
          maxLength={120}
        />
      </FormControl>
      <FormControl>
        <Input type="file" accept="image/*" onChange={onFileChange} />
        {attachment && (
          <Box>
            <Text>Add photos</Text>
            <Image src={attachment} style={{ backgroundImage: attachment }} />
          </Box>
        )}
      </FormControl>
      <Button onClick={onSubmit}>Submit</Button>
    </>
  );
};
export default ThreadCreator;
