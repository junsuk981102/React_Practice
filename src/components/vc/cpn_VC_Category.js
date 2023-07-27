import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const VCCategory = ({ selectedValue, handleMenuItemClick }) => {
  return (
    <Menu>
      {/* VC 카테고리 버튼 */}
      <MenuButton
        p="5px 20px"
        bg="#00A29D"
        borderRadius="3xl"
        fontWeight="bold"
        color="white"
      >
        {selectedValue}
      </MenuButton>
      {/* VC 카테고리 리스트 */}
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

//23.07.27 1차 코드 수정 완료
