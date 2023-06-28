import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers';
import {useNavigate} from "react-router-dom";

const ScreenWalletConnect = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText] = useState('Connect Wallet');
    const navi = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    useEffect(() => {
      setWindowWidth(window.innerWidth);
    }, []);

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
            <div style={{ paddingLeft: `${windowWidth > 1700 ? '500px' : '50px'}`, paddingRight: `${windowWidth > 1700 ? '500px' : '10px'}` }}>
                <h3 style={{ margin: "0", paddingTop: "50px", marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>내 지갑 연결하기</h3>
                <button onClick={connectWalletHandler}>{connButtonText}</button>
            </div>
        </div>
    )
}
export default ScreenWalletConnect;