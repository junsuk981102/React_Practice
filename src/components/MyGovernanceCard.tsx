import React, {FC, useState, ChangeEvent} from "react";
import { Box, Input, InputGroup, InputRightAddon, Text, Button } from "@chakra-ui/react";

import {saleGovernanceTokenContract, web3 } from "../web3Config";
import GovernanceCard from "./GovernanceCard";

export interface IMyGovernanceCard{
    governanceTokenId: string;
    governanceType: string;
    governancePrice: string;
    governanceTokenAddress: string;
}

interface MyGovernanceCardProps extends IMyGovernanceCard{
    saleStatus: boolean;
    account: string;
}

const MyGovernanceCard : FC<MyGovernanceCardProps> = ({
    governanceTokenId,
    governanceType,
    governancePrice,
    governanceTokenAddress,
    saleStatus,
    account,
}) =>{
    const [sellPrice, setSellPrice] =useState<string>("");
    const [myGovernancePrice, setMyGovernancePrice] = useState<string>(governancePrice);

    const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) =>{
        setSellPrice(e.target.value);
    };
    
    const onClickSell = async () => {
        try{
            if(!account || !saleStatus) return;

            const response = await saleGovernanceTokenContract.methods
                .setForSaleGovernanceToken(
                    governanceTokenId,
                    web3.utils.toWei(sellPrice,"ether")
                )
                .send({from:account});

            if(response.status){
                setMyGovernancePrice(web3.utils.toWei(sellPrice,"ether"));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box textAlign="center" w={150}>
            <GovernanceCard governanceType={governanceType}/>;
            <Box mt={2}>
                {myGovernancePrice === "0" ? (
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
                    <Text>{web3.utils.fromWei(myGovernancePrice)} ETH</Text>
                )}
            </Box>
        </Box>
    )
};

export default MyGovernanceCard;