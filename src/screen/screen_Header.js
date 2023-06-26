import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Header(props) {
    const navi = useNavigate();
    const [activeButton, setActiveButton] = useState('');

    function handleClick(text) {
        setActiveButton(text);
        navi(text);
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '32px', marginLeft: '15px' }}>
                        <img src="image/stot_minilogo.png" alt="logo" width="143px" height="48.1px" />
                    </div>
                    <button
                        onClick={() => handleClick("")}
                        style={{
                            marginRight: '32px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: activeButton === '' ? '#00A29D' : 'black'
                        }}
                    >
                        홈
                    </button>
                    <button
                        onClick={() => handleClick("/screen_wallet_connect")}
                        style={{
                            marginRight: '32px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: activeButton === '/screen_wallet_connect' ? '#00A29D' : 'black'
                        }}
                    >
                        지갑
                    </button>
                    <button
                        onClick={() => handleClick("/screen_room_list")}
                        style={{
                            marginRight: '32px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: activeButton === '/screen_room_list' ? '#00A29D' : 'black'
                        }}
                    >
                        커뮤니티
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => handleClick("/screen_login")}
                        style={{ marginRight: '20px', fontSize: '20px', fontWeight: 'bold' }}
                    >
                        로그인
                    </button>
                    <button
                        onClick={() => handleClick("/screen_minting")}
                        style={{
                            marginRight: '10px',fontSize: '20px',
                            fontWeight: 'bold',
                            color:  '#00A29D'
                        }}
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </>
    );
}

export default Header;