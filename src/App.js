import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import Mypage from './mypage';


export default function App() {
  
  return (
    <div className="App">
     
    <BrowserRouter>
          <Routes>
              <Route path={"/user/home"} element={<Home />}></Route>
              <Route path={"/user/mypage"} element={<Mypage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}