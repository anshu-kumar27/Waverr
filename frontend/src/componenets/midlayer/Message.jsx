import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageSkeleton from './messages/MessageSkeleton';
import axios from 'axios';
import { zustandStore } from '../../zustand/zustand';
import { toast } from 'react-toastify';
import { useSocketContext } from '../../socket/socket';
// import { useCall } from '../../socket/Callcontext';



function Message() {
  let [userId, setUserId] = useState(null);
  let [userName, setUserName] = useState(null);
  let [userAvatar, setUserAvatar] = useState(null);
  const {onlineUsers,socket} = useSocketContext()
  const {activeTab,messages,setMessages} = zustandStore();
  const[users,setUsers] = useState([]);
  const selectedConversation = zustandStore(state => state.selectedConversation);
  const setSelectedConversation = zustandStore(state => state.setSelectedConversation);
  const [selected, setSelected] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  useEffect(()=>{
    const func = async() =>{
      try{
        const {data} = await axios.get('/api/v1/allusers',{
            credentials:'include'
        })
        setUsers(data.filteredUsers);
        // console.log("logging messages ",data.filteredUsers)
    }catch(error){
        console.log("went inside error : ",error)
        toast.error("error while fetching users")
    }
    }
    if(activeTab) func();
  },[activeTab,messages,setMessages])
  const handleBack = () =>{
    setSelectedConversation(null), 
    setSelected(false)
  }
  return (
    <div className='mt-10'>
    <div className='h-full w-full flex'>
      <div className={`
      h-[87vh] px-4 border-r border-gray-300 flex flex-col gap-4 overflow-auto
      ${selected ? 'hidden' : 'block'} 
      md:h-[92vh]
      md:block

      md:w-[25%] w-full
    `}>
        
        {/* Search Bar */}
        <div className="relative p-2 rounded-lg">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 p-2 rounded-xl bg-[#74D4FF] outline-none text-white placeholder-white"
          />
        </div>

        {/* Line */}
        <div className="my-2 mx-4 h-[2px] bg-gray-300 rounded-full" />

        {/* Horizontal Avatars */}
        <div className="flex overflow-x-auto space-x-4 px-1 custom-scrollbar">
          {users.map((friend) => (
            <img
              key={friend._id}
              src={friend?.avatar?.url ?? "default-url"}
              alt={friend.firstName}
              className="w-16 rounded-full border-2 border-blue-400 shrink-0"
            />
          ))}
        </div>

        {/* FRIENDS LIST */}
        <div
          className="space-y-3 pt-4 px-2 overflow-y-scroll overflow-x-hidden"
          style={{ maxHeight: isMobile ? 'calc(100vh - 300px)' : 'calc(100vh - 200px)' }}
        >
          {users.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              onClick={() => {
                setUserId(friend._id);
                setUserAvatar(friend?.avatar?.url ?? "default-url");
                setUserName(friend.firstName);
                setSelected(true); // show message area on mobile
              }}
            >
              <img src={friend?.avatar?.url ?? "default-url"} className="w-10 h-10 rounded-full" />
              <div>
                <div className="flex items-center">
                  <div className="font-semibold">{friend.firstName}</div>
                  {onlineUsers.includes(friend._id) && (
                    <span className="ml-2 w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  )}
                </div>
                <div className="text-sm text-gray-500 truncate min-w-[100px]">
                  {friend?.userLastMessage?.text ?? '...'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    {/* MESSAGE AREA */}
    {(userId !== null && selected) && (
      <div className="w-full md:flex-1 p-6 block md:block g-[100vh]">
        {/* Back Arrow - phone only */}
        <div className="md:hidden mb-4 absolute top-2">
          <button
            onClick={() => handleBack()}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            ← Back to Messages
          </button>
        </div>

        <MessageSkeleton
          userId={userId}
          userAvatar={userAvatar}
          userName={userName}
        />
      </div>
    )}
  </div>
  </div>
  );
}

export default Message;
