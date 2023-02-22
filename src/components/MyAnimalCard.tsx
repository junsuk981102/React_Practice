import React, {FC, useState, ChangeEvent} from "react";
import { Box, Input, InputGroup, InputRightAddon, Text, Button } from "@chakra-ui/react";

import {saleAnimalTokenContract, web3 } from "../web3Config";
import AnimalCard from "./AnimalCard";

export interface IMyAnimalCard{
    animalTokenId: string;
    animalType: string;
    animalPrice: string;
    animalTokenAddress: string;
}

interface MyAnimalCardProps extends IMyAnimalCard{
    saleStatus: boolean;
    account: string;
}

const MyAnimalCard : FC<MyAnimalCardProps> = ({
    animalTokenId,
    animalType,
    animalPrice,
    animalTokenAddress,
    saleStatus,
    account,
}) =>{
    const [sellPrice, setSellPrice] =useState<string>("");
    const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);

    const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) =>{
        setSellPrice(e.target.value);
    };
    
    const onClickSell = async () => {
        try{
            if(!account || !saleStatus) return;

            const response = await saleAnimalTokenContract.methods
                .setForSaleAnimalToken(
                    animalTokenId,
                    web3.utils.toWei(sellPrice,"ether")
                )
                .send({from:account});

            if(response.status){
                setMyAnimalPrice(web3.utils.toWei(sellPrice,"ether"));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box textAlign="center" w={150}>
            <AnimalCard animalType={animalType}/>;
            <Box mt={2}>
                {myAnimalPrice === "0" ? (
                    <>
                        <InputGroup> 
                            <Input type="number" value={sellPrice} onChange={onChangeSellPrice}/>
                            <InputRightAddon children="ETH"/>
                        </InputGroup>
                        <Button size="sm" colorScheme="green" mt={2} onClick={onClickSell}>
                            Sell
                        </Button>
                    </>
                ) : (
                    <Text>{web3.utils.fromWei(myAnimalPrice)} ETH</Text>
                )}
            </Box>
        </Box>
    )
};

export default MyAnimalCard;