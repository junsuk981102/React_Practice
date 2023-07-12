import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

const ScreenRoomInfo = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const { state } = useLocation();
  console.log(state.name);

  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
  }

  function handleClick_chat() {
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
      },
    });
  }

  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  return (
    <>
      <Box bg="#E5F2F2" h="100vh" borderTop="1px solid #00A29D">
        <Box
          style={{
            paddingLeft: `${windowWidth > 1700 ? "500px" : "50px"}`,
            paddingRight: `${windowWidth > 1700 ? "500px" : "10px"}`,
          }}
        >
          <Heading
            //위치
            mt="30px"
            mb="30px"
            //크기
            as="h1"
            size="lg"
          >
            커뮤니티 소개
          </Heading>

          <Box
            w="1000px"
            h="1000px"
            p="30px"
            bg="white"
            border="3px solid #00A29D"
            borderRadius="lg"
          >
            <Box
              h="auto"
              display="flex"
              position="relative"
              alignItems="center"
            >
              <Image
                src={state.com_profileImg}
                w="200px"
                h="200px"
                objectFit="cover"
                borderRadius="50%"
              />
              <Box ml="25px">
                <Heading
                  //글자
                  as="h1"
                  size="lg"
                >
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
                ></Box>
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  w={
                    (state.com_now_investment / state.com_total_investment) *
                      90 +
                    "%"
                  }
                  h="45px"
                  bg={"linear-gradient(to right, #00A29D, #FFFFFF)"}
                  bo
                  borderRadius="22.5px"
                  border="1px solid #00A29D"
                ></Box>
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
                    (state.com_now_investment / state.com_total_investment) *
                      80 +
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
                      <Text>현재 보유한 티켓 수 : 5매</Text>
                    </Box>
                  </Box>
                  <Box ml="30px" textAlign="center" fontWeight="bold">
                    <Text mb="15px" fontSize="xl">
                      <NumberFormat number={state.com_ticket_price} />원
                    </Text>
                    <Button
                      w="120px"
                      h="35px"
                      p="10px"
                      mt="15px"
                      color="white"
                      fontSize="sm"
                      bg="#00A29D"
                      borderRadius="17.5px"
                      onClick={() => handleClick()}
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
                onClick={() => handleClick_chat()}
              >
                커뮤니티 참여하기
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScreenRoomInfo;
