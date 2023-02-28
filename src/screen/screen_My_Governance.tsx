import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Grid, Flex, Text, Button} from "@chakra-ui/react";

import { mintGovernanceTokenContract, saleGovernanceTokenAddress } from '../web3Config';
import MyGovernanceCard, { IMyGovernanceCard }  from '../components/MyGovernanceCard';

interface MyGovernanceProps{
  account: string;
}

const ScreenMyGovernance: FC<MyGovernanceProps> = ({account}) => {
    const [governanceCardArray, setGovernanceCardArray] = useState<IMyGovernanceCard[]>();
    const [saleStatus, setSaleStatus] =useState<boolean>(false);

    const getGovernanceTokens = async() =>{
        try{
            const balanceLength = await mintGovernanceTokenContract.methods
                .balanceOf(account)
                .call();

            if(balanceLength==="0") return;

            const tempGovernanceCardArray: IMyGovernanceCard[] = [];

            const response = await mintGovernanceTokenContract.methods
                .getGovernanceTokens(account)
                .call();

            response.map((v: IMyGovernanceCard) => {
                tempGovernanceCardArray.push({
                    governanceTokenId: v.governanceTokenId,
                    governanceType: v.governanceType,
                    governancePrice: v.governancePrice,
                    governanceTokenAddress: v.governanceTokenAddress,
                });
            });

            setGovernanceCardArray(tempGovernanceCardArray);
        } catch(error){
            console.error(error);
        }
    };

    const getIsApprovedForAll = async () =>{
        try{
            const response = await mintGovernanceTokenContract.methods
                .isApprovedForAll(account,saleGovernanceTokenAddress)
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

            const response = await mintGovernanceTokenContract.methods
                .setApprovalForAll(saleGovernanceTokenAddress,!saleStatus)
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

            const balanceLength = await mintGovernanceTokenContract.methods
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
        getGovernanceTokens();
    }, [account]);
    
    useEffect(() => { 
        console.log(governanceCardArray)
    }, [governanceCardArray]);

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
                {governanceCardArray &&
                governanceCardArray.map((v,i)=> {
                    return <MyGovernanceCard
                        key={i} 
                        governanceTokenId={v.governanceTokenId}
                        governanceType={v.governanceType}
                        governancePrice={v.governancePrice}
                        governanceTokenAddress={v.governanceTokenAddress}
                        saleStatus={saleStatus}
                        account={account}
                    />
                })}
            </Grid>
        </>
    ) 
};

export default ScreenMyGovernance;