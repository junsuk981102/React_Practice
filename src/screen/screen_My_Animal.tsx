import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Grid, Flex, Text, Button} from "@chakra-ui/react";

import { mintAnimalTokenContract, saleAnimalTokenAddress } from '../web3Config';
import MyAnimalCard, { IMyAnimalCard }  from '../components/MyAnimalCard';

interface MyAnimalProps{
  account: string;
}

const ScreenMyAnimal: FC<MyAnimalProps> = ({account}) => {
    const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
    const [saleStatus, setSaleStatus] =useState<boolean>(false);

    const getAnimalTokens = async() =>{
        try{
            const balanceLength = await mintAnimalTokenContract.methods
                .balanceOf(account)
                .call();

            if(balanceLength==="0") return;

            const tempAnimalCardArray: IMyAnimalCard[] = [];

            const response = await mintAnimalTokenContract.methods
                .getAnimalTokens(account)
                .call();

            response.map((v: IMyAnimalCard) => {
                tempAnimalCardArray.push({
                    animalTokenId: v.animalTokenId,
                    animalType: v.animalType,
                    animalPrice: v.animalPrice,
                    animalTokenAddress: v.animalTokenAddress,
                });
            });

            setAnimalCardArray(tempAnimalCardArray);
        } catch(error){
            console.error(error);
        }
    };

    const getIsApprovedForAll = async () =>{
        try{
            const response = await mintAnimalTokenContract.methods
                .isApprovedForAll(account,saleAnimalTokenAddress)
                .call();

            if(response.status){
                setSaleStatus(response);
            }
        } catch (error){
            console.error(error);
        }
    };
 
    const onClickApproveToggle = async () => {
        try{
            if(!account) return;

            const response = await mintAnimalTokenContract.methods
                .setApprovalForAll(saleAnimalTokenAddress,!saleStatus)
                .send({from:account});
            
            if(response.status){
                setSaleStatus(!saleStatus);
            }
        } catch(error){
            console.error(error);
        }
    }

    const navigate = useNavigate();

    const onClickRoom = async () => {
        try{
            if(!account) return;

            const balanceLength = await mintAnimalTokenContract.methods
                .balanceOf(account)
                .call();

            if(balanceLength==="0"){
                console.log("You cannot enter the room because you don't have NFTs for this room.");
                return;
            }

            console.log("You can enter the room because you have NFTs for this room.");
            navigate("/screen_token_gating");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() =>{
        if (!account) return;
        
        getIsApprovedForAll();
        getAnimalTokens();
    }, [account]);
    
    useEffect(() => { 
        console.log(animalCardArray)
    }, [animalCardArray]);

    return(
        <>
            <Flex alignItems="center">
                <Text display="inline-block">Sale Status : {saleStatus ? "True" : "False"}</Text>
                <Button size="xs" ml={2} colorScheme={saleStatus ? "red" : "blue"} onClick={onClickApproveToggle}> 
                    {saleStatus ? "Cancel" : "Approve"}
                </Button>
            </Flex>
            <Button size="sm" colorScheme="green" mt={2} onClick={onClickRoom}>
                Room
            </Button>
            <Grid templateColumns="repeat(4, 1fr)" gap={8} mt={4}>
                {animalCardArray &&
                animalCardArray.map((v,i)=> {
                    return <MyAnimalCard
                        key={i} 
                        animalTokenId={v.animalTokenId}
                        animalType={v.animalType}
                        animalPrice={v.animalPrice}
                        animalTokenAddress={v.animalTokenAddress}
                        saleStatus={saleStatus}
                        account={account}
                    />
                })}
            </Grid>
        </>
    ) 
};

export default ScreenMyAnimal;