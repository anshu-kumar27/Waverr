import React from 'react';

import moment from 'moment';
import { zustandStore } from '../../../zustand/zustand';
import userGetConversations from '../../../action/messageAction';

userGetConversations();
function MessageBody({avatarUrl,userId }) {
  const { selectedConversation,messages } = zustandStore();
    

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages && messages.length > 0 ? (
        messages.map((msg) => {
          const isIncoming = msg.receiver === selectedConversation;
          const chatPosition = isIncoming ? 'chat-start' : 'chat-end';
          const displayName = isIncoming ? 'Sender' : 'You';
          const avatar = avatarUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

          return (
            <div className={`chat ${chatPosition}`} key={msg._id}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={avatar} />
                </div>
              </div>

              <div className="chat-header">
                {displayName}
                <time className="text-xs opacity-50 ml-2">
                  {moment(msg.createdAt).format('h:mm A')}
                </time>
              </div>

              <div className="chat-bubble max-w-xs break-words">
                {msg.type === 'image' && msg.content.image && (
                  <img
                    src={msg.content.image}
                    alt="Sent content"
                    className="rounded-lg mb-2 max-w-full"
                  />
                )}
                {msg.content.text && <p>{msg.content.text}</p>}
              </div>

              <div className="chat-footer opacity-50">
                {isIncoming ? 'Received' : 'Delivered'}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No messages yet.</p>
      )}
    </div>
  );
}

export default MessageBody;
