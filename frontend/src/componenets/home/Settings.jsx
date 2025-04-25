import React, { useState } from 'react';
import wavierrLogo from '../../assets/waverr.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../action/userAction';
import {
  FiMessageCircle,
  FiUsers,
  FiPhone,
  FiGlobe,
  FiLogOut,
  FiSettings,
} from 'react-icons/fi';
import { FaPen } from "react-icons/fa";

import { zustandStore } from '../../zustand/zustand';
import ProfileEdit from './profile/ProfileEdit';

function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = zustandStore();
  const [isProfileEdit,setProfileEdit] = useState(false);
  const {user} = useSelector((state)=>state.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <div className="flex justify-center py-6">
      <div className="h-full w-full border-r border-gray-300 rounded-lg flex flex-col justify-between items-center overflow-hidden px-2 py-2">
        {/* Top: Logo + Menu Icons */}
        <div className="flex flex-col items-center gap-6">
          <img src={wavierrLogo} alt="Wavierr Logo" className="w-24" />

          <div className="flex flex-col gap-6 text-gray-600 text-2xl items-center mt-4">
            <div className="avatar">
            <div className="relative w-20 h-20 cursor-pointer p-[5.5px]" onClick={()=>setProfileEdit(true)}>
      <img
        src={user?.avatar?.url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-wuYiRWzSyANZx8ccFY4sQvXkI_ve46_sAw&s"}
        alt="avatar"
        className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
      />
      <div className="absolute bottom-0 right-0 bg-primary p-1 rounded-full text-white">
        <FaPen size={10} />
      </div>
    </div>
            </div>
            <FiGlobe
              className='hover:text-blue-500 cursor-pointer'
              onClick={() => { setActiveTab('globe')}}
              
            />
            <FiMessageCircle
              className='hover:text-blue-500 cursor-pointer'
              onClick={() => { setActiveTab('message') }}
            />
            <FiUsers
              className='hover:text-blue-500 cursor-pointer'
              onClick={() => { setActiveTab('group') }} // have to check later
            />
            <FiPhone
              className='hover:text-blue-500 cursor-pointer'
              onClick={() => { setActiveTab('phone') }}
            />
          </div>
        </div>

        {/* Bottom: Settings + Logout */}
        <div className="flex flex-col gap-6 text-gray-600 text-2xl items-center">
          <FiSettings className="hover:text-blue-500 cursor-pointer" />
          <FiLogOut
            onClick={handleLogout}
            className="hover:text-red-500 cursor-pointer"
            title="Logout"
          />
        </div>
      </div>
        {isProfileEdit && <ProfileEdit isProfileEdit={isProfileEdit} setProfileEdit= {setProfileEdit}/>}
    </div>
  );

}

export default Settings;
