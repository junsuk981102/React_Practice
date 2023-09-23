import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storageService } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  Heading,
  Alert,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Divider,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";

const Register = () => {
  const [registerId, setRegisterId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmpassword, setRegisterConfirmpassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhonenumber, setRegisterPhonenumber] = useState("");
  const [registerBirthdate, setRegisterBirthdate] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  //유저의 프로필 사진 Url을 저장하는 변수
  const [attachment, setAttachment] = useState("");

  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";

    // 비밀번호 규칙 검사
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(registerPassword)) {
      setPasswordError(
        "비밀번호는 최소 8자 이상이어야 하며, 영어 소문자, 숫자, 특수 문자를 포함해야 합니다."
      );
      return;
    }

    // 비밀번호 확인 검사
    if (registerPassword !== registerConfirmpassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      // Firebase Auth에 사용자가 성공적으로 등록되었습니다.
      const user = userCredential.user;
      // Firestore에 사용자 정보 추가하기
      const userRef = doc(db, "user_list", user.uid);
      //첨부 파일이 있는 경우에만 처리
      if (attachment !== "") {
        const attachmentRef = ref(
          storageService,
          `user/${user.uid}/${uuidv4()}`
        );
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        attachmentUrl = await getDownloadURL(response.ref);
      }
      const userData = {
        id: registerId,
        email: registerEmail,
        phone: registerPhonenumber,
        birth: registerBirthdate,
        address: registerAddress,
        photo: attachmentUrl,
        funds: 1000000,
      };
      await setDoc(userRef, userData);

      console.log("사용자 등록 및 정보 추가 완료:", user);

      handleClick("/screen_Login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePasswordChange = (e) => {
    setRegisterPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setRegisterConfirmpassword(e.target.value);
    setConfirmPasswordError("");
  };

  //사진을 추가했을 때 동작하는 이벤트 핸들러
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const commFile = files[0];

    // 파일이 선택되지 않았을 경우에 처리.
    if (!commFile) {
      setAttachment("");
      return;
    }

    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result || "");
    };
    reader.readAsDataURL(commFile);
  };

  //Post 전 사진을 삭제할떄 동작
  const clearAttachment = () => {
    setAttachment("");
  };

  return (
    <Flex flexDirection="column" w="700px">
      <Heading textAlign="center" m="30px 0">
        회원가입
      </Heading>
      <Divider h="1px" mb="30px" bg="#00A29D" />

      <form onSubmit={handleFormSubmit}>
        <FormControl
          justifyContent="center"
          bg="#E5F2F2"
          onSubmit={handleFormSubmit}
        >
          <FormControl display="flex" justifyContent="space-between" m="15px 0">
            <FormLabel fontSize="20px" fontWeight="bold" htmlFor="id">
              아이디:
            </FormLabel>
            <Input
              type="text"
              id="id"
              placeholder="아이디를 입력해주세요"
              value={registerId}
              onChange={(event) => {
                setRegisterId(event.target.value);
              }}
              required
              border="solid 1px #00A29D"
              borderRadius="xl"
              maxW="450px"
            />
          </FormControl>
          <FormControl display="flex" justifyContent="space-between" m="15px 0">
            <FormLabel fontSize="20px" fontWeight="bold" htmlFor="password">
              비밀번호:
            </FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              value={registerPassword}
              onChange={handlePasswordChange}
              required
              border="solid 1px #00A29D"
              borderRadius="xl"
              maxW="450px"
            />
          </FormControl>
          {passwordError && (
            <Alert textAlign="end" color="red" fontSize="14px">
              {passwordError}
            </Alert>
          )}
          <FormControl display="flex" justifyContent="space-between" m="15px 0">
            <FormLabel
              fontSize="20px"
              fontWeight="bold"
              htmlFor="confirmpassword"
            >
              비밀번호 확인:
            </FormLabel>
            <Input
              type="password"
              id="confirmpassword"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              value={registerConfirmpassword}
              onChange={handleConfirmPasswordChange}
              required
              border="solid 1px #00A29D"
              borderRadius="xl"
              maxW="450px"
            />
          </FormControl>
          {confirmPasswordError && (
            <Alert textAlign="end" color="red" fontSize="14px">
              {confirmPasswordError}
            </Alert>
          )}

          <FormControl display="flex" justifyContent="space-between" m="15px 0">
            <FormLabel fontSize="20px" fontWeight="bold" htmlFor="image">
              프로필 사진:
            </FormLabel>
            <Flex>
              <Input
                type="file"
                accept="image/*"
                display="none"
                name="image"
                // value={communityData.image}
                onChange={onFileChange}
                placeholder="이미지의 URL을 넣으세요."
                id="fileInput"
                required
              />
              <label htmlFor="fileInput">
                <Button
                  as="span"
                  variant="outline"
                  size="md"
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

          <FormControl display="flex" justifyContent="space-between" m="15px 0">
            <FormLabel fontSize="20px" fontWeight="bold" htmlFor="email">
              이메일:
            </FormLabel>
            <Input
              type="email"
              id="email"
              placeholder="예: stot1234@stot.com"
              value={registerEmail}
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
              border="solid 1px #00A29D"
              borderRadius="xl"
              maxW="450px"
            />
          </FormControl>

          <FormControl display="flex" justifyContent="space-between" m="15px 0">
            <FormLabel fontSize="20px" fontWeight="bold" htmlFor="phonenumber">
              전화번호:
            </FormLabel>
            <Input
              type="tel"
              id="phonenumber"
              placeholder="예: 010-1234-5678"
              value={registerPhonenumber}
              onChange={(event) => {
                setRegisterPhonenumber(event.target.value);
              }}
              border="solid 1px #00A29D"
              borderRadius="xl"
              maxW="450px"
            />
          </FormControl>

          <FormControl display="flex" justifyContent="space-between" m="15px 0">
            <FormLabel fontSize="20px" fontWeight="bold" htmlFor="birthDate">
              생년월일:
            </FormLabel>
            <Input
              type="date"
              id="birthDate"
              value={registerBirthdate}
              onChange={(event) => {
                setRegisterBirthdate(event.target.value);
              }}
              border="solid 1px #00A29D"
              borderRadius="xl"
              maxW="450px"
            />
          </FormControl>
          <FormControl display="flex" justifyContent="space-between" m="15px 0">
            <FormLabel fontSize="20px" fontWeight="bold" htmlFor="address">
              주소:
            </FormLabel>
            <Input
              type="text"
              id="address"
              placeholder="주소를 입력해주세요"
              value={registerAddress}
              onChange={(event) => {
                setRegisterAddress(event.target.value);
              }}
              border="solid 1px #00A29D"
              borderRadius="xl"
              maxW="450px"
            />
          </FormControl>
          <Divider h="1px" marginY="30px" bg="#00A29D" />
          <Flex justifyContent="center" mt="20px">
            <Button
              type="submit"
              w="200px"
              h="75px"
              fontSize="20px"
              fontWeight="bold"
              color="white"
              bg="#00A29D"
              border="solid 1px #00A29D"
              borderRadius="xl"
            >
              가입하기
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Flex>
  );
};

export default Register;

//23.07.24 1차 코드 수정
//23.08.08 2차 코드 수정
