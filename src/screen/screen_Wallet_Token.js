import React, {useState} from 'react'
// import {ethers} from 'ethers';
import {useNavigate} from "react-router-dom";

import {useEffect } from 'react';
import Web3 from 'web3';


const ScreenWalletToken = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    // const [defaultAccount, setDefaultAccount] = useState(null);
    const [setDefaultAccount] = useState(null);
    // const [userBalance, setUserBalance] = useState(null);
    const [connButtonText] = useState('Connect Wallet');
    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    const connectWalletHandler = () => {
        if(window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);
            })
            //walletID.add({ID: defaultAccount});
            handleClick("/screen_wallet_token");
        } else {
            setErrorMessage('Install MetaMask');
        }
    }

    const [address, setAddress] = useState('');

    useEffect(() => {
      async function getAddress() {
        // Check if MetaMask is installed and enabled
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            // Request account access if needed
            await window.ethereum.enable();
            // Get the current address
            const currentAddress = await web3.eth.getAccounts();
            setAddress(currentAddress[0]);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('MetaMask is not installed or enabled');
        }
      }
      getAddress();
    }, []);

    
    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        //walletID.doc("myWallet").update({ID: defaultAccount});
        //walletID.add({ID: defaultAccount});
        // getUserBalance(newAccount.toString());
    }

    const chainChangedHandler = () =>{
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);

    window.ethereum.on('chainChanged', chainChangedHandler )

    // const getUserBalance = (address) => {
    //     window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
    //     .then(balance => {
    //         setUserBalance(ethers.utils.formatEther(balance));
    //     })
    // }

    return(
        <div className='walletCard'>
            <h3>ScreenWalletToken 페이지입니다.</h3>
            <button onClick={() => handleClick("/screen_wallet_token")}>screen_wallet_token 페이지</button>
            <button onClick={() => handleClick("/screen_room_list")}>screen_room_list 페이지</button>
            <button onClick={() => handleClick("/screen_profile")}>screen_profile 페이지</button>
            <br/><br/><br/>
            <h4> {"Connection to MetaMask using window.ethereum methods"}</h4>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <div className='accountDisplay'>
                <h3>Address: {address}</h3>
            </div>
            {/* <div className='balanceDisplay'>
                <h3>Balance: {userBalance}</h3>
            </div> */}
            {errorMessage}
        </div>
    )
}

export default ScreenWalletToken;

