import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Text, Image, Divider } from "@chakra-ui/react";

const ScreenNewsletter = () => {
  return (
    <>
      {/* 뉴스레터 전체 화면 */}

      {/* 뉴스레터 전체 배경 화면 */}
      <Box
        //정렬
        display="flex"
        justifyContent="center"
        //크기
        w="100vw"
        //배경
        bg="#EAE7DE"
      >
        <Box
          //정렬
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          //크기 및 여백
          w="800px"
          h="100%"
          p="50px"
          //배경
          bg="#EAE7DE"
        >
          <Image
            //사진 위치
            src="../image/newsletter/newsletter1.png"
            //크기 및 여백
            w="360px"
            h="54px"
            mb="50px"
          />
          <Divider
            //크기 및 여백
            w="750px"
            h="1px"
            mb="20px"
            //배경
            backgroundColor="black"
          />
          <Button
            //배경
            variant="link"
            //글자
            color="#FF5C00"
          >
            테크
          </Button>
          <Text
            //여백
            mt="10px"
            mb="10px"
            //글자
            fontSize="xl"
            fontWeight="bold"
          >
            투자의 새로운 길
          </Text>
          <Text
            //글자
            fontSize="sm"
            fontWeight="bold"
          >
            2023/07/14
          </Text>
          <Divider
            //크기 및 여백
            w="750px"
            h="1px"
            mt="30px"
            mb="30px"
            //배경
            backgroundColor="black"
          />
          <Image
            //사진 위치
            src="../image/newsletter/newsletter2.png"
            //크기
            w="469px"
            h="249px"
          />
          <Text
            //여백
            mt="10px"
            mb="10px"
            //글자
            fontSize="lg"
            fontWeight="bold"
          >
            벤처투자 혹한기.. 시장 환경이 근본적으로 변했습니다
          </Text>
          <Text
            //글자
            fontSize="sm"
            fontWeight="bold"
          >
            &nbsp;&nbsp;기술 잠재력, 창업팀의 비전 및 시장의 기대를 조합한
            스토리만으로도 단계별로 투자가 쉽게 이루어지고 구체적인 비즈니스
            계획 없이 🤑 투자금만으로 생명 연장하는 스타트업이 양산되던 시대는
            끝난 것 같습니다.
            <br />
            <br />
            &nbsp;&nbsp;벤처투자 호황기 때는 스타트업이 시드 펀딩부터 시작하여
            투자금이 소진되는 1~2년마다 투자 라운드를 열며 기업가치를 올리고
            펀딩 규모도 늘리는 것을 반복하는 것이 당연한 코스인 것처럼
            받아들여졌습니다.
            <br />
            <br />
            &nbsp;&nbsp;게다가 투자 라운드에서 목표한 만큼 투자금을 유치하게
            되면 창업자에게 축하 세례가 쏟아지거나 심지어 성공사례 강연 다니는
            것도 괴랄한 감이 있었죠.
            <br />
            <br />
            &nbsp;&nbsp;이제는 스타트업이 투자자에게 확신을 줄 수 있는 숫자를
            보여주지 못하면 투자를 기대하기 어려운 시대라고 봐야 할 것입니다.
            <br />
            <br />
            &nbsp;&nbsp;많은 수의 스타트업들은 웬만한 지표 성적만으로는 투자자의
            눈높이를 충족하기 어렵기에 창업자들은 펀딩하기 전에
            <br />
            1. 자체 생존 가능한 손익구조부터 만들고
            <br />
            2️. 합리적인 1~2년 사업성장 계획과 비용 효율적인 예산 수립에
            집중해야 할 것입니다.
          </Text>
          <Divider
            //크기 및 여백
            w="750px"
            h="1px"
            mt="30px"
            mb="30px"
            //배경
            backgroundColor="black"
          />
          <Image
            //사진 위치
            src="../image/newsletter/newsletter3.png"
            //크기
            w="469px"
            h="249px"
            //배경
            objectFit="cover"
          />
          <Text
            //여백
            mt="10px"
            mb="10px"
            //글자
            fontSize="lg"
            fontWeight="bold"
          >
            “STOT” 새로운 투자에 눈을 뜨다{" "}
          </Text>
          <Text
            //글자
            fontSize="sm"
            fontWeight="bold"
          >
            &nbsp;&nbsp;벤처투자 혹한기가 지속되는 와중에 새로운 방식의 투자
            플랫폼이 등장하고 있습니다. 바로 커뮤니티형 스타트업 투자 플랫폼으로
            다양한 투자자들에게 새로운 경험을 제공하면서 성장 가능성이 있는
            스타트업에게 투자할 수 있는 웹 플랫폼입니다.
            <br />
            <br />
            &nbsp;&nbsp;STOT의 가장 큰 목적 중에 하나는 투자자들에게 새로운
            방식의 투자 경험을 제공하는 것입니다. 특히 비슷한 관심사를 가진
            사람들과 커뮤니티에서 스타트업에 대한 다양한 정보를 주고받을 수
            있습니다. 그 이후에 합리적인 방법으로 선택한 스타트업에 직접 투자할
            수 있습니다.
            <br />
            <br />
            &nbsp;&nbsp;STOT은 다음과 같은 사람들을 찾고 있습니다.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;* 스타트업에 투자하고 싶은데 어디서
            시작해야할지 모르겠다면?
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;* 충분한 정보와 합리적인 방법으로 투자하고
            싶다면?
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;* 비슷한 관심사를 가진 사람들과 함께
            투자하고 싶다면?
          </Text>
          <Button
            //크기 및 여백
            w="500px"
            mt="50px"
            //배경
            bg="#FF5C00"
            variant="solid"
            //글자
            color="white"
            fontSize="xl"
            fontWeight="bold"
            //기능
            as={Link}
            to={"/"}
          >
            STOT 참여하기
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ScreenNewsletter;
