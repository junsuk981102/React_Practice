import React, { useState, useEffect } from "react";
import { dbService, storageService } from "../../../firebase-config";
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
import { FiSend, FiImage } from "react-icons/fi";

const ThreadCreator = ({ userObj }) => {
  //스레드의 텍스트를 저장하는 변수
  const [thread, setThread] = useState("");
  //스레드의 사진 Url을 저장하는 변수
  const [attachment, setAttachment] = useState("");

  const onChange = ({ target: { value } }) => {
    setThread(value);
  };

  //사진을 추가했을 때 동작하는 이벤트 핸들러
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

  //스레드를 Post 했을때 동작하는 이벤트 핸들러
  const onSubmit = async (e) => {
    if (thread === "") {
      return;
    }
    e.preventDefault();
    let attachmentUrl = "";

    //첨부 파일이 있는 경우에만 처리
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }

    //스레드 정보 객체 생성
    const threadObj = {
      text: thread,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      creatorEmail: userObj.email,
      creatorPhotoUrl: userObj.photoURL,
      attachmentUrl: attachmentUrl,
      likes: 0, // Initialize likes to 0
    };
    try {
      //스레드 정보 Firestore에 추가
      const docRef = await addDoc(collection(dbService, "threads"), threadObj);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    //입력 내용 초기화
    setThread("");
    setAttachment("");
  };

  //Post 전 사진을 삭제할떄 동작
  const clearAttachment = () => {
    setAttachment("");
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
          <Button onClick={onSubmit} leftIcon={<FiSend />} ml="4px">
            게시
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
            <Button
              as="span"
              variant="outline"
              size="sm"
              colorScheme="teal"
              leftIcon={<FiImage />}
            >
              이미지 추가
            </Button>
          </label>
          {/* 첨부 파일이 있는 경우 미리보기 및 삭제 버튼 표시 */}
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

//23.08.09 1차 정리
