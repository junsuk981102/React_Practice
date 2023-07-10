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
    <Box display="flex" alignItems="center" flexDirection="column" bg="#E5F2F2">
      <Heading mt="30px" mb="30px" textAlign="center" as="h1" size="xl">
        로그인
      </Heading>

      <FormControl as="form" bg="#E5F2F2" display="flex" flexDirection="column">
        <Divider bg="#00A29D" h="2px" mb="20px" />
        <FormControl display="flex" justifyContent="space-between">
          <FormLabel fontSize="2xl" fontWeight="bold">
            이메일 :
          </FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일"
            required
            border="solid 1px #00A29D"
            borderRadius="xl"
            w="450px"
          />
        </FormControl>
        <FormControl display="flex" justifyContent="space-between">
          <FormLabel fontSize="2xl" fontWeight="bold">
            비밀번호 :
          </FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            required
            border="solid 1px #00A29D"
            borderRadius="xl"
            w="450px"
          />
        </FormControl>
        <Text color="red" textAlign="center">
          {error}
        </Text>

        <Divider bg="#00A29D" h="2px" mt="20px" mb="20px" />

        <Flex justifyContent="center">
          <Button
            w="300px"
            h="75px"
            as="b"
            color="white"
            fontSize="xl"
            bg="#00A29D"
            borderRadius="lg"
            type="submit"
            onClick={handleEmailLogin}
          >
            Sign in with Email
          </Button>
        </Flex>
        <Text textAlign="center" fontSize="xl">
          or
        </Text>
        <Flex justifyContent="center">
          <Button
            w="300px"
            h="75px"
            as="b"
            color="white"
            fontSize="xl"
            bg="#00A29D"
            borderRadius="lg"
            type="submit"
            onClick={handleGoogleSignIn}
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
