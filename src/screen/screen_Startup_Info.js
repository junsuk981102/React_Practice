import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  Image,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";

const ScreenStartupInfo = () => {
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20x", xl: "200px" });
  const { state } = useLocation();

  return (
    <>
      <Box
        pl={boxPaddingLeft}
        pr={boxPaddingRight}
        pb="50px"
        bg="#E5F2F2"
        h="auto"
        borderTop="1px solid #00A29D"
      >
        <Heading
          //위치
          mt="30px"
          mb="30px"
          //크기
          as="h1"
          size="lg"
        >
          스타트업 소개
        </Heading>

        <Box
          w="800px"
          h="auto"
          p="30px"
          bg="white"
          border="3px solid #00A29D"
          borderRadius="lg"
        >
          <Box h="auto" display="flex" position="relative" alignItems="center">
            <Image
              src={state.sup_logo}
              w="200px"
              h="200px"
              objectFit="cover"
              borderRadius="lg"
            />
            <Box ml="25px">
              <Heading
                //글자
                as="h1"
                size="lg"
              >
                {state.sup_name}
              </Heading>
              <Box
                w="150px"
                h="auto"
                p="5px"
                mt="10px"
                mb="10px"
                bg="#00A29D"
                borderRadius="xl"
                textAlign="center"
              >
                <Text fontSize="md" as="b" color="white">
                  {state.sup_category}
                </Text>
              </Box>
              <Box>
                <Text fontSize="md" as="b">
                  {state.sup_info}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box ml="20px" mt="30px">
            <Text fontSize="lg" as="b">
              기업정보
            </Text>
            <Box display="flex" flexDirection="row" ml="10px" mt="25px">
              <Box display="flex" flexDirection="row" mr="150px">
                <Box
                  display="flex"
                  flexDirection="column"
                  mr="50px"
                  color="grey"
                >
                  <Text mb="10px">대표자</Text>
                  <Text mb="10px">국적</Text>
                  <Text>회사구분</Text>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text mb="10px">최현일</Text>
                  <Text mb="10px">한국</Text>
                  <Text>중소기업</Text>
                </Box>
              </Box>

              <Box display="flex" flexDirection="row">
                <Box
                  display="flex"
                  flexDirection="column"
                  mr="50px"
                  color="grey"
                >
                  <Text mb="10px">발행주식</Text>
                  <Text mb="10px">업종</Text>
                  <Text>홈페이지</Text>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text mb="10px">통일 주권</Text>
                  <Text mb="10px">데이터베이스 및 온라인 정보 제공업</Text>
                  <Text>http://www.peopet.co.kr</Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider mt="20px" />

          <Box h="auto" ml="20px" mt="20px" display="flex" flexDirection="row">
            <Box mr="190px">
              <Text fontSize="lg" as="b">
                투자정보
              </Text>
              <Box display="flex" flexDirection="row" ml="10px" mt="25px">
                <Box
                  display="flex"
                  flexDirection="column"
                  mr="50px"
                  color="grey"
                >
                  <Text mb="10px">최종투자 단계</Text>
                  <Text mb="10px">누적투자 금액</Text>
                  <Text>투자유치 횟수</Text>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text mb="10px">Seed</Text>
                  <Text mb="10px">1억 미만</Text>
                  <Text>3회</Text>
                </Box>
              </Box>
            </Box>

            <Box>
              <Text fontSize="lg" as="b">
                투자자
              </Text>
              <Box display="flex" flexDirection="row" ml="10px" mt="20px">
                <Image w="90px" h="110px" src="../image/startup1.png" />
                <Image w="90px" h="110px" src="../image/startup2.png" />
                <Image w="90px" h="110px" src="../image/startup3.png" />
              </Box>
            </Box>
          </Box>

          <Divider mt="20px" />

          <Box h="auto" ml="20px" mt="20px">
            <Text fontSize="lg" as="b">
              서비스/제품
            </Text>
            <Box display="flex" flexDirection="row" ml="10px" mt="25px">
              <Image
                src={state.sup_logo}
                w="60px"
                h="60px"
                objectFit="cover"
                borderRadius="30px"
              />
              <Box display="flex" flexDirection="column" mt="5px" ml="10px">
                <Text fontSize="lg" as="b">
                  페오펫
                </Text>
                <Text color="#00A29D" fontSize="sm" as="b">
                  간편 모바일 반려동물등록 서비스
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScreenStartupInfo;
