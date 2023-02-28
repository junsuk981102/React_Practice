import React, { FC, useState, ChangeEvent } from "react";
import { firestore } from "../firebase-config";
import { Box, Text, Flex, Button, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";

import { mintAnimalTokenContract, mintAnimalTokenAddress} from "../web3Config";
import { mintPlantTokenContract, mintPlantTokenAddress} from "../web3Config";
import { mintGovernanceTokenContract, mintGovernanceTokenAddress} from "../web3Config";

import  AnimalCard  from "../components/AnimalCard"
import  PlantCard  from "../components/PlantCard"

interface MainProps {
    account: string;
}

const ScreenMinting: FC<MainProps> = ({ account }) => {
    const [newAnimalType, setNewAnimalType] = useState<string>();
    const [newPlantType, setNewPlantType] = useState<string>();
    const [count, setCount] =useState<string>("");
    const [name, setName] =useState<string>("");
    const [initialprice, setInitialPrice] =useState<string>("");
    const [namemulti, setNameMulti] =useState<string>("");
    const [initialpricemulti, setInitialPriceMulti] =useState<string>("");

    const onClickMint_A = async () => {
        try{
            if(!account) return;

            const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({from: account});

            if(response.status){
                const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();
                const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength,10) - 1).call();
                const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();
                //const animalTokenAddress = await mintAnimalTokenContract.methods.animalTokenAddr(animalTokenId).call();
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
                //const plantTokenAddress = await mintPlantTokenContract.methods.plantTokenAddr(plantTokenId).call();
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

    const onClickSave_G = async () => {
        await firestore.collection("governance").add({
            address: mintGovernanceTokenAddress,
        });
    };

    const onChangeInitialPrice = (e: ChangeEvent<HTMLInputElement>) =>{
        setInitialPrice(e.target.value);
    };

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value);
    };

    const onChangeCount = (e: ChangeEvent<HTMLInputElement>) =>{
        setCount(e.target.value);
    };

    const onChangeInitialPriceMulti = (e: ChangeEvent<HTMLInputElement>) =>{
        setInitialPriceMulti(e.target.value);
    };

    const onChangeNameMulti = (e: ChangeEvent<HTMLInputElement>) =>{
        setNameMulti(e.target.value);
    };
    
    const onClickMint_G = async () => {
        try{
            const response = await mintGovernanceTokenContract.methods
                .mintGovernanceToken(
                    initialprice,
                    name
                )
                .send({from:account});
        } catch (error) {
            console.error(error);
        }
    }

    const onClickMultiMint_G = async () => {
        try{
            const response = await mintGovernanceTokenContract.methods
                .multi_mintGovernanceToken(
                    count,
                    initialpricemulti,
                    namemulti
                )
                .send({from:account});
        } catch (error) {
            console.error(error);
        }
    }

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
            
            <Box>
                <Text>Let's mint Governance Card!!!</Text>
            </Box>

            <InputGroup>
                <InputRightAddon children="Initial Price"/>
                <Input type="number" value={initialprice} onChange={onChangeInitialPrice}/>
                <InputRightAddon children="Name"/>
                <Input type="string" value={name} onChange={onChangeName}/>
            </InputGroup>
            <Button mt={4} size="sm" onClick={onClickMint_G}>
                Mint Governance
            </Button>

            <InputGroup>
                <InputRightAddon children="Count"/>
                <Input type="number" value={count} onChange={onChangeCount}/>
                <InputRightAddon children="Initial Price"/>
                <Input type="number" value={initialpricemulti} onChange={onChangeInitialPriceMulti}/>
                <InputRightAddon children="Name"/>
                <Input type="string" value={namemulti} onChange={onChangeNameMulti}/>
            </InputGroup>
            <Button mt={4} size="sm" onClick={onClickMultiMint_G}>
                Multi Mint Governance
            </Button>

            <Button mt={4} size="sm" onClick={onClickSave_G}>Save Governance</Button>
        </Flex>
    );
}

export default ScreenMinting;