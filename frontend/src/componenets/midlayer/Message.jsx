import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageSkeleton from './messages/MessageSkeleton';
import axios from 'axios';
import { zustandStore } from '../../zustand/zustand';
import { toast } from 'react-toastify';



function Message() {
  let [userId, setUserId] = useState(null);
  let [userName, setUserName] = useState(null);
  let [userAvatar, setUserAvatar] = useState(null);
  const dispatch = useDispatch();
  const {activeTab} = zustandStore();
  const[users,setUsers] = useState([]);
  useEffect(()=>{
    const func = async() =>{
      try{
        const {data} = await axios.get('/api/v1/allusers',{
            credentials:'include'
        })
        setUsers(data.filteredUsers);
        
    }catch(error){
        console.log("went inside error : ",error)
        toast.error("error while fetching users")
    }
    }
    if(activeTab) func();
  },[activeTab])
  
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[25%] h-full px-4 border-r border-gray-300  flex flex-col gap-4 overflow-auto">
      {/* Heading */}
      <h2 className="text-xl font-bold">Messages</h2>

      {/* Search Bar */}
      <div className="relative p-2 rounded-lg">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
  </svg>
  <input
    type="text"
    placeholder="Search"
    className="w-full pl-12 p-2 rounded-xl bg-[#74D4FF] outline-none text-white placeholder-white"
  />
</div>

      {/* Line Separator */}
      <div className="my-2 mx-4 h-[2px] bg-gray-300 rounded-full" />

      {/* Avatars scrollable row */}
      <div className="flex overflow-x-auto space-x-4 px-1">
        {users.map((friend) => (
          <img
            key={friend._id}
            src={friend.avatar.url}
            alt={friend.firstName}
            className="w-16 rounded-full border-2 border-blue-400 shrink-0"
          />
        ))}
      </div>

      {/* Friends List */}
      <div className=" space-y-3 pt-4 px-2 overflow-y-scroll overflow-x-hidden items-center justify-center" style={{ maxHeight: 'calc(100vh - 270px)', }}>

        {users.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            onClick={() => {setUserId(friend._id), setUserAvatar(friend.avatar.url), setUserName(friend.firstName)}}
          >
            <img
              src={friend.avatar.url}
              alt={friend.firstName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-semibold">{friend.firstName}</div>
              <div className="text-sm text-gray-600 truncate max-w-auto overflow-x-hidden ">
                hello this was ur last message? {/* {friend.lastMessage} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* Right panel */}
      <div className="flex-1 p-6">
        {userId === null ? (
          <h1 className="text-2xl font-semibold text-gray-700">👋 Welcome! Select a user to start messaging.</h1>
        ) : (
          <MessageSkeleton 
          userId={userId} 
          userAvatar = {userAvatar}
          userName = {userName}
          />
        )}
      </div>
    </div>
  );
}

export default Message;
