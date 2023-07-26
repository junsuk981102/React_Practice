import React, { FC, useState, ChangeEvent } from "react";
import { firestore } from "../../firebase-config";
import {
  mintGovernanceTokenContract,
  mintGovernanceTokenAddress,
} from "../../web3Config";
import { Box, Text, Input, Button } from "@chakra-ui/react";

interface MainProps {
  account: string;
}

const ScreenMinting: FC<MainProps> = ({ account }) => {
  const [count, setCount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [namemulti, setNameMulti] = useState<string>("");
  const [initialprice, setInitialPrice] = useState<string>("");
  const [initialpricemulti, setInitialPriceMulti] = useState<string>("");

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeNameMulti = (e: ChangeEvent<HTMLInputElement>) => {
    setNameMulti(e.target.value);
  };
  const onChangeInitialPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialPrice(e.target.value);
  };
  const onChangeInitialPriceMulti = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialPriceMulti(e.target.value);
  };

  const onClickMint_G = async () => {
    try {
      const response = await mintGovernanceTokenContract.methods
        .mintGovernanceToken(initialprice, name)
        .send({ from: account });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickMultiMint_G = async () => {
    try {
      const response = await mintGovernanceTokenContract.methods
        .multi_mintGovernanceToken(count, initialpricemulti, namemulti)
        .send({ from: account });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSave_G = async () => {
    await firestore.collection("governance").add({
      address: mintGovernanceTokenAddress,
    });
  };

  return (
    // Minting 페이지 전체 화면

    // Minting 페이지 전체 배경 화면
    <Box
      //정렬
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      //크기
      w="100%"
      h="100vh"
    >
      {/* 단수 Minting 섹션 */}
      <Box>
        <Text>Initial Price</Text>
        <Input
          //기능
          type="number"
          value={initialprice}
          onChange={onChangeInitialPrice}
        />
        <Text>Name</Text>
        <Input
          //기능
          type="text"
          value={name}
          onChange={onChangeName}
        />
      </Box>
      <Button
        //여백
        mt="4px"
        //글자
        fontSize="sm"
        //기능
        onClick={onClickMint_G}
      >
        Mint Governance
      </Button>

      {/* 복수 Minting 섹션 */}
      <Box>
        <Text>Count</Text>
        <Input
          //기능
          type="number"
          value={count}
          onChange={onChangeCount}
        />
        <Text>Initial Price</Text>
        <Input
          //기능
          type="number"
          value={initialpricemulti}
          onChange={onChangeInitialPriceMulti}
        />
        <Text>Name</Text>
        <Input
          //기능
          type="text"
          value={namemulti}
          onChange={onChangeNameMulti}
        />
      </Box>
      <Button
        //여백
        mt="4px"
        //글자
        fontSize="sm"
        //기능
        onClick={onClickMultiMint_G}
      >
        Multi Mint Governance
      </Button>

      {/* Minting 저장 버튼 */}
      <Button
        //여백
        mt="4px"
        //글자
        fontSize="sm"
        //기능
        onClick={onClickSave_G}
      >
        Save Governance
      </Button>
    </Box>
  );
};

export default ScreenMinting;
