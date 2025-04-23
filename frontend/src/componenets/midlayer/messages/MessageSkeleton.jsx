import React from 'react'
import {
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiPaperclip,
  FiSmile,
  FiFileText,
  FiSend
} from 'react-icons/fi';

function MessageSkeleton({ userId }) {
  console.log("inside message skeleton");

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="User"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Obi-Wan Kenobi</h3>
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            {userId}
            <time className="text-xs opacity-50 ml-2">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>

        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50 ml-2">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="flex items-center gap-8 p-4 border-t border-gray-300">
        {/* Input Field */}
        <div className="flex flex-1 bg-[#74D4FF] rounded-full items-center px-4 py-2">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-transparent text-white placeholder-white outline-none"
          />
          <FiSend className="text-white text-xl cursor-pointer" />
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
