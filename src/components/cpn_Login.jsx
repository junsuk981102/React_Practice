import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate(); // 페이지 이동을 처리하기 위해 navigate 변수를 선언
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지를 저장할 상태 변수
  const [user, setUser] = useState("");
  const auth = getAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공 후 처리
        const user = userCredential.user;
        setUser(user); // 사용자 정보 업데이트
        console.log("로그인 성공:", user);
        navigate("/screen_room_list"); // 로그인 성공 후 홈 페이지로 이동
      })
      .catch((error) => {
        // 로그인 실패 처리
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage); // 에러 메시지 업데이트
        console.error("로그인 실패:", errorCode, errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
      .then(() => {
        navigate("/screen_room_list"); // 로그인 성공 후 홈 페이지로 이동
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage); // 에러 메시지 업데이트
        console.error("로그인 실패:", errorCode, errorMessage);
      });
  };

  return (
    <Box
      bg="#E5F2F2"
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      width="700px"
    >
      <Heading textAlign="center" fontSize="35px" fontWeight="bold">
        로그인
      </Heading>
      <FormControl
        as="form"
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
          <FormLabel fontSize="20px" fontWeight="bold" mr={2}>
            이메일:
          </FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
            border="solid 1px #d4d3d3"
            px={3}
            py={2}
            borderRadius="6px"
            outline="none"
            flex="1"
            maxW="450px"
          />
        </FormControl>
        <FormControl
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormLabel fontSize="20px" fontWeight="bold" mr={2}>
            비밀번호:
          </FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
            border="solid 1px #d4d3d3"
            px={3}
            py={2}
            borderRadius="6px"
            outline="none"
            flex="1"
            maxW="450px"
          />
        </FormControl>
        <Text color="red" textAlign="center" mb={2}>
          {error}
        </Text>
        <Divider backgroundColor="#00A29D" height="2px" margin="30px 0" />
        <Flex justifyContent="center">
          <Button
            onClick={handleEmailLogin}
            type="submit"
            width="150px"
            height="75px"
            fontSize="20px"
            fontWeight="bold"
            backgroundColor="#00A29D"
            color="white"
            border="none"
            padding="10px 20px"
            borderRadius="5px"
          >
            Sign in with Email
          </Button>
        </Flex>
        <Text textAlign="center" fontSize="20px" mb={2}>
          or
        </Text>
        <Flex justifyContent="center">
          <Button
            onClick={handleGoogleSignIn}
            type="submit"
            width="150px"
            height="75px"
            fontSize="20px"
            fontWeight="bold"
            backgroundColor="#00A29D"
            color="white"
            border="none"
            padding="10px 20px"
            borderRadius="5px"
            leftIcon={<FaGoogle />}
          >
            Sign in with Google
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Login;
