import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const VCCategory = ({ selectedValue, handleMenuItemClick }) => {
  return (
    <Menu>
      <MenuButton
        w="100px"
        h="40px"
        bg="#00A29D"
        borderRadius="3xl"
        fontSize="md"
        fontWeight="bold"
        color="white"
      >
        {selectedValue}
      </MenuButton>
      <MenuList bg="#00A29D" color="white">
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("전체")}
        >
          전체
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("VC")}
        >
          VC
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("CVC")}
        >
          CVC
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          borderBottom="1px solid white"
          onClick={() => handleMenuItemClick("ABC")}
        >
          ABC
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default VCCategory;
