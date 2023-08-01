import React, { useState } from "react";
import { deleteDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "../../firebase-config";
import { dbService } from "../../firebase-config";
import { Box, Image } from "@chakra-ui/react";

const Thread = ({ threadObj }) => {
  const [editing, setEditing] = useState(false);
  return (
    <Box>
      <h4>{threadObj.text}</h4>
      {threadObj.attachmentUrl && <Image src={threadObj.attachmentUrl} />}
    </Box>
  );
};
export default Thread;
