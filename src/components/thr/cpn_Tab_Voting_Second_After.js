import React, { useState, useEffect } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

const TabVotingSecondAfter = ({ state }) => {
  const percentyes = state.com_syes; // 찬성 득표
  const percentno = state.com_sno; // 반대 득표
  const percentyesorno = state.com_sall; // 총 득표
  const [name, setName] = useState("");
  const [imagepath, setImagePath] = useState("");

  useEffect(() => {
    const percent1 = state.com_fone; // 1번 득표
    const percent2 = state.com_ftwo; // 2번 득표
    const percent3 = state.com_fthree; // 3번 득표
    const largestPercent = Math.max(percent1, percent2, percent3);
    if (percent1 === largestPercent) {
      setName("페오펫");
      setImagePath("/image/community/company_ex1.png");
    } else if (percent2 === largestPercent) {
      setName("펫프랜즈");
      setImagePath("/image/community/company_ex2.png");
    } else {
      setName("핏펫");
      setImagePath("/image/community/company_ex3.png");
    }
  }, [state]);

  return (
    <>
      {/* 정보 */}
      <Flex flexDirection="column" p="10px">
        {/* 제목 */}
        <Flex m="0 0 15px 0">
          <Text fontSize="2xl" fontWeight="bold" m="0 15px 0 0">
            2차 투표 종료
          </Text>
          <Image src="../image/community/icon_voting.png" w="30px" h="30px" />
        </Flex>
        {/* 설명 */}
        <Text m="0 0 15px 0">
          {state.com_name} 2차 투표가 모두 종료되었습니다. <br />
          투표 결과에 따라, 1주일 이내에 {"["}
          {name}
          {"]"}에 대한 투자 계약이 시작됩니다.
        </Text>
        <Flex flexDirection="column" alignItems="center">
          <Text m="25px" fontSize="lg" fontWeight="bold">
            {"<"}투표 결과{">"}
          </Text>
          <Flex flexDirection="column" textAlign="center">
            {percentyes >= percentno ? (
              <>
                <Image src={imagepath} w="250px" h="250px" />

                <Text fontSize="2xl" fontWeight="bold" m="5px 0">
                  {name} 찬성
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="#00A29D">
                  {((percentyes / percentyesorno) * 100).toFixed(1) + "%"}
                </Text>
              </>
            ) : (
              <>
                <Image src={imagepath} w="250px" h="250px" />

                <Text fontSize="2xl" fontWeight="bold" m="5px 0">
                  {name} 반대
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="#00A29D">
                  {((percentno / percentyesorno) * 100).toFixed(1) + "%"}
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default TabVotingSecondAfter;

//23.07.27 1차 코드 수정
//23.08.17 2차 코드 수정
