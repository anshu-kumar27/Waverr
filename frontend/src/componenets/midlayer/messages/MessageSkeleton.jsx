import axios from 'axios';
import React, { useEffect, useState } from 'react'
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
import { handleSubmit, newMessageSocketListner } from '../../../action/messageAction';

function MessageSkeleton({ userId, userAvatar,  userName }) {
  const [loading,setLoading] = useState(false);
  const[text,setInput] = useState('');
  const[image,setImage] = useState(null);
  const handleSend=()=>{
    console.log("inside handlesend")
    if(!text && !image){
      toast.error("Enter something before sending...")
      console.log("no messages returning...")
      return;
  }
    handleSubmit({text,image,userId});
    // text,image,userId
  }
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
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
        <div className="flex gap-4 text-xl text-gray-600">
          <FiPhone className="cursor-pointer" />
          <FiVideo className="cursor-pointer" />
          <FiMoreVertical className="cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div className="h-[66.3vh] overflow-y-auto">
      <MessageBody
        userId = {userId}
        loading = {loading}
        userAvatar = {userAvatar}
        userName = {userName}
      />
      </div>
      {/* Bottom Input Area */}
      <div className="flex items-center gap-8 p-4 border-t border-gray-300">
        {/* Input Field */}
        <div className="flex flex-1 bg-[#74D4FF] rounded-full items-center px-4 py-2">
          <input
            onChange={(e)=>setInput(e.target.value)}
            value={text}
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-transparent text-white placeholder-white outline-none"
          />
          <FiSend className="text-white text-xl cursor-pointer" onClick={handleSend} />
        </div>

        {/* Action Icons */}
        <div className="flex gap-3 text-xl text-gray-600">
          <FiPaperclip className="cursor-pointer" />
          <FiSmile className="cursor-pointer" />
          <FiFileText className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default MessageSkeleton;
