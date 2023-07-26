import React from "react";
import Slider from "react-slick";
import { Box } from "@chakra-ui/react";
import VCCard from "../vc/cpn_VC_Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// VC 리스트 렌더링
export const renderVCs = (vcs) => {
  return vcs.map((vc) => (
    // VC 카드
    <Box key={vc.id} m="20px">
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
        {/* VC 정보 */}
        <VCCard vcObj={vc} />
      </Box>
    </Box>
  ));
};

// VC 슬라이드 설정
const vc_slide_settings = {
  dots: true, // 페이지 표시 여부
  infinite: true, // 무한 루프 여부
  speed: 500, // 슬라이드 전환 속도
  slidesToShow: 2, // 보여질 슬라이드 개수
  slidesToScroll: 1, // 슬라이드 이동시 이동하는 슬라이드 개수
  autoplay: true, // 자동 전환 설정
  autoplaySpeed: 3000, // 자동전환 속도
};

// VC 슬라이드 리스트
export const SlideListVC = ({ vcs }) => {
  return (
    // 슬라이드 카드
    <Slider {...vc_slide_settings}>{renderVCs(vcs)}</Slider>
  );
};
