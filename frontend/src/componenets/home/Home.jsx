import React, { useEffect, useRef, useState } from 'react'
import Settings from './Settings'
import { zustandStore } from '../../zustand/zustand';
import Message from '../midlayer/Message';
import Group from '../midlayer/Group';
import Call from '../midlayer/Call';
import Globe from '../midlayer/Globe'
import { Bell, Search, Upload } from 'lucide-react';
import { MdPersonAddAlt } from "react-icons/md";
import Stories from './Stories';
import Post from './Post';
import Connect from './connect/Connect';
import { UseNotification } from '../../socket/Notification';
import axios from 'axios';
import NotificationDropdown from './notification/NotificationDropdown';

function Home() {
  const { activeTab, setActiveTab } = zustandStore();
  const {notification} = UseNotification()
  const [notificationData, setNotificationData] = useState(null);
  const [loading,setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false); // <- toggle
  useEffect(()=>{
    const func = async(req,res,next)=>{
      try{
        setLoading(true)
        const result = await axios.get('/api/v1/fetchNotification',{credentials:'include'});
        setNotificationData(result.data || [])
      }catch(error){
        console.log('something seems off...',error)
      }finally{
        setLoading(true)
      }
    }
    func();

  },[notification])
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const RedDot = () => (
    <span className="absolute top-0 right-0 bg-red-500 h-2 w-2 rounded-full"></span>
  );

  return (
    <div className='md:mt-4 mt-10'>
    <div className="w-full justify-between items-center pl-4 pr-4 pb-4 border-b border-gray-200 md:flex hidden pt-2">
  {/* Left: Search */}
  <div className="relative w-1/3">
    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
    <input 
      type="text" 
      placeholder="Search"
      className="w-full pl-10 py-2 rounded-full bg-blue-100 outline-none" 
    />
  </div>

  {/* Right Icons */}
  <div className="flex items-center space-x-6">
  <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setShowDropdown((prev) => !prev)}
        className="cursor-pointer relative"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {notificationData && notificationData.length > 0 && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full" />
        )}
      </div>

      {showDropdown && (
        <NotificationDropdown notifications={notificationData} />
      )}
    </div>

    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full cursor-pointer">
      <span>Upload</span>
      <Upload size={18} />
    </div>
    
    {/* Divider */}
    <div className="h-10 w-[2px] bg-gray-0 mx-2"></div>

    {/* Add to Network */}
    <div className="hidden md:flex flex-col items-center justify-center text-sm font-medium text-gray-700">
      <span className="w-[5rem] mb-1"></span>
    </div>
  </div>
</div>

<div className="flex flex-col md:flex-row h-[85vh] md:h-[84vh] ">
  {/* LEFT COLUMN */}
  <div className="flex flex-col w-full md:w-[100%] bg-white overflow-hidden overflow-y-scroll">
    
    {/* Fixed Stories Height */}
    <div className="shrink-0">
      <Stories />
    </div>

    {/* Scrollable Post Section */}
    <div className="flex-1 shrink-0 ml-4 mr-4  p-2">
      <Post />
    </div>
    </div>

  {/* RIGHT COLUMN - Suggestions */}
  <div className="hidden md:block md:w-[40%] bg-white p-4 overflow-y-auto justify-center items-center">
    <p className="font-bold mb-2">People you may know</p>
    <Connect/>
  </div>
</div>
    </div>
  )
}

export default Home