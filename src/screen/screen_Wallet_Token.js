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
        <div className='walletCard' style={{ backgroundColor: "#E5F2F2", minHeight: "100vh" }}>
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

{/* <div style={{ backgroundColor: "#E5F2F2", minHeight: "100vh" }}>
<div
style={{ paddingLeft: "500px", paddingRight: "500px" }}
>
<h3 style={{ margin: "0", paddingTop: "50px", marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>커뮤니티</h3>
<div
style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
gap: "20px",
}}
>
{renderCommunities()}
</div>
</div>
</div>
);
}; */}

export default ScreenWalletToken;

