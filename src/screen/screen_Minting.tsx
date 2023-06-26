import React, { FC, useState, ChangeEvent } from "react";
import { firestore } from "../firebase-config";

// import { mintAnimalTokenContract, mintAnimalTokenAddress} from "../web3Config";
import { mintGovernanceTokenContract, mintGovernanceTokenAddress} from "../web3Config";

// import  AnimalCard  from "../components/AnimalCard"
import  GovernanceCard  from "../components/GovernanceCard"

interface MainProps {
    account: string;
}

const ScreenMinting: FC<MainProps> = ({ account }) => {
    // const [newAnimalType, setNewAnimalType] = useState<string>();
    const [count, setCount] =useState<string>("");
    const [name, setName] =useState<string>("");
    const [initialprice, setInitialPrice] =useState<string>("");
    const [namemulti, setNameMulti] =useState<string>("");
    const [initialpricemulti, setInitialPriceMulti] =useState<string>("");

    // const onClickMint_A = async () => {
    //     try{
    //         if(!account) return;

    //         const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({from: account});

    //         if(response.status){
    //             const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();
    //             const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength,10) - 1).call();
    //             const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();
    //             //const animalTokenAddress = await mintAnimalTokenContract.methods.animalTokenAddr(animalTokenId).call();
    //             setNewAnimalType(animalType);
    //         }
    //     } catch(error) {
    //         console.error(error);
    //     }
    // };

    // const onClickSave_A = async () => {
    //     await firestore.collection("animal").add({
    //         address: mintAnimalTokenAddress,
    //     });
    // };

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

    const onClickSave_G = async () => {
        await firestore.collection("governance").add({
            address: mintGovernanceTokenAddress,
        });
    };

    return (
        <div style={{ display: "flex", width: "100%", height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

        {/* <div>
            {newAnimalType ? (
                <AnimalCard animalType={newAnimalType} />
            ) : (
                <p>Let's mint Animal Card!!!</p>
            )}
        </div>
        <button style={{ marginTop: "4px", fontSize: "small" }} onClick={onClickMint_A}>Mint Animal</button>
        <button style={{ marginTop: "4px", fontSize: "small" }} onClick={onClickSave_A}>Save Animal</button>
        </div> */}

        <div>
            <span>Initial Price</span>
            <input type="number" value={initialprice} onChange={onChangeInitialPrice} />
            <span>Name</span>
            <input type="text" value={name} onChange={onChangeName} />
        </div>
        <button style={{ marginTop: "4px", fontSize: "small" }} onClick={onClickMint_G}>Mint Governance</button>

        <div>
            <span>Count</span>
            <input type="number" value={count} onChange={onChangeCount} />
            <span>Initial Price</span>
            <input type="number" value={initialpricemulti} onChange={onChangeInitialPriceMulti} />
            <span>Name</span>
            <input type="text" value={namemulti} onChange={onChangeNameMulti} />
        </div>
        <button style={{ marginTop: "4px", fontSize: "small" }} onClick={onClickMultiMint_G}>Multi Mint Governance</button>

        <button style={{ marginTop: "4px", fontSize: "small" }} onClick={onClickSave_G}>Save Governance</button>
        </div>
    );
}

export default ScreenMinting;