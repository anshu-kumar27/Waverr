import React, { useEffect, useRef, useState } from 'react';
import { FaUserPlus, FaHourglassHalf, FaUserTimes } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

function ConnectSkeleton({ item , profile }) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
    useEffect(()=>{
        const hasPendingRequest = profile.friendReqStatus.some(req => req.user === item._id);
        if(hasPendingRequest){
            setIsSent(true);
        }
    },[])
  
  const handleClick = async () => {
    setIsSending(true);
    try {
      if (!isSent) {
        await axios.post(`/api/v1/sendRequest/${item._id}`, null, { withCredentials: true });
        toast.success('Friend request sent');
        setIsSent(true);
      } else {
        await axios.delete(`/api/v1/cancelRequest/${item._id}`, { withCredentials: true });
        toast.info('Friend request cancelled');
        setIsSent(false);
      }
    } catch (error) {
      console.error('Request failed:', error);
      toast.error(isSent ? 'Failed to cancel request' : 'Failed to send request');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-md shadow-md mb-2">
      <div className="flex items-center gap-4">
        <img src={item.avatar.url} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
        <span className="text-lg font-semibold">{item.firstName}</span>
      </div>
      <button
        onClick={handleClick}
        disabled={isSending}
        className={`text-xl ${isSent ? 'text-red-600' : 'text-blue-600'}`}
      >
        {isSending ? (
          <FaHourglassHalf className="animate-spin" />
        ) : isSent ? (
          <FaUserTimes />
        ) : (
          <FaUserPlus />
        )}
      </button>
    </div>
  );
}

export default ConnectSkeleton;
