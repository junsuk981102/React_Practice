import React, {FC, useState, ChangeEvent} from "react";
import { Box, Input, InputGroup, InputRightAddon, Text, Button } from "@chakra-ui/react";

import {saleGovernanceTokenContract, web3 } from "../web3Config";
import GovernanceCard from "./GovernanceCard";

export interface IMyGovernanceCard{
    GNT_Id : string;
    GNT_name : string;
    GNT_Initial_Price : string;
    GNT_Sale_Price : string;
    GNT_Address : string;
}

interface MyGovernanceCardProps extends IMyGovernanceCard{
    saleStatus: boolean;
    account: string;
}

const MyGovernanceCard : FC<MyGovernanceCardProps> = ({
    GNT_Id,
    GNT_name,
    GNT_Initial_Price,
    GNT_Sale_Price,
    GNT_Address,
    saleStatus,
    account,
}) =>{
    const [sellPrice, setSellPrice] =useState<string>("");
    const [myGovernanceSalePrice, setMyGovernanceSalePrice] = useState<string>(GNT_Sale_Price);

    const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) =>{
        setSellPrice(e.target.value);
    };
    
    const onClickSell = async () => {
        try{
            if(!account || !saleStatus) return;

            const response = await saleGovernanceTokenContract.methods
                .setForSaleGovernanceToken(
                    GNT_Id,
                    web3.utils.toWei(sellPrice,"ether")
                )
                .send({from:account});

            if(response.status){
                setMyGovernanceSalePrice(web3.utils.toWei(sellPrice,"ether"));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ textAlign: "center", width: 150 }}>
          <GovernanceCard GNT_name={GNT_name} />
          <div style={{ marginTop: 2 }}>
            {myGovernanceSalePrice === "0" ? (
              <>
                <input type="number" value={sellPrice} onChange={onChangeSellPrice} />
                <span>ETH</span>
                <button style={{ color: "green", marginTop: 2 }} onClick={onClickSell}>
                  Sell
                </button>
                <p>ID: {GNT_Id}</p>
                <p>Initial Price: {GNT_Initial_Price} ETH</p>
              </>
            ) : (
              <>
                <p>ID: {GNT_Id}</p>
                <p>Initial Price: {web3.utils.fromWei(GNT_Initial_Price)} ETH</p>
                <p>Sale Price: {web3.utils.fromWei(myGovernanceSalePrice)} ETH</p>
              </>
            )}
          </div>
        </div>
      );
    };

export default MyGovernanceCard;