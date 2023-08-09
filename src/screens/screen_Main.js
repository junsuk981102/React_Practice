import React, { useState, useEffect } from "react";
import { dbService } from "../firebase-config";
import { SlideListCom } from "../components/main/cpn_Slidelist_Community";
import { SlideListSup } from "../components/main/cpn_Slidelist_Startup";
import { SlideListVC } from "../components/main/cpn_Slidelist_VC";
import TutorialModal from "../components/main/cpn_Tutorial_Modal";
import {
  Box,
  Heading,
  Image,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";

const ScreenMain = () => {
  const boxPadding = useBreakpointValue({ base: "20px", xl: "200px" }); // 양쪽 여백
  // 렌더링 관련 코드
  const [communities, setCommunities] = useState([]);
  const [startups, setStartups] = useState([]);
  const [vcs, setVCs] = useState([]);
  // 커뮤니티&스타트업&VC 리스트 업데이트
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
  // Tutorial Modal 상태 저장
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  useEffect(() => {
    const shouldShowModal = !localStorage.getItem("dontShowAgain");
    setIsTutorialModalOpen(shouldShowModal);
  }, []);
  // Modal 열기
  const handleOpenModal = () => {
    setIsTutorialModalOpen(true);
  };

  return (
    <>
      {/* Main 전체 화면 */}

      {/* 메인 배너 사진 */}
      <Image src="image/main/banner_motion.gif" w="100%" h="auto" />

      {/* 메인 정보 섹션 */}
      <Box px={boxPadding} pb="200px">
        {/* 커뮤니티 섹션 */}
        <Heading mt="50px" mb="5px" size="md">
          새로운 커뮤니티 찾기
        </Heading>
        <Heading mb="20px" size="lg">
          투자 중인 커뮤니티
        </Heading>
        <SlideListCom communities={communities} />

        {/* 스타트업 섹션 */}
        <Heading mt="50px" mb="5px" size="md">
          새로운 스타트업 찾기
        </Heading>
        <Heading mb="20px" size="lg">
          투자 중인 스타트업
        </Heading>
        <SlideListSup startups={startups} />

        {/* VC 섹션 */}
        <Heading mt="50px" mb="5px" size="md">
          새로운 VC 찾기
        </Heading>
        <Heading mb="20px" size="lg">
          투자 중인 VC
        </Heading>
        <SlideListVC vcs={vcs} />

        {/* Modal open 버튼 */}
        <Button
          position="fixed"
          bottom="20px"
          right="20px"
          colorScheme="teal"
          onClick={handleOpenModal}
        >
          Tutorial
        </Button>
      </Box>
      {/* 튜토리얼 Modal */}
      <TutorialModal
        isOpen={isTutorialModalOpen}
        onClose={() => setIsTutorialModalOpen(false)}
        onForeverClose={() => {
          setIsTutorialModalOpen(false);
          localStorage.setItem("dontShowAgain", "true");
        }}
      />
    </>
  );
};

export default ScreenMain;

//23.08.09 1차 코드 수정
