import React from "react";
import Slider from "react-slick";
import { Box } from "@chakra-ui/react";
import Community from "../community/cpn_Community_Card";

// 커뮤니티 리스트 렌더링
export const renderCommunities = (communities) => {
  return communities.map((community) => (
    // 커뮤니티 카드
    <Box key={community.id} m="20px">
      {/* 커뮤니티 카드 정보 */}
      <Community communityObj={community} />
    </Box>
  ));
};

// 커뮤니티 슬라이드 설정
const com_slide_settings = {
  dots: true, // 페이지 표시 여부
  infinite: true, // 무한 루프 여부
  speed: 500, // 슬라이드 전환 속도
  slidesToShow: 3, // 보여질 슬라이드 개수
  slidesToScroll: 2, // 슬라이드 이동시 이동하는 슬라이드 개수
  autoplay: true, // 자동 전환 설정
  autoplaySpeed: 3000, // 자동전환 속도
};

// 커뮤니티 슬라이드 리스트
export const SlideListCom = ({ communities }) => {
  return (
    // 슬라이드 카드
    <Slider {...com_slide_settings}>{renderCommunities(communities)}</Slider>
  );
};
