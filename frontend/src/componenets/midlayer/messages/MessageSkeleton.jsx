import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import {
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiPaperclip,
  FiSmile,
  FiFileText,
  FiSend
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import MessageBody from './MessageBody';
import { handleSubmit } from '../../../action/messageAction';
import { useSocketContext } from '../../../socket/socket';
import { zustandStore } from '../../../zustand/zustand';
import AddImage from './AddImage';
import CallingBody from '../calling/CallingBody';

function MessageSkeleton({ userId, userAvatar, userName }) {
  const [callStatus,setCallStatus] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [text, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState("Offline")
  const messages = zustandStore(state => state.messages);
  const setMessages = zustandStore(state => state.setMessages);

  const { onlineUsers, socket } = useSocketContext()
  const handleSend = async () => {
    console.log("inside handlesend")
    if (!text && !image) {
      toast.error("Enter something before sending...");
      return;
    }

    try {
      const res = await axios.post(
        `/api/v1/send/${userId}`,
        { text, image },
        { withCredentials: true }
      );
      const newMessage = res.data;
      toast.success("Message sent");
      setMessages([...messages, newMessage]); // This will now trigger reactivity
      setInput('');
      setImage(null)
    } catch (error) {
      toast.error("Failed to send the message");
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    if (onlineUsers.includes(userId))
      setOnlineStatus("Online")
    else
      setOnlineStatus("Offline")

    console.log("logger")
  }, [socket, userId])

  
  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full"
            src={userAvatar}
            alt="User"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{userName}</h3>
            <p className={`text-sm ${onlineStatus === 'Online' ? 'text-green-500' : 'text-red-500'}`}>{onlineStatus}</p>
          </div>
        </div>
        <div className="flex gap-4 text-xl text-gray-600">
          <FiPhone className="cursor-pointer" onClick={()=> setCallStatus("audio")}/>
          <FiVideo className="cursor-pointer" onClick={()=> setCallStatus("video")}/>
          <FiMoreVertical className="cursor-pointer" />
        </div>
      </div>
      {callStatus &&  <CallingBody callStatus={callStatus} setCallStatus={setCallStatus} userAvatar={userAvatar} userId={userId}/>}
      {/* Messages */}
      <div className="h-[66.3vh] overflow-y-auto w-[100%]">
        <MessageBody
          userId={userId}
          loading={loading}
          userAvatar={userAvatar}
          userName={userName}
        />
      </div>
      {/* Bottom Input Area */}
      {image && (
  <div className="mt-2">
    <img src={selectedImage} alt="preview" className="max-w-xs rounded" />
  </div>
)}
      <div className="flex items-center gap-8 p-4 border-t border-gray-300">
        {/* Input Field */}
        <div className="flex flex-1 bg-[#74D4FF] rounded-full items-center px-4 py-2">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={text}
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-transparent text-white placeholder-white outline-none"
          />
          <FiSend className="text-white text-xl cursor-pointer" onClick={handleSend} />
        </div>

        {/* Action Icons */}
        <FiPaperclip className="cursor-pointer text-gray-900" />
        <FiSmile className="cursor-pointer text-gray-900" />
          <FiFileText className="cursor-pointer text-gray-900" />
        </div>
      </div>

  );
}

export default MessageSkeleton;
