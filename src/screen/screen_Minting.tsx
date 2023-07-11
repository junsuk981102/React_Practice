import React, { FC, useState, ChangeEvent } from "react";
import { firestore } from "../firebase-config";
import {
  mintGovernanceTokenContract,
  mintGovernanceTokenAddress,
} from "../web3Config";
import { Box, Text, Input, Button } from "@chakra-ui/react";

interface MainProps {
  account: string;
}

const ScreenMinting: FC<MainProps> = ({ account }) => {
  const [count, setCount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [initialprice, setInitialPrice] = useState<string>("");
  const [namemulti, setNameMulti] = useState<string>("");
  const [initialpricemulti, setInitialPriceMulti] = useState<string>("");

  const onChangeInitialPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialPrice(e.target.value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
  };

  const onChangeInitialPriceMulti = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialPriceMulti(e.target.value);
  };

  const onChangeNameMulti = (e: ChangeEvent<HTMLInputElement>) => {
    setNameMulti(e.target.value);
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
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      w="100%"
      h="100vh"
    >
      <Box>
        <Text>Initial Price</Text>
        <Input
          type="number"
          value={initialprice}
          onChange={onChangeInitialPrice}
        />
        <Text>Name</Text>
        <Input type="text" value={name} onChange={onChangeName} />
      </Box>
      <Button mt="4px" fontSize="sm" onClick={onClickMint_G}>
        Mint Governance
      </Button>

      <Box>
        <Text>Count</Text>
        <Input type="number" value={count} onChange={onChangeCount} />
        <Text>Initial Price</Text>
        <Input
          type="number"
          value={initialpricemulti}
          onChange={onChangeInitialPriceMulti}
        />
        <Text>Name</Text>
        <Input type="text" value={namemulti} onChange={onChangeNameMulti} />
      </Box>

      <Button mt="4px" fontSize="sm" onClick={onClickMultiMint_G}>
        Multi Mint Governance
      </Button>

      <Button mt="4px" fontSize="sm" onClick={onClickSave_G}>
        Save Governance
      </Button>
    </Box>
  );
};

export default ScreenMinting;
