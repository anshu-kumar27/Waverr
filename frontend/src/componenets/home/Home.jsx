import React, { useEffect } from 'react'
import Settings from './Settings'
import { zustandStore } from '../../zustand/zustand';
import Message from '../midlayer/Message';
import Group from '../midlayer/Group';
import Call from '../midlayer/Call';
import Globe from '../midlayer/Globe'
import { Bell, Search, Upload } from 'lucide-react';
import { MdPersonAddAlt } from "react-icons/md";

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
    <div className="h-10 w-[2px] bg-gray-300 mx-2"></div>

    {/* Add to Network */}
    <div className="hidden md:flex flex-col items-center justify-center text-sm font-medium text-gray-700">
      <MdPersonAddAlt className="text-2xl mb-1" />
      <span>Add to Network</span>
    </div>
  </div>
</div>

<div className="flex h-[100vh] ">
<div className="flex flex-col md:flex-col w-full">
  {/* LEFT: Stories or Sidebar */}
  <div className="md:w-1/5 w-full bg-white p-4">
    {/* Stories or Navigation */}
    <p className="font-bold">Stories</p>
    {/* map user stories here */}
  </div>

  {/* CENTER: Posts */}
  <div className="md:w-3/5 w-full p-4">
    <p className="font-bold">Posts</p>
    {/* map posts here */}
  </div>
  </div>
  {/* RIGHT: Add to Network */}
  <div className="md:w-1/5 w-full bg-white p-4 hidden md:block">
    <p className="font-bold">People you may know</p>
    {/* map friend suggestions */}
  </div>

</div>
    </>
  )
}

export default Home