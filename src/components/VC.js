import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Image, Button, Heading, Text } from "@chakra-ui/react";

const VC = ({ vcObj }) => {
  const navi = useNavigate();

  function handleClick() {
    navi(`/screen_vc_info`, {
      state: {
        id: vcObj.id,
        vc_name: vcObj.vc_name,
        vc_category: vcObj.vc_category,
        vc_info: vcObj.vc_info,
        vc_backgroundImg: vcObj.vc_backgroundImg,
        vc_logo: vcObj.vc_logo,
      },
    });
  }

  return (
    <div>
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "50%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Image
          src={vcObj.vc_backgroundImg}
          alt="vc background img"
          w="100%"
          h="100%"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "50%",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: -40,
              left: 20,
              width: "80px",
              height: "80px",
              borderRadius: "20%",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Image
              src={vcObj.vc_logo}
              alt="VC logo"
              w="100%"
              h="100%"
              borderRadius="20%"
            />
          </div>

          {/* VC 이름 */}
          <Heading
            //위치
            position="absolute"
            mt="40px"
            ml="20px"
            //글자
            as="h1"
            size="lg"
          >
            {vcObj.vc_name}
          </Heading>

          {/* VC 정보 */}
          <Text
            //위치
            position="absolute"
            mt="80px"
            ml="20px"
            mr="20px"
            //글자
            size="md"
          >
            {vcObj.vc_info}
          </Text>

          {/* VC 카테고리 */}
          <Box
            //위치
            position="absolute"
            mt="5px"
            ml="425px"
            //배경
            borderRadius="xl"
            bg="primary"
            padding="5px 10px"
            //글자
            as="b"
            fontSize="xs"
            color="white"
          >
            {vcObj.vc_category}
          </Box>

          {/* VC INFO 이동버튼 */}
          <Button
            //위치
            position="absolute"
            mt="30px"
            ml="370px"
            //배경
            bg="none"
            variant="none"
            //글자
            as="b"
            fontSize="md"
            onClick={() => handleClick()}
          >
            자세히 보기 {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VC;
