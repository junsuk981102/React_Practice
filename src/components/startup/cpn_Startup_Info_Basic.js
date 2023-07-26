import React, { useState, useEffect } from "react";
import { auth, dbService } from "../../firebase-config";
import { arrayUnion } from "firebase/firestore";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { Box, Text, Heading, Image, IconButton, Flex } from "@chakra-ui/react";

const StartupInfoBasic = ({ state }) => {
  const [userUid, setUserUid] = useState("");
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    const getUserUid = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserUid(user.uid);
        }
      } catch (error) {
        console.log("사용자 UID 가져오기 실패:", error);
      }
    };

    getUserUid();
  }, []);

  function handleClick() {
    setActiveButton((prevState) => (prevState === "yellow" ? "" : "yellow"));
    if (userUid) {
      const startupUid = state.id;
      const userDocRef = dbService.collection("user_list").doc(userUid);
      userDocRef.update({
        startupUids: arrayUnion(startupUid),
      });
    }
  }

  return (
    <Flex alignItems="center" h="auto">
      <Image
        src={state.sup_logo}
        w="200px"
        h="200px"
        borderRadius="xl"
        objectFit="cover"
      />
      <Flex flexDirection="column" ml="25px">
        <Flex alignItems="center">
          <Heading size="lg">{state.sup_name}</Heading>
          <IconButton
            aria-label="Like"
            backgroundColor="white"
            color={activeButton === "yellow" ? "yellow" : "black"}
            onClick={handleClick}
            icon={
              activeButton === "yellow" ? (
                <FaStar style={{ fontSize: "25px" }} />
              ) : (
                <FaRegStar style={{ fontSize: "25px" }} />
              )
            }
          />
        </Flex>
        <Box
          textAlign="center"
          w="100px"
          p="5px"
          marginY="10px"
          bg="#00A29D"
          borderRadius="xl"
          fontWeight="bold"
          fontSize="md"
          color="white"
        >
          {state.sup_category}
        </Box>
        <Text fontSize="md">{state.sup_info}</Text>
      </Flex>
    </Flex>
  );
};

export default StartupInfoBasic;
