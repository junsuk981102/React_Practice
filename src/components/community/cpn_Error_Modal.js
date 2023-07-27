import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ErrorModal = ({ isOpen, onClose }) => {
  return (
    // 커뮤니티 입장 에러 메시지
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody m="20px 0 0 0" fontSize="xl" fontWeight="bold">
          커뮤니티에 입장하기 위해 티켓을 구매해주세요.
        </ModalBody>
        <ModalFooter>
          <Button m="0 5px 0 0" bg="#00A29D" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;

//23.07.27 1차 코드 수정
