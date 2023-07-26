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
    <>
      {/* 로그인 화면 컴포넌트 */}

      {/* 로그인 화면 전체 배경 */}
      <Flex
        //정렬
        flexDirection="column"
        alignItems="center"
        //크기
        w="700px"
        //배경
        bg="#E5F2F2"
      >
        {/* 제목 */}
        <Heading
          //여백
          marginY="30px"
        >
          로그인
        </Heading>

        {/* 로그인 폼 */}
        <Divider
          //크기 및 여백
          h="1px"
          mb="30px"
          //배경
          bg="#00A29D"
        />
        {/* 이메일 입력 폼 */}
        <FormControl
          //정렬
          display="flex"
          justifyContent="space-between"
          //여백
          mb="30px"
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
            w="400px"
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
        {/* 비밀번호 입력 폼 */}
        <FormControl
          //정렬
          display="flex"
          justifyContent="space-between"
          mb="30px"
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
            w="400px"
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
        {/* 에러메시지 */}
        <Text
          //글자
          color="red"
        >
          {error}
        </Text>
        <Divider
          //크기 및 여백
          h="1px"
          marginY="30px"
          //배경
          bg="#00A29D"
        />

        {/* 이메일 로그인 버튼 */}
        <Button
          //크기
          w="300px"
          h="75px"
          //배경
          bg="#00A29D"
          borderRadius="lg"
          //글자
          fontSize="xl"
          color="white"
          //기능
          type="submit"
          onClick={handleEmailLogin}
        >
          Sign in with Email
        </Button>

        <Text
          //글자
          fontSize="xl"
          //여백
          marginY="10px"
        >
          or
        </Text>

        {/* 구글 로그인 버튼 */}
        <Button
          //크기
          w="300px"
          h="75px"
          //배경
          bg="#00A29D"
          borderRadius="lg"
          leftIcon={<FaGoogle />}
          //글자
          fontSize="xl"
          color="white"
          //기능
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
