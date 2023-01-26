import { useState, useEffect, useRef } from "react";
import MessageFormat from "./cpn_Message_Format";
import {db} from '../firebase-config';
import {query, collection, orderBy, onSnapshot} from 'firebase/firestore';
import MessageSend from "./cpn_Message_Send";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import React from 'react';
import {useNavigate} from "react-router-dom";

const Chat = () => {
    const [message, setMessage] = useState([]);
    const scroll = useRef();
    const [user] = useAuthState(auth);

    const navi = useNavigate();

    function handleClick(text) {
        navi(`${text}`)
    }

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = []
            querySnapshot.forEach(doc => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessage(messages);
        })
        return () => unsubscribe();
    }, [])

    return ( 
        <>
            <h3>ScreenChat 페이지입니다.</h3>
            <button onClick={() => handleClick("/screen_room_list")}>뒤로가기</button>
            <br/><br/>
            <section className="chat-content">
                {
                    message && message.map(item => (
                        <MessageFormat
                            key={item.id}
                            message={item}
                        />
                    ))
                }
            { user && <MessageSend scroll={scroll}/> }
            
            <span ref={scroll}></span>
            </section>
        </>
     );
}
 
export default Chat;