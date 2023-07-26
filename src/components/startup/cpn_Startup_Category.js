import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const StartupCategory = ({ selectedValue, handleMenuItemClick }) => {
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
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("전체")}
        >
          전체
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("핀테크")}
        >
          핀테크
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("금융")}
        >
          금융
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("반려동물")}
        >
          반려동물
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("VR")}
        >
          VR
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("AR")}
        >
          AR
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("ESG")}
        >
          ESG
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("전기차")}
        >
          전기차
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("블록체인")}
        >
          블록체인
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("음악")}
        >
          음악
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("미술")}
        >
          미술
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("자동차")}
        >
          자동차
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("신기술")}
        >
          신기술
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("F&B")}
        >
          F&B
        </MenuItem>
        <MenuItem
          //배경
          bg="none"
          borderTop="1px solid white"
          borderBottom="1px solid white"
          //기능
          onClick={() => handleMenuItemClick("헬스케어")}
        >
          헬스케어
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default StartupCategory;
