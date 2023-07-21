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
        navigate(""); // 로그인 성공 후 홈 페이지로 이동
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
    signInWithRedirect(auth, provider).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage); // 에러 메시지 업데이트
      console.error("로그인 실패:", errorCode, errorMessage);
    });
    navigate("/"); // 로그인 성공 후 홈 페이지로 이동
  };

  return (
    <Box
      //정렬
      display="flex"
      flexDirection="column"
      alignItems="center"
      //배경
      bg="#E5F2F2"
    >
      <Heading
        //정렬
        textAlign="center"
        //여백
        mt="30px"
        mb="30px"
        //글자
        as="h1"
        size="xl"
      >
        로그인
      </Heading>

      <Divider
        //크기 및 여백
        h="1px"
        mb="30px"
        //배경
        backgroundColor="#00A29D"
      />

      <FormControl
        //정렬
        display="flex"
        flexDirection="column"
        //기능
        as="form"
        //배경
        bg="#E5F2F2"
      >
        <FormControl
          //정렬
          display="flex"
          justifyContent="space-between"
        >
          <FormLabel
            //글자
            fontSize="2xl"
            fontWeight="bold"
          >
            이메일 :
          </FormLabel>
          <Input
            //크기
            w="450px"
            //배경
            border="solid 1px #00A29D"
            borderRadius="xl"
            //기능
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일"
            required
          />
        </FormControl>
        <FormControl
          //정렬
          display="flex"
          justifyContent="space-between"
        >
          <FormLabel
            //글자
            fontSize="2xl"
            fontWeight="bold"
          >
            비밀번호 :
          </FormLabel>
          <Input
            //크기
            w="450px"
            //배경
            border="solid 1px #00A29D"
            borderRadius="xl"
            //기능
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            required
          />
        </FormControl>
        <Text
          //글자
          color="red"
          textAlign="center"
        >
          {error}
        </Text>

        <Divider
          //크기 및 여백
          h="1px"
          mt="30px"
          mb="30px"
          //배경
          backgroundColor="#00A29D"
        />

        <Flex
          //정렬
          justifyContent="center"
        >
          <Button
            //크기
            w="300px"
            h="75px"
            //배경
            bg="#00A29D"
            borderRadius="lg"
            //글자
            as="b"
            fontSize="xl"
            color="white"
            //기능
            type="submit"
            onClick={handleEmailLogin}
          >
            Sign in with Email
          </Button>
        </Flex>
        <Text
          //정렬
          textAlign="center"
          //글자
          fontSize="xl"
        >
          or
        </Text>
        <Flex
          //정렬
          justifyContent="center"
        >
          <Button
            //크기
            w="300px"
            h="75px"
            //배경
            bg="#00A29D"
            borderRadius="lg"
            leftIcon={<FaGoogle />}
            //글자
            as="b"
            fontSize="xl"
            color="white"
            //기능
            type="submit"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Login;
