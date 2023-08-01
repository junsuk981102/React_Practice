import React, { useState, useEffect } from "react";
import { dbService, storageService } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  Flex,
  Box,
  FormControl,
  Button,
  Input,
  Image,
  Text,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";

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

    // 파일이 선택되지 않았을 경우에 처리.
    if (!thrFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const {
        target: { result },
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
    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }

    const threadObj = {
      text: thread,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorEmail: userObj.email,
      creatorPhotoUrl: userObj.photoURL,
      attachmentUrl: attachmentUrl,
    };
    try {
      const docRef = await addDoc(collection(dbService, "threads"), threadObj);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setThread("");
    setAttachment("");
  };

  const clearAttachment = () => {
    setAttachment(null);
  };

  return (
    <Flex
      flexDirection="column"
      p="20px"
      bg="white"
      border="1px solid #ddd"
      borderRadius="10px"
      mb="20px"
    >
      <FormControl>
        <Flex flexDirection="row">
          <Input
            value={thread}
            type="text"
            onChange={onChange}
            placeholder="무슨 생각을 하고 있나요?"
            maxLength={120}
            borderRadius="5px"
            border="1px solid #ccc"
            p="10px"
            mb="10px"
          />
          <Button onClick={onSubmit} leftIcon={<FiSend />}>
            Post
          </Button>
        </Flex>
      </FormControl>
      <FormControl>
        <Flex alignItems="center" mb="10px">
          <Input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            display="none"
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <Button as="span" variant="outline" size="sm" colorScheme="teal">
              이미지 추가
            </Button>
          </label>
          {attachment && (
            <Box ml="10px">
              <Text
                color="teal"
                fontWeight="bold"
                cursor="pointer"
                onClick={clearAttachment}
              >
                첨부파일 삭제
              </Text>
              <Image src={attachment} alt="attachment" w="100px" mt="5px" />
            </Box>
          )}
        </Flex>
      </FormControl>
    </Flex>
  );
};
export default ThreadCreator;
