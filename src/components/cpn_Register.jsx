import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import {
  Heading,
  Box,
  Alert,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";

const Register = (props) => {
  const [registerId, setRegisterId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmpassword, setRegisterConfirmpassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhonenumber, setRegisterPhonenumber] = useState("");
  const [registerBirthdate, setRegisterBirthdate] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

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
      const userData = {
        id: registerId,
        email: registerEmail,
        phone: registerPhonenumber,
        birth: registerBirthdate,
        address: registerAddress,
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

  return (
    <Box height="100%" width="700px" padding="20px" backgroundColor="#E5F2F2">
      <Heading mt="30px" mb="30px" textAlign="center" as="h1" size="xl">
        회원가입
      </Heading>

      <FormControl
        as="form"
        onSubmit={handleFormSubmit}
        backgroundColor="#E5F2F2"
        display="flex"
        flexDirection="column"
      >
        <Divider backgroundColor="#00A29D" height="2px" margin="30px 0" />
        <FormControl
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            border="solid 1px #d4d3d3"
            padding="14px 12px"
            borderRadius="6px"
            outline="none"
            flexGrow="6"
            maxW="450px"
          />
        </FormControl>

        <FormControl
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            border="solid 1px #d4d3d3"
            padding="14px 12px"
            borderRadius="6px"
            outline="none"
            flexGrow="6"
            maxW="450px"
          />
        </FormControl>
        {passwordError && (
          <Alert textAlign="end" color="red" fontSize="14px">
            {passwordError}
          </Alert>
        )}

        <FormControl
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            border="solid 1px #d4d3d3"
            padding="14px 12px"
            borderRadius="6px"
            outline="none"
            flexGrow="6"
            maxW="450px"
          />
        </FormControl>
        {confirmPasswordError && (
          <Alert textAlign="end" color="red" fontSize="14px">
            {confirmPasswordError}
          </Alert>
        )}

        <FormControl
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            border="solid 1px #d4d3d3"
            padding="14px 12px"
            borderRadius="6px"
            outline="none"
            flexGrow="6"
            maxW="450px"
          />
        </FormControl>

        <FormControl
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            border="solid 1px #d4d3d3"
            padding="14px 12px"
            borderRadius="6px"
            outline="none"
            flexGrow="6"
            maxW="450px"
          />
        </FormControl>

        <FormControl
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            border="solid 1px #d4d3d3"
            padding="14px 12px"
            borderRadius="6px"
            outline="none"
            flexGrow="6"
            maxW="450px"
          />
        </FormControl>

        <FormControl
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            border="solid 1px #d4d3d3"
            padding="14px 12px"
            borderRadius="6px"
            outline="none"
            flexGrow="6"
            maxW="450px"
          />
        </FormControl>

        <Divider backgroundColor="#00A29D" height="2px" margin="30px 0" />
        <Flex justifyContent="center">
          <Button
            type="submit"
            maxWidth="300px"
            height="75px"
            fontSize="20px"
            fontWeight="bold"
            backgroundColor="#00A29D"
            color="white"
            border="none"
            padding="10px 20px"
            borderRadius="5px"
          >
            가입하기
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Register;
