import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Text,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa6";

function Login() {
  const navigate = useNavigate(); // 페이지 이동을 처리하기 위해 navigate 변수를 선언
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지를 저장할 상태 변수
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
    <>
      {/* 로그인 화면 컴포넌트 */}

      {/* 로그인 화면 전체 배경 */}
      <Flex flexDirection="column" alignItems="center" w="700px">
        {/* 제목 */}
        <Heading m="30px 0">로그인</Heading>
        {/* 로그인 폼 */}
        <Divider h="1px" mb="30px" bg="#00A29D" />
        {/* 이메일 입력 폼 */}
        <FormControl display="flex" justifyContent="space-between" mb="30px">
          <FormLabel fontSize="2xl" fontWeight="bold">
            이메일 :
          </FormLabel>
          <Input
            w="400px"
            border="solid 1px #00A29D"
            borderRadius="xl"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일"
            required
          />
        </FormControl>
        {/* 비밀번호 입력 폼 */}
        <FormControl display="flex" justifyContent="space-between" mb="30px">
          <FormLabel fontSize="2xl" fontWeight="bold">
            비밀번호 :
          </FormLabel>
          <Input
            w="400px"
            border="solid 1px #00A29D"
            borderRadius="xl"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            required
          />
        </FormControl>
        {/* 에러메시지 */}
        <Text color="red">{error}</Text>
        <Divider h="1px" m="30px 0" bg="#00A29D" />
        {/* 이메일 로그인 버튼 */}
        <Button
          w="300px"
          h="75px"
          bg="#00A29D"
          borderRadius="lg"
          fontSize="xl"
          color="white"
          type="submit"
          onClick={handleEmailLogin}
        >
          Sign in with Email
        </Button>
        <Text fontSize="xl" m="10px 0">
          or
        </Text>
        {/* 구글 로그인 버튼 */}
        <Button
          w="300px"
          h="75px"
          bg="#00A29D"
          borderRadius="lg"
          leftIcon={<FaGoogle />}
          fontSize="xl"
          color="white"
          type="submit"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </Flex>
    </>
  );
}

export default Login;

//23.07.21 1차 코드 수정 완료
//23.08.08 2차 코드 수정 완료
