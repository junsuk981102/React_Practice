import "./App.css";
import Header from "./screen/screen_Header";
import Main from "./screen/screen_Main";
import Example from "./screen/screen_example";
import Login from "./screen/screen_Login";
import Register from "./screen/screen_Register";
import Metamask from "./screen/screen_Metamask";
import Landing from "./screen/screen_Landing";
import ChatList from "./screen/screen_ChatList";
import ChatRoom from "./screen/screen_ChatRoom";
import Profile from "./screen/screen_Profile";
import MakingRoom from "./screen/screen_MakingRoom";
import FindingRoom from "./screen/screen_FindingRoom";
import ChatInfo from "./screen/screen_ChatInfo";
import {Routes, Route} from "react-router-dom";


export default function App() {
  
  return (
      <div className={"app"}>
          <Header/>
          <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/example/*" element={<Example />}></Route>
              <Route path="/landing/*" element={<Landing />}></Route>
              <Route path="/login/*" element={<Login />}></Route>
              <Route path="/register/*" element={<Register />}></Route>
              <Route path="/metamask/*" element={<Metamask />}></Route>
              <Route path="/chatlist/*" element={<ChatList />}></Route>
              <Route path="/chatroom/*" element={<ChatRoom />}></Route>
              <Route path="/profile/*" element={<Profile />}></Route>
              <Route path="/makingroom/*" element={<MakingRoom />}></Route>
              <Route path="/findingroom/*" element={<FindingRoom />}></Route>
              <Route path="/chatinfo/*" element={<ChatInfo />}></Route>
              {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
              {/*<Route path="*" element={<NotFound />}></Route>*/}
          </Routes>
              {/*<Header />*/}
              {/*<Main />*/}
              {/*<Product />*/}
      </div>
  );
}