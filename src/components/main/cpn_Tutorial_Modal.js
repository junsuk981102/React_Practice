import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";

const TutorialModal = ({ isOpen, onClose, onForeverClose }) => {
  //Modal 닫기
  const handleCloseModal = () => {
    onClose();
  };

  //Modal 쭉 닫기
  const handleForeverCloseModal = () => {
    onForeverClose();
  };

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent bg="#E5F2F2">
        <ModalHeader marginY="20px" fontWeight="bold">
          STOT이 처음이신가요?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody color="#00A29D">
          <Text mb="10px">STOT에 등록된 스타트업의 정보를 볼 수 있습니다.</Text>
          <Image
            src="image/main_screen_modal/modal1.png"
            w="100%"
            p="5px"
            mb="40px"
            border="1px solid #00A29D"
            borderRadius="xl"
          />
          <Text mb="10px">추가적으로 VC의 정보도 볼 수 있습니다.</Text>
          <Image
            src="image/main_screen_modal/modal2.png"
            w="100%"
            p="5px"
            mb="40px"
            border="1px solid #00A29D"
            borderRadius="xl"
          />
          <Text mb="10px">
            스타트업과 VC에 대한 정보를 얻은 후 관심있는 커뮤니티에
            참여해보세요!
          </Text>
          <Image
            src="image/main_screen_modal/modal3.png"
            w="100%"
            p="5px"
            mb="40px"
            border="1px solid #00A29D"
            borderRadius="xl"
          />
          <Flex justifyContent="right" m="10px">
            <Button colorScheme="teal" onClick={handleForeverCloseModal}>
              다시 보지 않기
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TutorialModal;
