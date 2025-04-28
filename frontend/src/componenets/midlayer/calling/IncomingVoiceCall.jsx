import React from 'react'
import { useCall } from '../../../socket/Callcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPhone, FaVideo } from 'react-icons/fa'; 
function IncomingVoiceCall() {
  const { incomingCall, setIncomingCall, setOnCall } = useCall();

  const handleAccept = async () => {
    try {
      await axios.post('/api/v1/callAccept', { incomingCall }, {
        credentials: 'include'
      });
      setOnCall(true);
    } catch (error) {
      console.log(error);
      toast.error(error.err)
      setOnCall(false);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post('/api/v1/callReject', { incomingCall }, {
        credentials: 'include'
      });
      setOnCall(false);
      setIncomingCall(null);
    } catch (error) {
      console.log(error);
      toast.error(error.err)
      setOnCall(false);
    }
  };
  console.log("the socket data : ", incomingCall)
  if (!incomingCall) return null; // safety check

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg w-[95%] max-w-5xl h-[80%] shadow-2xl p-6 flex flex-col justify-between items-center">
        
        {/* User Avatar */}
        <div className="flex flex-col items-center mt-6">
          <img
            src={incomingCall.callerDetails?.avatar?.url}
            alt="Caller Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-bold">{incomingCall.callerDetails?.firstName  || 'Unknown Caller'}</h2>
        </div>

        {/* Accept/Reject Buttons */}
        <div className="flex gap-6 mt-10">
          {/* Accept Button */}
          <button
            onClick={handleAccept}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl"
          >
{incomingCall?.callDetails?.type === 'audio' ? (
  <FaPhone className="text-green-900 text-4xl" /> // Audio Call Icon
) : (
  <FaVideo className="text-blue-900 text-4xl" /> // Video Call Icon
)}
          </button>

          {/* Reject Button */}
          <button
            onClick={handleReject}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl"
          >
            {incomingCall?.callDetails?.type === 'audio' ? (
  <FaPhone className="text-red-900 text-4xl" /> // Audio Call Icon
) : (
  <FaVideo className="text-red-900 text-4xl" /> // Video Call Icon
)}
          </button>
        </div>

      </div>
    </div>
  )
}

export default IncomingVoiceCall;
