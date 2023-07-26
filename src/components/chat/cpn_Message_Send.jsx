import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase-config";
import { useLocation } from "react-router-dom";
import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
// import { IconButton } from "@chakra-ui/react";

// import { FaSmile } from "react-icons/fa";

const MessageSend = ({ scroll }) => {
  const [input, setInput] = useState("");
  // const [open, setOpen] = useState("close");

  const { state } = useLocation();

  const communityid = state.id;
  const communityaddress = "community_list/" + communityid + "/message";

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, communityaddress), {
      text: input,
      name: displayName,
      uid,
      photo: photoURL,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  // const toggleEmojiPicker = () => {
  //   setOpen(!open);
  // };

  return (
    <Flex
      //정렬
      alignItems="center"
      //기능
      as="form"
      onSubmit={sendMessage}
    >
      {/* <IconButton
        //크기 및 여백
        maxW="100px"
        mr={2}
        //배경
        colorScheme="teal"
        variant="outline"
        //글자
        fontSize="20px"
        //기능
        type="button"
        onClick={toggleEmojiPicker}
        aria-label="Emoji Picker"
        icon={<FaSmile />}
      /> */}

      <FormControl flex={1}>
        <Input
          //기능
          type="text"
          placeholder="Enter your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </FormControl>

      <Button
        //크기 및 여백
        maxW="200px"
        ml={2}
        //배경
        colorScheme="teal"
        //기능
        type="submit"
      >
        Send
      </Button>
    </Flex>
  );
};

export default MessageSend;
