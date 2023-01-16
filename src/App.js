import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Product from "./Product";
import {Routes, Route} from "react-router-dom";


export default function App() {
  
  return (
      <div className={"app"}>
          <Header/>
          <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/product/*" element={<Product />}></Route>
              {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
              {/*<Route path="*" element={<NotFound />}></Route>*/}
          </Routes>


              {/*<Header />*/}
              {/*<Main />*/}
              {/*<Product />*/}

      </div>
  );
}