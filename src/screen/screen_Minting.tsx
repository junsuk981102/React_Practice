import React, { FC, useState, ChangeEvent } from "react";
import { firestore } from "../firebase-config";
import {
  mintGovernanceTokenContract,
  mintGovernanceTokenAddress,
} from "../web3Config";

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
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <span>Initial Price</span>
        <input
          type="number"
          value={initialprice}
          onChange={onChangeInitialPrice}
        />
        <span>Name</span>
        <input type="text" value={name} onChange={onChangeName} />
      </div>
      <button
        style={{ marginTop: "4px", fontSize: "small" }}
        onClick={onClickMint_G}
      >
        Mint Governance
      </button>

      <div>
        <span>Count</span>
        <input type="number" value={count} onChange={onChangeCount} />
        <span>Initial Price</span>
        <input
          type="number"
          value={initialpricemulti}
          onChange={onChangeInitialPriceMulti}
        />
        <span>Name</span>
        <input type="text" value={namemulti} onChange={onChangeNameMulti} />
      </div>
      <button
        style={{ marginTop: "4px", fontSize: "small" }}
        onClick={onClickMultiMint_G}
      >
        Multi Mint Governance
      </button>

      <button
        style={{ marginTop: "4px", fontSize: "small" }}
        onClick={onClickSave_G}
      >
        Save Governance
      </button>
    </div>
  );
};

export default ScreenMinting;
