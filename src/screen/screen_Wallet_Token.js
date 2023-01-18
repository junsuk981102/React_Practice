import React, {useState} from 'react'
import {ethers} from 'ethers';
import {useNavigate} from "react-router-dom";

const ScreenWalletToken = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
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

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        //walletID.doc("myWallet").update({ID: defaultAccount});
        //walletID.add({ID: defaultAccount});
        getUserBalance(newAccount.toString());
    }

    const chainChangedHandler = () =>{
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);

    window.ethereum.on('chainChanged', chainChangedHandler )

    const getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }

    return(
        <div className='walletCard'>
            <h3>ScreenWalletToken 페이지입니다.</h3>
            <h4> {"Connection to MetaMask using window.ethereum methods"}</h4>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <div className='accountDisplay'>
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className='balanceDisplay'>
                <h3>Balance: {userBalance}</h3>
            </div>
            {errorMessage}
        </div>
    )
}

export default ScreenWalletToken;