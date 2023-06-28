import React, {useState} from 'react'
import {ethers} from 'ethers';
import {useNavigate} from "react-router-dom";

const ScreenWalletConnect = (props) => {
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
        <div className='walletCard' style={{ backgroundColor: "#E5F2F2", minHeight: "100vh", borderTop: "1px solid #00A29D" }}>
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

export default ScreenWalletConnect;