import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const StartupCategory = ({ selectedValue, handleMenuItemClick }) => {
  return (
    <Menu>
      {/* 커뮤니티 카테고리 버튼 */}
      <MenuButton
        p="5px 20px"
        bg="#00A29D"
        borderRadius="3xl"
        fontWeight="bold"
        color="white"
      >
        {selectedValue}
      </MenuButton>
      {/* 커뮤니티 카테고리 리스트 */}
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
          onClick={() => handleMenuItemClick("핀테크")}
        >
          핀테크
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("금융")}
        >
          금융
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("반려동물")}
        >
          반려동물
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("VR")}
        >
          VR
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("AR")}
        >
          AR
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("ESG")}
        >
          ESG
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("전기차")}
        >
          전기차
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("블록체인")}
        >
          블록체인
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("음악")}
        >
          음악
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("미술")}
        >
          미술
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("자동차")}
        >
          자동차
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("신기술")}
        >
          신기술
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          onClick={() => handleMenuItemClick("F&B")}
        >
          F&B
        </MenuItem>
        <MenuItem
          bg="none"
          borderTop="1px solid white"
          borderBottom="1px solid white"
          onClick={() => handleMenuItemClick("헬스케어")}
        >
          헬스케어
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default StartupCategory;

//23.07.27 1차 코드 수정 완료
