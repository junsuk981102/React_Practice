import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

const ScreenRoomInfo = (props) => {
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });

  const { state } = useLocation();
  console.log(state.name);

  const navi = useNavigate();
  const [ownerCount, setOwnerCount] = useState(state.com_owner);
  const [sellCount, setSellCount] = useState(0);

  const handleClick_plus = () => {
    if (ownerCount + sellCount < state.com_ticket_max) {
      setSellCount(sellCount + 1);
    }
  };

  const handleClick_minus = () => {
    if (sellCount > 0) {
      setSellCount(sellCount - 1);
    }
  };

  const handleClick_sell = () => {
    setOwnerCount(ownerCount + sellCount);
    setSellCount(0);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick_chat = () => {
    if (ownerCount === 0) {
      onOpen(); // Open the modal
    } else {
      navi(`/screen_chat`, {
        state: {
          id: state.id,
          com_name: state.com_name,
          com_category: state.com_category,
          com_info: state.com_info,
          com_total_investment: state.com_total_investment,
          com_now_investment: state.com_now_investment,
          com_ticket_price: state.com_ticket_price,
          com_ticket_max: state.com_ticket_max,
          com_member: state.com_member,
          com_profileImg: state.com_profileImg,
          com_owner: state.com_owner,
          com_favorite1: state.com_favorite1,
          com_favorite2: state.com_favorite2,
          com_favorite3: state.com_favorite3,
        },
      });
    }
  };

  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  return (
    <>
      <Box
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        pb="100px"
        bg="#E5F2F2"
        h="auto"
        borderTop="1px solid #00A29D"
      >
        <Heading mt="30px" mb="30px" as="h1" size="lg">
          커뮤니티 소개
        </Heading>

        <Box
          w="900px"
          h="auto"
          p="30px"
          bg="white"
          border="3px solid #00A29D"
          borderRadius="lg"
        >
          <Box h="auto" display="flex" position="relative" alignItems="center">
            <Image
              src={state.com_profileImg}
              w="200px"
              h="200px"
              objectFit="cover"
              borderRadius="50%"
            />
            <Box ml="25px">
              <Heading as="h1" size="lg">
                {state.com_name}
              </Heading>
              <Box
                w="100px"
                h="auto"
                p="5px"
                mt="10px"
                mb="10px"
                bg="#00A29D"
                borderRadius="xl"
                textAlign="center"
              >
                <Text fontSize="md" as="b" color="white">
                  {state.com_category}
                </Text>
              </Box>
              <Box>
                <Text fontSize="md" as="b">
                  {state.com_info}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box h="auto" ml="20px" mt="30px">
            <Text fontSize="lg" as="b" mr="20px">
              투자 목표 금액
            </Text>
            <Text fontSize="lg" as="b" color="#00A29D">
              {(state.com_now_investment / state.com_total_investment) * 100}%
              달성
            </Text>
            <Box position="relative" mt="20px">
              <Box
                position="absolute"
                top="0"
                left="0"
                w="90%"
                h="45px"
                bg="white"
                borderRadius="22.5px"
                border="1px solid #00A29D"
              />
              <Box
                position="absolute"
                top="0"
                left="0"
                w={
                  (state.com_now_investment / state.com_total_investment) * 90 +
                  "%"
                }
                h="45px"
                bg={"linear-gradient(to right, #00A29D, #FFFFFF)"}
                borderRadius="22.5px"
                border="1px solid #00A29D"
              />
            </Box>

            <Box position="relative" color="#00A29D">
              <Box position="absolute" top="55" left="85%">
                <Text as="b">
                  <NumberFormat number={state.com_total_investment} />원
                </Text>
              </Box>
              <Box
                position="absolute"
                top="55"
                left={
                  (state.com_now_investment / state.com_total_investment) * 80 +
                  "%"
                }
              >
                <Text as="b">
                  <NumberFormat number={state.com_now_investment} />원
                </Text>
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyItems="center" mt="120px" ml="20px">
            <Box mr="50px">
              <Text fontSize="lg" as="b">
                티켓 구매하기
              </Text>

              <Box display="flex" mt="20px">
                <Box>
                  <Image
                    src="../image/ticketgrey.png"
                    w="150px"
                    h="150px"
                    mb="15px"
                  />
                  <Box
                    w="150px"
                    h="25px"
                    p="5px"
                    fontSize="xs"
                    color="#00A29D"
                    textAlign="center"
                    bg="#E5F2F2"
                    border="1px solid black"
                    borderRadius="22.5px"
                  >
                    <Text>현재 보유한 티켓 수: {ownerCount}매</Text>
                  </Box>
                </Box>
                <Box ml="30px" textAlign="center" fontWeight="bold">
                  <Text mb="15px" fontSize="xl">
                    <NumberFormat number={state.com_ticket_price} />원
                  </Text>

                  <Box
                    w="120px"
                    h="40px"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid #00A29D"
                    borderRadius="xl"
                  >
                    <Button
                      fontSize="25px"
                      fontWeight="bold"
                      w="40px"
                      h="40px"
                      borderRadius="50%"
                      variant="none"
                      onClick={handleClick_minus}
                      color={sellCount > 0 ? "#00A29D" : "grey"}
                    >
                      -
                    </Button>
                    <Text w="30px">{sellCount}</Text>
                    <Button
                      fontSize="25px"
                      fontWeight="bold"
                      w="40px"
                      h="40px"
                      borderRadius="50%"
                      variant="none"
                      onClick={handleClick_plus}
                      color={
                        ownerCount + sellCount < state.com_ticket_max
                          ? "#00A29D"
                          : "grey"
                      }
                    >
                      +
                    </Button>
                  </Box>

                  <Button
                    w="120px"
                    h="35px"
                    p="10px"
                    mt="15px"
                    color="white"
                    fontSize="sm"
                    bg="#00A29D"
                    borderRadius="17.5px"
                    onClick={handleClick_sell}
                  >
                    구매하기
                  </Button>
                  <Text mt="5px" color="grey" fontSize="2xs">
                    * 최대 {state.com_ticket_max}매까지 구매 가능
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box>
              <Text fontSize="lg" as="b" mb="15px">
                관심있는 회사
              </Text>
              <Box display="flex">
                <Image w="154px" h="185px" src="../image/startup1.png" />
                <Image w="154px" h="185px" src="../image/startup2.png" />
                <Image w="154px" h="185px" src="../image/startup3.png" />
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            textAlign="center"
            mt="100px"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="120px"
              h="30px"
              bg="#E5F2F2"
              fontSize="md"
              fontWeight="bold"
              border="1px solid black"
              borderRadius="xl"
            >
              <Text>{state.com_member}명 참여중</Text>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" p="20px">
            <Button
              w="600px"
              h="60px"
              fontSize="lg"
              fontWeight="bold"
              color="white"
              bg="#00A29D"
              borderRadius="xl"
              onClick={handleClick_chat}
            >
              커뮤니티 참여하기
            </Button>
          </Box>
        </Box>
      </Box>

      {/* BasicUsage Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt="20px" fontSize="xl" fontWeight="bold">
            커뮤니티에 입장하기 위해 티켓을 구매해주세요.
          </ModalBody>
          <ModalFooter>
            <Button bg="#00A29D" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScreenRoomInfo;
