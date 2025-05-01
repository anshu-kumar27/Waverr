import React, { useEffect } from 'react'
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

function Home() {
  const { activeTab, setActiveTab } = zustandStore();
  return (
    <>
    <div className="w-full justify-between items-center p-4 border-b border-gray-200 md:flex hidden">
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
    <Bell className="cursor-pointer" />
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

<div className="flex flex-col md:flex-row h-[92vh] md:h-[87vh] overflow-y-scroll custom-scrollbar">
  {/* LEFT COLUMN */}
  <div className="flex flex-col w-full md:w-[100%] bg-white overflow-hidden">
    
    {/* Fixed Stories Height */}
    <div className="shrink-0">
      <Stories />
    </div>

    {/* Scrollable Post Section */}
    <div className="flex-1 overflow-y-auto custom-scrollbar shrink-0 ml-4 mr-4  p-2">
      <Post />
    </div>

  </div>

  {/* RIGHT COLUMN - Suggestions */}
  <div className="hidden md:block md:w-[40%] bg-white p-4">
    <p className="font-bold mb-2">People you may know</p>
    {/* Friend suggestions go here */}
  </div>
</div>
    </>
  )
}

export default Home