import axios from 'axios';
import {useEffect, useState} from 'react'
import { zustandStore } from '../zustand/zustand';
import { toast } from 'react-toastify';

const userGetConversations = async() => {
    const [loading,setLoading] = useState(false);
    const {setMessages, selectedConversation, messages} = zustandStore();
    console.log("here wer are ... select ", selectedConversation)
            console.log("tryna fetch")
            setLoading(true);
            try{
                const res = await axios.get(`/api/v1/message/${selectedConversation}`,{
                    credentials: 'include'
                })
                console.log("got repsonse from the server ",res);
                setMessages(res.messages);
            }catch(error){
                toast.error(error)
            }finally{
                setLoading(false);
            }
            
} 

export default userGetConversations;