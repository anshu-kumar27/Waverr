import React from 'react';
import { extractTime } from './timehandler';
import { useSelector } from 'react-redux';
function MessageBody({userId , messages, loading,userAvatar,  userName }) {
    const {user} = useSelector((state)=>state.user);
  return (
    <div className="flex-1 p-4 space-y-4">
        {messages.map((message) => {
      const chatCorner = message.receiver === userId ? "chat-start" : "chat-end";
      const name = message.receiver === userId ? userName : user.firstName;
      const time = extractTime({ time: message.createdAt });
      const text = message?.content?.text ?? '';
      const avtr = message.receiver === userId ? userAvatar : user.avatar.url;
      const image = message.content.image ?? '';

      return (
        <div key={message._id} className={`chat ${chatCorner}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={avtr}
              />
            </div>
          </div>
            <div className="chat-header">
            {name}
          </div>
          {image && (
            <div className="chat-bubble">
              <img src={image} alt="attachment" className="max-w-xs rounded-lg" />
            </div>
          )}
          {text && <div className="chat-bubble">{text}</div>}

          <div className="chat-footer opacity-50">{time}</div>
        </div>
      );
    })}


        {/* <div className="chat chat-end">
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
        </div> */}
      </div> 
  );
}

export default MessageBody;
