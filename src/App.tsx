import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import theme from "./theme";
import "./App.css";

// Community Screen
import ScreenChat from "./screens/community/screen_Community_Room.js";
import ScreenRoomInfo from "./screens/community/screen_Community_Info";
import ScreenRoomList from "./screens/community/screen_Community_List";
import ScreenRoomMake from "./screens/community/screen_Community_Make";
// Layout Screen
import Footer from "./screens/layout/screen_Footer";
import Header from "./screens/layout/screen_Header";
// Startup Screen
import ScreenStartupInfo from "./screens/startup/screen_Startup_Info";
import ScreenStartupList from "./screens/startup/screen_Startup_List";
// Testing Screen
import ScreenExample from "./screens/testing/screen_Example";
import ScreenNewsletter from "./screens/testing/screen_Newsletter";
// Ticket Screen
import ScreenMinting from "./screens/ticket/screen_Minting";
import ScreenMyGovernance from "./screens/ticket/screen_My_Governance";
import ScreenWalletConnect from "./screens/ticket/screen_Wallet_Connect";
// User Screen
import ScreenLogin from "./screens/user/screen_Login";
import ScreenProfile from "./screens/user/screen_Profile";
import ScreenRegister from "./screens/user/screen_Register";
// VC Screen
import ScreenVCInfo from "./screens/vc/screen_VC_Info";
import ScreenVCList from "./screens/vc/screen_VC_List";
// Main Screen
import ScreenMain from "./screens/screen_Main";

export default function App() {
  const MainLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return null;
  };

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
      <div className={"app"} style={{ flex: 1 }}>
        <ScrollToTop />

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<ScreenMain />}></Route>
            <Route path="/screen_chat/*" element={<ScreenChat />}></Route>
            <Route path="/screen_Example/*" element={<ScreenExample />}></Route>
            <Route path="/screen_login/*" element={<ScreenLogin />}></Route>
            <Route
              path="/screen_minting/*"
              element={<ScreenMinting account={account} />}
            ></Route>
            <Route
              path="/screen_my_governance/*"
              element={<ScreenMyGovernance account={account} />}
            ></Route>
            <Route path="/screen_profile/*" element={<ScreenProfile />}></Route>
            <Route
              path="/screen_register/*"
              element={<ScreenRegister />}
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
              path="/screen_startup_info/*"
              element={<ScreenStartupInfo />}
            ></Route>
            <Route
              path="/screen_startup_list/*"
              element={<ScreenStartupList />}
            ></Route>
            <Route path="/screen_vc_info/*" element={<ScreenVCInfo />}></Route>
            <Route path="/screen_vc_list/*" element={<ScreenVCList />}></Route>
            <Route
              path="/screen_wallet_connect/*"
              element={<ScreenWalletConnect />}
            ></Route>
          </Route>

          <Route
            path="/screen_newsletter/*"
            element={<ScreenNewsletter />}
          ></Route>
        </Routes>
      </div>
    </ChakraProvider>
  );
}
