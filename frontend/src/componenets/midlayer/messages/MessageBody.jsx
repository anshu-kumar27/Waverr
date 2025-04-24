import React, { useEffect, useState } from 'react';
import { extractTime } from './timehandler';
import { useSelector } from 'react-redux';
import { zustandStore } from '../../../zustand/zustand';
import { useSocketContext } from '../../../socket/socket';
import { toast } from 'react-toastify';
import axios from 'axios';
// import { newMessageSocketListner } from '../../../action/messageAction';

function MessageBody({userId ,userAvatar,  userName }) {
    const {socket} = useSocketContext();
    const {user} = useSelector((state)=>state.user);
    const[loading,setLoading] = useState(null);
    const {messages,setMessages} = zustandStore();
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`/api/v1/messages/${userId}`, {
            withCredentials: true,
          });
          const data = res?.data?.messages ?? [];
          setMessages(data);
        } catch (error) {
          console.error("Error fetching messages", error);
          toast.error("Error while fetching the conversation");
        } finally {
          setLoading(false);
        }
      };
      //implement socket 
      if (userId) {
        fetchMessages();
      }
    }, [userId,socket]);
  return (
    <div className="flex-1 p-4 space-y-4">
        {messages.map((message) => {
          console.log("messages seems to be updated ")
        const chatCorner = message.receiver !== userId ? "chat-start" : "chat-end";
        const name = message.receiver !== userId ? userName : user.firstName;
        const time = extractTime({ time: message.createdAt });
        const text = message?.content?.text ?? '';
        const avtr = message.receiver !== userId ? userAvatar : user.avatar.url;
        const image = message.content.image ?? '';

      return (
        <div key={message._id} className={`chat ${chatCorner}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={avtr}
              />
            </div>
          </div>
            <div className="chat-header">
            {name}
          </div>
          {image && (
            <div className="chat-bubble">
              <img src={image} alt="attachment" className="max-w-xs rounded-lg" />
            </div>
          )}
          {text && <div className="chat-bubble bg-[#74D4FF]">{text}</div>}
          <div className="chat-footer opacity-50">{time}</div>
        </div>
      );
    })}
      </div> 
  );
}

export default MessageBody;
