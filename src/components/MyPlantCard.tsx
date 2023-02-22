import React, {FC, useState, ChangeEvent} from "react";
import { Box, Input, InputGroup, InputRightAddon, Text, Button } from "@chakra-ui/react";

import {salePlantTokenContract, web3 } from "../web3Config";
import PlantCard from "./PlantCard";

export interface IMyPlantCard{
    plantTokenId: string;
    plantType: string;
    plantPrice: string;
    plantTokenAddress: string;
}

interface MyPlantCardProps extends IMyPlantCard{
    saleStatus: boolean;
    account: string;
}

const MyPlantCard : FC<MyPlantCardProps> = ({
    plantTokenId,
    plantType,
    plantPrice,
    plantTokenAddress,
    saleStatus,
    account,
}) =>{
    const [sellPrice, setSellPrice] =useState<string>("");
    const [myPlantPrice, setMyPlantPrice] = useState<string>(plantPrice);

    const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) =>{
        setSellPrice(e.target.value);
    };
    
    const onClickSell = async () => {
        try{
            if(!account || !saleStatus) return;

            const response = await salePlantTokenContract.methods
                .setForSalePlantToken(
                    plantTokenId,
                    web3.utils.toWei(sellPrice,"ether")
                )
                .send({from:account});

            if(response.status){
                setMyPlantPrice(web3.utils.toWei(sellPrice,"ether"));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box textAlign="center" w={150}>
            <PlantCard plantType={plantType}/>;
            <Box mt={2}>
                {myPlantPrice === "0" ? (
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
                    <Text>{web3.utils.fromWei(myPlantPrice)} ETH</Text>
                )}
            </Box>
        </Box>
    )
};

export default MyPlantCard;