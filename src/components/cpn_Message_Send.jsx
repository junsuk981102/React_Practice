import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase-config";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { FaSmile, FaTimesCircle } from "react-icons/fa";

const MessageSend = ({ scroll }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState("close");

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

  const toggleEmojiPicker = () => {
    setOpen(!open);
  };

  const closeEmojiPicker = () => {
    setOpen(false);
  };

  return (
    <Flex as="form" onSubmit={sendMessage} alignItems="center">
      <IconButton
        maxW="100px"
        type="button"
        onClick={toggleEmojiPicker}
        aria-label="Emoji Picker"
        icon={<FaSmile />}
        fontSize="20px"
        mr={2}
        colorScheme="teal"
        variant="outline"
      />

      {open && (
        <IconButton
          maxW="40px"
          onClick={closeEmojiPicker}
          aria-label="Close Emoji Picker"
          icon={<FaTimesCircle />}
          fontSize="20px"
          colorScheme="teal"
          variant="outline"
        />
      )}

      <FormControl flex={1}>
        <Input
          type="text"
          placeholder="Enter your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </FormControl>

      <Button maxW="200px" type="submit" ml={2} colorScheme="teal">
        Send
      </Button>
    </Flex>
  );
};

export default MessageSend;
