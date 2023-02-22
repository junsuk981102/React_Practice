import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Grid, Flex, Text, Button} from "@chakra-ui/react";

import { mintPlantTokenContract, salePlantTokenAddress} from '../web3Config';
import MyPlantCard, { IMyPlantCard }  from '../components/MyPlantCard';

interface MyPlantProps{
  account: string;
}

const ScreenMyPlant : FC<MyPlantProps> = ({account}) => {
    const [plantCardArray, setPlantCardArray] = useState<IMyPlantCard[]>();
    const [saleStatus, setSaleStatus] =useState<boolean>(false);

    const getPlantTokens = async() =>{
        try{
            const balanceLength = await mintPlantTokenContract.methods
                .balanceOf(account)
                .call();

            if(balanceLength==="0") return;

            const tempPlantCardArray: IMyPlantCard[] = [];

            const response = await mintPlantTokenContract.methods
                .getPlantTokens(account)
                .call();

            response.map((v: IMyPlantCard) => {
                tempPlantCardArray.push({
                    plantTokenId: v.plantTokenId,
                    plantType: v.plantType,
                    plantPrice: v.plantPrice,
                    plantTokenAddress: v.plantTokenAddress,
                });
            });
            
            setPlantCardArray(tempPlantCardArray);
        } catch(error){
            console.error(error);
        }
    };
    const getIsApprovedForAll = async () =>{
        try{
            const response = await mintPlantTokenContract.methods
                .isApprovedForAll(account,salePlantTokenAddress)
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

            const response = await mintPlantTokenContract.methods
                .setApprovalForAll(salePlantTokenAddress,!saleStatus)
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

            const balanceLength = await mintPlantTokenContract.methods
                .balanceOf(account)
                .call();

            if(balanceLength==="0"){
                console.log("You cannot enter the room because you don't have NFT for this room.");
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
        getPlantTokens();
    }, [account]);
    
    useEffect(() => { 
        console.log(plantCardArray)
    }, [plantCardArray]);

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
                {plantCardArray &&
                plantCardArray.map((v,i)=> {
                    return <MyPlantCard
                        key={i} 
                        plantTokenId={v.plantTokenId}
                        plantType={v.plantType}
                        plantPrice={v.plantPrice}
                        plantTokenAddress={v.plantTokenAddress}
                        saleStatus={saleStatus}
                        account={account}
                    />
                })}
            </Grid>
        </>
    ) 
};

export default ScreenMyPlant;