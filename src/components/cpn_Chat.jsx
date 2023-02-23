import { useState, useEffect, useRef } from "react";
import MessageFormat from "./cpn_Message_Format";
import {db} from '../firebase-config';
import {query, collection, orderBy, onSnapshot} from 'firebase/firestore';
import MessageSend from "./cpn_Message_Send";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import React from 'react';
import { useLocation } from "react-router-dom";

const Chat = () => {
    const [message, setMessage] = useState([]);
    const scroll = useRef();
    const [user] = useAuthState(auth);

    const { state } = useLocation();

    const chatroomname = state.id;
    const realname = "community_list/"+chatroomname+"/message";

    useEffect(() => {
        const q = query(collection(db, realname), orderBy('timestamp'));
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