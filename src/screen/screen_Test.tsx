// import React, {useState} from 'react'
// import {useEffect } from 'react';
// import Web3 from 'web3';


// const ScreenTest = (props) => {
//     const [setDefaultAccount] = useState(null);
//     const [address, setAddress] = useState('');

//     useEffect(() => {
//       async function getAddress() {
//         if (window.ethereum) {
//           const web3 = new Web3(window.ethereum);
//           try {
//             await window.ethereum.enable();
//             const currentAddress = await web3.eth.getAccounts();
//             setAddress(currentAddress[0]);
//           } catch (error) {
//             console.log(error);
//           }
//         } else {
//           console.log('MetaMask is not installed or enabled');
//         }
//       }
//       getAddress();
//     }, []);

//     const accountChangedHandler = (newAccount) => {
//         setDefaultAccount(newAccount);
//     }

//     const chainChangedHandler = () =>{
//         window.location.reload();
//     }

//     window.ethereum.on('accountsChanged', accountChangedHandler);

//     window.ethereum.on('chainChanged', chainChangedHandler )


//     return(
//         <div className='walletCard'>
//             <h3>ScreenTest 페이지입니다.</h3>
//             <br/><br/><br/>
//             <div className='accountDisplay'>
//                 <h3>Address: {address}</h3>
//             </div>
//         </div>
//     )
// }

// export default ScreenTest;


import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Grid} from "@chakra-ui/react";

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