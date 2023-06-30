import React, { FC, useState, ChangeEvent } from "react";

import { saleAnimalTokenContract, web3 } from "../web3Config";
import AnimalCard from "./AnimalCard";

export interface IMyAnimalCard {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
  animalTokenAddress: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {
  saleStatus: boolean;
  account: string;
}

const MyAnimalCard: FC<MyAnimalCardProps> = ({
  animalTokenId,
  animalType,
  animalPrice,
  animalTokenAddress,
  saleStatus,
  account,
}) => {
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);

  const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;

      const response = await saleAnimalTokenContract.methods
        .setForSaleAnimalToken(
          animalTokenId,
          web3.utils.toWei(sellPrice, "ether")
        )
        .send({ from: account });

      if (response.status) {
        setMyAnimalPrice(web3.utils.toWei(sellPrice, "ether"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", width: 150 }}>
      <AnimalCard animalType={animalType} />
      <div style={{ marginTop: 2 }}>
        {myAnimalPrice === "0" ? (
          <>
            <input
              type="number"
              value={sellPrice}
              onChange={onChangeSellPrice}
            />
            <span>ETH</span>
            <button
              style={{ color: "green", marginTop: 2 }}
              onClick={onClickSell}
            >
              Sell
            </button>
          </>
        ) : (
          <span>{web3.utils.fromWei(myAnimalPrice)} ETH</span>
        )}
      </div>
    </div>
  );
};

export default MyAnimalCard;
