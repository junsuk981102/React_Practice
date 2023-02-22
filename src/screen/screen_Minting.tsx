import React, { FC, useState } from "react";
import { firestore } from "../firebase-config";
import { Box, Text, Flex, Button } from "@chakra-ui/react";

import { mintAnimalTokenContract, mintAnimalTokenAddress, mintPlantTokenContract , mintPlantTokenAddress} from "../web3Config";
import  AnimalCard  from "../components/AnimalCard"
import  PlantCard  from "../components/PlantCard"

interface MainProps {
    account: string;
}

const ScreenMinting: FC<MainProps> = ({ account }) => {
    const [newAnimalType, setNewAnimalType] = useState<string>();
    const [newPlantType, setNewPlantType] = useState<string>();

    const onClickMint_A = async () => {
        try{
            if(!account) return;

            const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({from: account});

            if(response.status){
                const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();
                const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength,10) - 1).call();
                const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();
                const animalTokenAddress = await mintAnimalTokenContract.methods.animalTokenAddr(animalTokenId).call();
                setNewAnimalType(animalType);
            }
        } catch(error) {
            console.error(error);
        }
    };

    const onClickMint_P = async () => {
        try{
            if(!account) return;

            const response = await mintPlantTokenContract.methods.mintPlantToken().send({from: account});

            if(response.status){
                const balanceLength = await mintPlantTokenContract.methods.balanceOf(account).call();
                const plantTokenId = await mintPlantTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength,10) - 1).call();
                const plantType = await mintPlantTokenContract.methods.plantTypes(plantTokenId).call();
                const plantTokenAddress = await mintPlantTokenContract.methods.plantTokenAddr(plantTokenId).call();
                setNewPlantType(plantType);
            }
        } catch(error) {
            console.error(error);
        }
    };

    const onClickSave_A = async () => {
        await firestore.collection("animal").add({
            address: mintAnimalTokenAddress,
        });
    };

    const onClickSave_P = async () => {
        await firestore.collection("plant").add({
            address: mintPlantTokenAddress,
        });
    };

    return (
        <Flex w="full" h="100vh" justifyContent="center" alignItems="center" direction="column">
            <Box>
                {newAnimalType ? (
                    <AnimalCard animalType={newAnimalType} />
                ) : (
                    <Text>Let's mint Animal Card!!!</Text>
                )}
            </Box>
            <Button mt={4} size="sm" onClick={onClickMint_A}>Mint Animal</Button>
            <Button mt={4} size="sm" onClick={onClickSave_A}>Save Animal</Button>
            <Box>
                {newPlantType ? (
                    <PlantCard plantType={newPlantType} />
                ) : (
                    <Text>Let's mint Plant Card!!!</Text>
                )}
            </Box>
            <Button mt={4} size="sm" onClick={onClickMint_P}>Mint Plant</Button>
            <Button mt={4} size="sm" onClick={onClickSave_P}>Save Plant</Button>
        </Flex>
    );
}

export default ScreenMinting;