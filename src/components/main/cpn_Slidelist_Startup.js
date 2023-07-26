import React from "react";
import Slider from "react-slick";
import { Box } from "@chakra-ui/react";
import StartupCard from "../startup/cpn_Startup_Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 스타트업 리스트 렌더링
export const renderStartups = (startups) => {
  return startups.map((startup) => (
    // 스타트업 카드
    <Box key={startup.id} m="20px">
      <Box
        //위치
        position="relative"
        //크기 및 여백
        w="500px"
        h="360px"
        m="20px"
        //배경
        bg="white"
        borderRadius="xl"
        boxShadow="0 0 10px #00A29D"
        overflow="hidden"
      >
        {/* 스타트업 카드 정보 */}
        <StartupCard startupObj={startup} />
      </Box>
    </Box>
  ));
};

// 스타트업 슬라이드 설정
const sup_slide_settings = {
  dots: true, // 페이지 표시 여부
  infinite: true, // 무한 루프 여부
  speed: 500, // 슬라이드 전환 속도
  slidesToShow: 2, // 보여질 슬라이드 개수
  slidesToScroll: 1, // 슬라이드 이동시 이동하는 슬라이드 개수
  autoplay: true, // 자동 전환 설정
  autoplaySpeed: 3000, // 자동전환 속도
};

// 스타트업 슬라이드 리스트
export const SlideListSup = ({ startups }) => {
  return (
    // 슬라이드 카드
    <Slider {...sup_slide_settings}>{renderStartups(startups)}</Slider>
  );
};
