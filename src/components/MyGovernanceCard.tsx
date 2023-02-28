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
        <Box textAlign="center" w={150}>
            <GovernanceCard GNT_name={GNT_name}/>;
            <Box mt={2}>
                {myGovernanceSalePrice === "0" ? (
                    <>
                        <InputGroup> 
                            <Input type="number" value={sellPrice} onChange={onChangeSellPrice}/>
                            <InputRightAddon children="ETH"/>
                        </InputGroup>
                        <Button size="sm" colorScheme="green" mt={2} onClick={onClickSell}>
                            Sell
                        </Button>
                        <Text>ID : {GNT_Id} </Text>
                        <Text>Initial Price : {GNT_Initial_Price} ETH</Text>
                        
                    </>
                ) : (
                    <>
                        <Text>ID : {GNT_Id} </Text>
                        <Text>Initial Price : {web3.utils.fromWei(GNT_Initial_Price)} ETH</Text>
                        <Text>Sale Price : {web3.utils.fromWei(myGovernanceSalePrice)} ETH</Text>
                    </>
                    
                )}
            </Box>
        </Box>
    )
};

export default MyGovernanceCard;