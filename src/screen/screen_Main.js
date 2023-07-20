import React, { useState, useEffect } from "react";
import { dbService } from "../firebase-config";
import Community from "../components/Community";
import Startup from "../components/Startup";
import VC from "../components/VC";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Heading,
  Image,
  useBreakpointValue,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const ScreenMain = () => {
  //양쬭 여백
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });

  //렌더링 관련 코드
  const [communities, setCommunities] = useState([]);
  const [startups, setStartups] = useState([]);
  const [vcs, setVCs] = useState([]);

  useEffect(() => {
    dbService.collection("community_list").onSnapshot((snapshot) => {
      const communityArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communityArray);
    });
    dbService.collection("startup_list").onSnapshot((snapshot) => {
      const startupArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStartups(startupArray);
    });
    dbService.collection("vc_list").onSnapshot((snapshot) => {
      const vcArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVCs(vcArray);
    });
  }, []);

  //Modal 관련 코드
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Modal 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  //Modal 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //Modal 쭉 닫기
  const handleForeverCloseModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("dontShowAgain", "true");
  };
  //Modal 상태 저장
  useEffect(() => {
    const shouldShowModal = !localStorage.getItem("dontShowAgain");
    setIsModalOpen(shouldShowModal);
  }, []);

  //커뮤니티 리스트 렌더링
  const renderCommunities = () => {
    return communities.map((community) => (
      //커뮤니티 카드
      <Box key={community.id}>
        <Box
          //정렬
          position="relative"
          //크기 및 여백
          w="300px"
          h="400px"
          m="20px"
          //배경
          bg="white"
          borderRadius="md"
          boxShadow="0 0 15px #00A29D"
          overflow="hidden"
        >
          {/* 커뮤니티 카드 정보 */}
          <Community communityObj={community} />
        </Box>
      </Box>
    ));
  };

  //스타트업 리스트 렌더링
  const renderStartups = () => {
    return startups.map((startup) => (
      //스타트업 카드
      <Box key={startup.id}>
        <Box
          //정렬
          position="relative"
          //크기 및 여백
          w="500px"
          h="360px"
          m="20px"
          //배경
          borderRadius="10px"
          boxShadow="0 0 15px #00A29D"
          overflow="hidden"
        >
          {/* 스타트업 카드 정보 */}
          <Startup startupObj={startup} />
        </Box>
      </Box>
    ));
  };

  //VC 리스트 렌더링
  const renderVCs = () => {
    return vcs.map((vc) => (
      //VC 카드
      <Box key={vc.id}>
        <Box
          //정렬
          position="relative"
          //크기 및 여백
          w="500px"
          h="360px"
          m="20px"
          //배경
          borderRadius="10px"
          boxShadow="0 0 15px #00A29D"
          overflow="hidden"
        >
          {/* VC 카드 정보 */}
          <VC vcObj={vc} />
        </Box>
      </Box>
    ));
  };

  //커뮤니티 슬라이드 리스트
  const SlideListCom = () => {
    //슬라이드 설정
    const settings = {
      dots: true, // 페이지 표시 여부
      infinite: true, // 무한 루프 여부
      speed: 500, // 슬라이드 전환 속도
      slidesToShow: 3, // 보여질 슬라이드 개수
      slidesToScroll: 2, // 슬라이드 이동시 이동하는 슬라이드 개수
      autoplay: true, // 자동 전환 설정
      autoplaySpeed: 3000, // 자동전환 속도
    };

    return (
      //슬라이드 카드
      <Box>
        <Slider {...settings}>{renderCommunities()}</Slider>
      </Box>
    );
  };

  //스타트업 슬라이드 리스트
  const SlideListSup = () => {
    //슬라이드 설정
    const settings = {
      dots: true, // 페이지 표시 여부
      infinite: true, // 무한 루프 여부
      speed: 500, // 슬라이드 전환 속도
      slidesToShow: 3, // 보여질 슬라이드 개수
      slidesToScroll: 2, // 슬라이드 이동시 이동하는 슬라이드 개수
      autoplay: true, // 자동 전환 설정
      autoplaySpeed: 3000, // 자동전환 속도
    };

    return (
      //슬라이드 카드
      <Box>
        <Slider {...settings}>{renderStartups()}</Slider>
      </Box>
    );
  };

  //VC 슬라이드 리스트
  const SlideListVC = () => {
    //슬라이드 설정
    const settings = {
      dots: true, // 페이지 표시 여부
      infinite: true, // 무한 루프 여부
      speed: 500, // 슬라이드 전환 속도
      slidesToShow: 3, // 보여질 슬라이드 개수
      slidesToScroll: 2, // 슬라이드 이동시 이동하는 슬라이드 개수
      autoplay: true, // 자동 전환 설정
      autoplaySpeed: 3000, // 자동전환 속도
    };

    return (
      //슬라이드 카드
      <Box>
        <Slider {...settings}>{renderVCs()}</Slider>
      </Box>
    );
  };

  return (
    <>
      {/* Main 전체 화면 */}

      {/* 메인 배너 사진 */}
      <Image src="image/stot_main.png" alt="main logo" w="100%" h="auto" />

      {/* 메인 정보 섹션 */}
      <Box
        //여백
        pb="100px"
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
      >
        {/* 커뮤니티 섹션 */}
        <Heading
          //여백
          mt="50px"
          mb="5px"
          //글자
          as="h2"
          size="md"
        >
          새로운 커뮤니티 찾기
        </Heading>
        <Heading
          //여백
          mb="20px"
          //글자
          as="h1"
          size="lg"
        >
          투자 중인 커뮤니티
        </Heading>
        <SlideListCom />

        {/* 스타트업 섹션 */}
        <Heading
          //여백
          mt="50px"
          mb="5px"
          //글자
          as="h2"
          size="md"
        >
          새로운 스타트업 찾기
        </Heading>
        <Heading
          //여백
          mb="20px"
          //글자
          as="h1"
          size="lg"
        >
          투자 중인 스타트업
        </Heading>
        <SlideListSup />

        {/* VC 섹션 */}
        <Heading
          //여백
          mt="50px"
          mb="5px"
          //글자
          as="h2"
          size="md"
        >
          새로운 VC 찾기
        </Heading>
        <Heading
          //여백
          mb="20px"
          //글자
          as="h1"
          size="lg"
        >
          투자 중인 VC
        </Heading>
        <SlideListVC />

        {/* Modal open 버튼 */}
        <Button
          //위치
          position="fixed"
          bottom="20px"
          right="20px"
          //배경
          colorScheme="teal"
          onClick={handleOpenModal}
        >
          Tutorial
        </Button>
      </Box>

      {/* 튜토리얼 Modal */}
      <Modal
        //크기
        size="3xl"
        //기능
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <ModalOverlay />
        {/* Modal 배경 화면 */}
        <ModalContent
          //배경
          bg="#E5F2F2"
        >
          {/* Modal Header */}
          <ModalHeader
            //여백
            mt="20px"
            mb="20px"
            //글자
            fontSize="2xl"
            fontWeight="bold"
          >
            STOT이 처음이신가요?
          </ModalHeader>

          {/* Modal 닫기 버튼 */}
          <ModalCloseButton />

          {/* Modal 본문 */}
          <ModalBody>
            <Text
              //여백
              mb="10px"
              //글자
              fontSize="xl"
              fontWeight="bold"
              color="#00A29D"
            >
              STOT에 등록된 스타트업의 정보를 볼 수 있습니다.
            </Text>
            <Image
              //사진 위치
              src="image/modal1.png"
              //크기 및 여백
              w="100%"
              h="auto"
              p="5px"
              mb="40px"
              //배경
              border="1px solid #00A29D"
              borderRadius="xl"
            />
            <Text
              //여백
              mb="10px"
              //글자
              fontSize="xl"
              fontWeight="bold"
              color="#00A29D"
            >
              추가적으로 VC의 정보도 볼 수 있습니다.
            </Text>
            <Image
              //사진 위치
              src="image/modal2.png"
              //크기 및 여백
              w="100%"
              h="auto"
              p="5px"
              mb="40px"
              //배경
              border="1px solid #00A29D"
              borderRadius="xl"
            />
            <Text
              //여백
              mb="10px"
              //글자
              fontSize="xl"
              fontWeight="bold"
              color="#00A29D"
            >
              스타트업과 VC에 대한 정보를 얻은 후 관심있는 커뮤니티에
              참여해보세요!
            </Text>
            <Image
              //사진 위치
              src="image/modal3.png"
              //크기 및 여백
              w="100%"
              h="auto"
              p="5px"
              mb="40px"
              //배경
              border="1px solid #00A29D"
              borderRadius="xl"
            />

            {/* Modal 다시 보지 않기 버튼 */}
            <Box
              //정렬
              display="flex"
              justifyContent="right"
              //여백
              m="20px"
            >
              <Button
                //배경
                colorScheme="teal"
                //기능
                onClick={handleForeverCloseModal}
              >
                다시 보지 않기
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScreenMain;
