import React, { useState } from 'react';
import wavierrLogo from '../../assets/waverr.svg';
import { useDispatch } from 'react-redux';
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

function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('messages');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <div className="h-screen w-[10%] flex justify-center py-6">
      <div className="h-full w-full border-r border-gray-300 rounded-lg flex flex-col justify-between items-center overflow-hidden px-2 py-2">
        {/* Top: Logo + Menu Icons */}
        <div className="flex flex-col items-center gap-6">
          <img src={wavierrLogo} alt="Wavierr Logo" className="w-24" />
  
          <div className="flex flex-col gap-6 text-gray-600 text-2xl items-center mt-4">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <FiMessageCircle
  onClick={() => navigate('/messages')}
  className={`cursor-pointer ${location.pathname === '/messages' ? 'text-blue-500' : 'text-gray-600'}`}
/>
<FiUsers
  onClick={() => navigate('/groups')}
  className={`cursor-pointer ${location.pathname === '/groups' ? 'text-blue-500' : 'text-gray-600'}`}
/>
<FiPhone
  onClick={() => navigate('/calls')}
  className={`cursor-pointer ${location.pathname === '/calls' ? 'text-blue-500' : 'text-gray-600'}`}
/>
<FiGlobe
  onClick={() => navigate('/communities')}
  className={`cursor-pointer ${location.pathname === '/communities' ? 'text-blue-500' : 'text-gray-600'}`}
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
    </div>
  );
  
}

export default Settings;
