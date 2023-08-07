import React from "react";
import Slider from "react-slick";
import VCCard from "../vc/cpn_VC_Card";
import { Flex } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// VC 리스트 렌더링
export const renderVCs = (vcs) => {
  return vcs.map((vc) => (
    // VC 카드
    <Flex key={vc.id} m="20px">
      {/* VC 정보 */}
      <VCCard vcObj={vc} />
    </Flex>
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

//23.07.27 1차 코드 수정
//23.08.07 2차 코드 수정
