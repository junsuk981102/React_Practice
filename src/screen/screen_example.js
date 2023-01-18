import { useState, useEffect, useId } from 'react';
// 파이어베이서 파일에서 import 해온 db
import {db} from '../firebase-config'
// db에 데이터에 접근을 도와줄 친구들
import { collection, getDocs, addDoc} from "firebase/firestore";
// import { async } from '@firebase/util';

function App() {
  // input으로 받을 새로운 사람의 이름과 나이
  const [newChatting, setNewChatting] = useState("");
  
  // changed를 true로 바꿔주면 되지않을까?
  const [changed, setChanged] = useState(false);

  console.log(newChatting);

 // 이따가 users 추가하고 삭제하는거 진행을 도와줄 state
  const [chatting, setChatting] = useState([]);
  // db의 users 컬렉션을 가져옴
  const chattingCollectionRef = collection(db, "chat_test");

  // 유니크 id를 만들기 위한 useId(); - react 18 기능으로, 이 훅을 이렇게 사용하는게 맞고 틀린지는 모른다.
  const uniqueId = useId();
  //console.log(uniqueId)

   // 시작될때 한번만 실행 // 읽어오기 - R
  useEffect(()=>{
  	// 비동기로 데이터 받을준비
    const getChatting = async () => {
     // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(chattingCollectionRef);
      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      setChatting(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
    }

    getChatting();
    // 뭐든 동작할때마다 changed가 true값으로 변경되니까 화면을 그리고 다시 false로 돌려줘야지 다시 써먹는다.
    setChanged(false)
  },[changed]) // 처음에 한번 그리고, changed가 불릴때마다 화면을 다시 그릴거다

  // 생성 - C
  const createChatting = async () =>{
    // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
    await addDoc(chattingCollectionRef, {chatting: newChatting});
    // 화면 업데이트를 위한 state 변경
    setChanged(true)
  }

  // 띄워줄 데이터 key값에 고유ID를 넣어준다.
  const showChatting = chatting.map((value)=> (<div key={uniqueId}> 
                                            <h1>{value.chatting}</h1>  
                                            <br/>
                                        </div>))
  return (
    <div className="App">
      {/* onchange를 이용해서, 변하는 값을 state로 저장한다. */}
      <input type="text" placeholder='chatting...' onChange={(event)=> {setNewChatting(event.target.value)}}/>
      <button onClick={createChatting}>Create chatting</button>
        {showChatting}
    </div>
  );
}

export default App;