import React from "react";
import Register from "../components/cpn_Register";
import { Box } from "@chakra-ui/react";

const ScreenRegister = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      bg="#E5F2F2"
      borderTop="1px solid #00A29D"
    >
      <Register />
    </Box>
  );
};

export default ScreenRegister;
