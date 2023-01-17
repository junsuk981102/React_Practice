import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDvnm1EnAbMlk3fgx5EeIrp7seME4A7jro",
  aasfuthDomain: "react-test-757a4.firebaseapp.com",
  projectId: "react-test-757a4",
  storageBucket: "react-test-757a4.appspot.com",
  messagingSenderId: "373097822697",
  appId: "1:373097822697:web:2a2589b3d88d6d3034b378"
};

const app = initializeApp(firebaseConfig)
// firebase에 모든 것을 export 하는 대신 원하는 서비스만 Export 할 수 있음!
export const auth = getAuth(app)

