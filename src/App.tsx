import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import theme from "./theme";

import ScreenChat from "./screen/screen_Chat";
import ScreenExample from "./screen/screen_Example";
import Header from "./screen/screen_Header";
import ScreenLogin from "./screen/screen_Login";
import ScreenMain from "./screen/screen_Main";
import ScreenMinting from "./screen/screen_Minting";
// import ScreenMyAnimal from "./screen/screen_My_Animal";
import ScreenMyGovernance from "./screen/screen_My_Governance";
import ScreenProfile from "./screen/screen_Profile";
import ScreenRegister from "./screen/screen_Register";
import ScreenRoomFind from "./screen/screen_Room_Find";
import ScreenRoomInfo from "./screen/screen_Room_Info";
import ScreenRoomList from "./screen/screen_Room_List";
import ScreenRoomMake from "./screen/screen_Room_Make";
import ScreenRoomSetting from "./screen/screen_Room_Setting";
import ScreenStartupInfo from "./screen/screen_Startup_Info";
import ScreenTokenGating from "./screen/screen_Token_Gating";
import ScreenVCInfo from "./screen/screen_VC_Info";
import ScreenWalletConnect from "./screen/screen_Wallet_Connect";

import ScreenTest from "./screen/screen_Test";
// import WalletCard from './WalletCard';

export default function App() {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } else {
        alert("Install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAccount();
  }, [account]);

  return (
    <ChakraProvider theme={theme}>
      <div className={"app"}>
        <Header />
        {/* <WalletCard/> */}
        <Routes>
          <Route path="/" element={<ScreenMain />}></Route>
          <Route path="/screen_chat/*" element={<ScreenChat />}></Route>
          <Route path="/screen_Example/*" element={<ScreenExample />}></Route>
          <Route path="/screen_login/*" element={<ScreenLogin />}></Route>
          <Route
            path="/screen_minting/*"
            element={<ScreenMinting account={account} />}
          ></Route>
          {/* <Route path="/screen_my_animal/*" element={<ScreenMyAnimal account={account}/>}></Route> */}
          <Route
            path="/screen_my_governance/*"
            element={<ScreenMyGovernance account={account} />}
          ></Route>
          <Route path="/screen_profile/*" element={<ScreenProfile />}></Route>
          <Route path="/screen_register/*" element={<ScreenRegister />}></Route>
          <Route
            path="/screen_room_find/*"
            element={<ScreenRoomFind />}
          ></Route>
          <Route
            path="/screen_room_info/*"
            element={<ScreenRoomInfo />}
          ></Route>
          <Route
            path="/screen_room_list/*"
            element={<ScreenRoomList />}
          ></Route>
          <Route
            path="/screen_room_make/*"
            element={<ScreenRoomMake />}
          ></Route>
          <Route
            path="/screen_room_setting/*"
            element={<ScreenRoomSetting />}
          ></Route>
          <Route
            path="/screen_startup_info/*"
            element={<ScreenStartupInfo />}
          ></Route>
          <Route
            path="/screen_token_gating/*"
            element={<ScreenTokenGating />}
          ></Route>
          <Route path="/screen_vc_info/*" element={<ScreenVCInfo />}></Route>
          <Route
            path="/screen_wallet_connect/*"
            element={<ScreenWalletConnect />}
          ></Route>

          <Route path="/screen_test/*" element={<ScreenTest />}></Route>

          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          {/*<Route path="*" element={<NotFound />}></Route>*/}
        </Routes>
        {/*<Header />*/}
        {/*<Main />*/}
        {/*<Product />*/}
      </div>
    </ChakraProvider>
  );
}
