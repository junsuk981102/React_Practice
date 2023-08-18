import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Image,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";

const gifs = [
  "image/main_screen_modal/startup_select.gif",
  "image/main_screen_modal/startup_info_screen.gif",
  "image/main_screen_modal/vc_select.gif",
  "image/main_screen_modal/vc_info_screen.gif",
  "image/main_screen_modal/community_select.gif",
  "image/main_screen_modal/community_list_screen.gif",
  "image/main_screen_modal/community_info_screen.gif",
  "image/main_screen_modal/community_screen.gif",
  "image/main_screen_modal/community_1st_vote.gif",
  "image/main_screen_modal/community_2nd_vote.gif",
];

const gifDescriptions = [
  "STOT에서는 다양한 스타트업들의 정보를 제공합니다. 화면처럼 마음에 드는 스타트업을 골라보세요!",
  "스타트업 소개 페이지에서는 스타트업의 정보를 볼 수 있습니다. 나의 비전과 맞는 스타트업인가요?",
  "STOT에서는 VC, 즉 투자를 전문으로 하는 회사들의 정보도 제공합니다.",
  "VC의 정보를 보며, 어떤 기준으로 투자를 하는지, 나의 투자금을 맡길 수 있을지 체크해 보세요!",
  "STOT에서 투자를 하기 위해서는 다른 사람들과 [커뮤니티]에 참여하여 공동으로 투자할 수 있습니다.",
  "STOT의 다양한 커뮤니티 중, 마음에 드는 커뮤니티를 찾아 들어가세요!",
  "커뮤니티에 들어가기 위해 필요한 티켓은 커뮤니티의 입장권인 동시에 투자금의 역할도 합니다.",
  "축하합니다! 커뮤니티에 입장했어요. [스레드]탭에서는 유저들이 자유롭게 의견을 나눌 수 있어요.",
  "어느 스타트업에 투자할지 결정하는 [1차 투표]가 열렸습니다!",
  "[2차 투표]에서는 [1차 투표]에서 1위를 한 회사에 대하여 정말 투자할지 찬/반을 가릅니다.",
];

const TutorialModal = ({ isOpen, onClose, onForeverClose }) => {
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  //Modal 닫기
  const handleCloseModal = () => {
    onClose();
  };
  //Modal 쭉 닫기
  const handleForeverCloseModal = () => {
    onForeverClose();
  };

  const showPreviousGif = () => {
    if (0 < currentGifIndex) {
      setCurrentGifIndex(currentGifIndex - 1);
    }
  };

  const showNextGif = () => {
    if (currentGifIndex < gifs.length - 1) {
      setCurrentGifIndex(currentGifIndex + 1);
    }
  };

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent bg="#E5F2F2">
        <ModalHeader fontWeight="bold">
          STOT이 처음이신가요? 걱정 마세요. 함께 알아볼까요?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={gifs[currentGifIndex]} alt={`GIF ${currentGifIndex}`} />
          <Text mt={2}>{gifDescriptions[currentGifIndex]}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={showPreviousGif} disabled={currentGifIndex === 0}>
            이전
          </Button>
          <Button
            onClick={showNextGif}
            disabled={currentGifIndex === gifs.length - 1}
          >
            다음
          </Button>
          <Button onClick={handleForeverCloseModal}>다시 보지 않기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TutorialModal;

//23.07.27 1차 코드 수정
