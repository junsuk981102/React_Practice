import React, { useState, useEffect } from "react";
import { dbService } from "../firebase-config";
import Community from "../components/card/cpn_Community";
import Startup from "../components/card/cpn_Startup";
import VC from "../components/card/cpn_VC";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Flex,
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
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); // 양쪽 여백

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
      <Box key={community.id} m="20px">
        {/* 커뮤니티 카드 정보 */}
        <Community communityObj={community} />
      </Box>
    ));
  };

  //스타트업 리스트 렌더링
  const renderStartups = () => {
    return startups.map((startup) => (
      //스타트업 카드
      <Box key={startup.id} m="20px">
        {/* 스타트업 카드 정보 */}
        <Startup startupObj={startup} />
      </Box>
    ));
  };

  //VC 리스트 렌더링
  const renderVCs = () => {
    return vcs.map((vc) => (
      //VC 카드
      <Box key={vc.id} m="20px">
        {/* VC 카드 정보 */}
        <VC vcObj={vc} />
      </Box>
    ));
  };

  //커뮤니티 슬라이드 설정
  const com_slide_settings = {
    dots: true, // 페이지 표시 여부
    infinite: true, // 무한 루프 여부
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 3, // 보여질 슬라이드 개수
    slidesToScroll: 2, // 슬라이드 이동시 이동하는 슬라이드 개수
    autoplay: true, // 자동 전환 설정
    autoplaySpeed: 3000, // 자동전환 속도
  };

  //커뮤니티 슬라이드 리스트
  const SlideListCom = () => {
    return (
      //슬라이드 카드
      <Slider {...com_slide_settings}>{renderCommunities()}</Slider>
    );
  };

  //스타트업&VC 슬라이드 설정
  const supvc_slide_settings = {
    dots: true, // 페이지 표시 여부
    infinite: true, // 무한 루프 여부
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 2, // 보여질 슬라이드 개수
    slidesToScroll: 1, // 슬라이드 이동시 이동하는 슬라이드 개수
    autoplay: true, // 자동 전환 설정
    autoplaySpeed: 3000, // 자동전환 속도
  };

  //스타트업 슬라이드 리스트
  const SlideListSup = () => {
    return (
      //슬라이드 카드
      <Slider {...supvc_slide_settings}>{renderStartups()}</Slider>
    );
  };

  //VC 슬라이드 리스트
  const SlideListVC = () => {
    return (
      //슬라이드 카드
      <Slider {...supvc_slide_settings}>{renderVCs()}</Slider>
    );
  };

  return (
    <>
      {/* Main 전체 화면 */}

      {/* 메인 배너 사진 */}
      <Image
        //사진 위치
        src="image/main/banner_stot.png"
        //크기
        w="100%"
        h="auto"
      />

      {/* 메인 정보 섹션 */}
      <Box
        //여백
        px={boxPadding}
        pb="200px"
      >
        {/* 커뮤니티 섹션 */}
        <Heading
          //여백
          mt="50px"
          mb="5px"
          //글자
          size="md"
        >
          새로운 커뮤니티 찾기
        </Heading>
        <Heading
          //여백
          mb="20px"
          //글자
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
          size="md"
        >
          새로운 스타트업 찾기
        </Heading>
        <Heading
          //여백
          mb="20px"
          //글자
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
          size="md"
        >
          새로운 VC 찾기
        </Heading>
        <Heading
          //여백
          mb="20px"
          //글자
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
            marginY="20px"
            //글자
            fontWeight="bold"
          >
            STOT이 처음이신가요?
          </ModalHeader>

          {/* Modal 닫기 버튼 */}
          <ModalCloseButton />

          {/* Modal 본문 */}
          <ModalBody color="#00A29D">
            <Text
              //여백
              mb="10px"
            >
              STOT에 등록된 스타트업의 정보를 볼 수 있습니다.
            </Text>
            <Image
              //사진 위치
              src="image/main_screen_modal/modal1.png"
              //크기 및 여백
              w="100%"
              p="5px"
              mb="40px"
              //배경
              border="1px solid #00A29D"
              borderRadius="xl"
            />
            <Text
              //여백
              mb="10px"
            >
              추가적으로 VC의 정보도 볼 수 있습니다.
            </Text>
            <Image
              //사진 위치
              src="image/main_screen_modal/modal2.png"
              //크기 및 여백
              w="100%"
              p="5px"
              mb="40px"
              //배경
              border="1px solid #00A29D"
              borderRadius="xl"
            />
            <Text
              //여백
              mb="10px"
            >
              스타트업과 VC에 대한 정보를 얻은 후 관심있는 커뮤니티에
              참여해보세요!
            </Text>
            <Image
              //사진 위치
              src="image/main_screen_modal/modal3.png"
              //크기 및 여백
              w="100%"
              p="5px"
              mb="40px"
              //배경
              border="1px solid #00A29D"
              borderRadius="xl"
            />

            {/* Modal 다시 보지 않기 버튼 */}
            <Flex
              //정렬
              justifyContent="right"
              //여백
              m="10px"
            >
              <Button
                //배경
                colorScheme="teal"
                //기능
                onClick={handleForeverCloseModal}
              >
                다시 보지 않기
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScreenMain;

//23.07.21 1차 코드 수정 완료
