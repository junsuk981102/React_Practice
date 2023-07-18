import React, { useState, useEffect } from "react";
import { dbService } from "../firebase-config";
import Community from "../components/Community";
import Startup from "../components/Startup";
import VC from "../components/VC";
import {
  Box,
  Grid,
  Heading,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ScreenMain = (props) => {
  const boxPaddingLeft = useBreakpointValue({ base: "20px", xl: "200px" });
  const boxPaddingRight = useBreakpointValue({ base: "20px", xl: "200px" });
  const [communities, setCommunities] = useState([]);

  const [startups, setStartups] = useState([]);
  const [vcs, setVCs] = useState([]);

  useEffect(() => {
    dbService.collection("community_list").onSnapshot((snapshot) => {
      const communityArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communityArray);
    });
  }, []);

  useEffect(() => {
    dbService.collection("startup_list").onSnapshot((snapshot) => {
      const startupArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStartups(startupArray);
    });
  }, []);

  useEffect(() => {
    dbService.collection("vc_list").onSnapshot((snapshot) => {
      const vcArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVCs(vcArray);
    });
  }, []);

  const renderCommunities = () => {
    return communities.map((community) => (
      <Box key={community.id}>
        <Box
          //크기
          w="300px"
          h="400px"
          //배경
          bg="white"
          borderRadius="md"
          boxShadow="0 0 15px #00A29D"
          m="20px"
          //구조
          position="relative"
          overflow="hidden"
        >
          <Community communityObj={community} />
        </Box>
      </Box>
    ));
  };

  const renderStartups = () => {
    return startups.map((startup) => (
      <Box key={startup.id}>
        <Box
          w="500px"
          h="360px"
          borderRadius="10px"
          position="relative"
          overflow="hidden"
          boxShadow="0 0 15px #00A29D"
          m="20px"
        >
          <Startup startupObj={startup} />
        </Box>
      </Box>
    ));
  };

  const renderVCs = () => {
    return vcs.map((vc) => (
      <Box key={vc.id}>
        <Box
          w="500px"
          h="360px"
          borderRadius="10px"
          position="relative"
          overflow="hidden"
          boxShadow="0 0 15px #00A29D"
          m="20px"
        >
          <VC vcObj={vc} />
        </Box>
      </Box>
    ));
  };

  const SlideList_com = () => {
    // react-slick 설정 옵션
    const settings = {
      dots: true, // 페이지 표시 여부
      infinite: true, // 무한 루프 여부
      speed: 500, // 슬라이드 전환 속도
      slidesToShow: 3, // 보여질 슬라이드 개수
      slidesToScroll: 1, // 슬라이드 이동시 이동하는 슬라이드 개수
      autoplay: true, // Enable automatic sliding
      autoplaySpeed: 3000, // Set the interval (in milliseconds) between each slide transition
    };

    return (
      <Box>
        <Slider {...settings}>{renderCommunities()}</Slider>
      </Box>
    );
  };

  const SlideList_sup = () => {
    // react-slick 설정 옵션
    const settings = {
      dots: true, // 페이지 표시 여부
      infinite: true, // 무한 루프 여부
      speed: 500, // 슬라이드 전환 속도
      slidesToShow: 2, // 보여질 슬라이드 개수
      slidesToScroll: 1, // 슬라이드 이동시 이동하는 슬라이드 개수
      autoplay: true, // Enable automatic sliding
      autoplaySpeed: 3000, // Set the interval (in milliseconds) between each slide transition
    };

    return (
      <Box>
        <Slider {...settings}>{renderStartups()}</Slider>
      </Box>
    );
  };

  const SlideList_vc = () => {
    // react-slick 설정 옵션
    const settings = {
      dots: true, // 페이지 표시 여부
      infinite: true, // 무한 루프 여부
      speed: 500, // 슬라이드 전환 속도
      slidesToShow: 2, // 보여질 슬라이드 개수
      slidesToScroll: 1, // 슬라이드 이동시 이동하는 슬라이드 개수
      autoplay: true, // Enable automatic sliding
      autoplaySpeed: 3000, // Set the interval (in milliseconds) between each slide transition
    };

    return (
      <Box>
        <Slider {...settings}>{renderVCs()}</Slider>
      </Box>
    );
  };

  return (
    <>
      <Image src="image/stot_main.png" alt="main logo" w="100%" h="auto" />

      <Box pl={boxPaddingLeft} pr={boxPaddingRight} pb="100px">
        <Heading as="h2" size="md" mt="50px" mb="5px">
          새로운 커뮤니티 찾기
        </Heading>
        <Heading as="h1" size="lg" mb="20px">
          투자 중인 커뮤니티
        </Heading>
        <SlideList_com />
        <Heading as="h2" size="md" mt="50px" mb="5px">
          새로운 스타트업 찾기
        </Heading>
        <Heading as="h1" size="lg" mb="20px">
          투자 중인 스타트업
        </Heading>
        {/* <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          gap="20px"
        >
          {renderStartups()}
        </Grid> */}
        <SlideList_sup />
        <Heading as="h2" size="md" mt="50px" mb="5px">
          새로운 VC 찾기
        </Heading>
        <Heading as="h1" size="lg" mb="20px">
          투자 중인 VC
        </Heading>
        {/* <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(500px, 1fr))"
          gap="20px"
        >
          {renderVCs()}
        </Grid> */}
        <SlideList_vc />
      </Box>
    </>
  );
};

export default ScreenMain;
