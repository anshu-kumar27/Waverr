import React, { useEffect } from 'react';
// import socket from './socket' // we'll use this in next step

function Messages({ selectedFriend }) {
  useEffect(() => {
    if (selectedFriend) {
      // socket.emit('joinRoom', selectedFriend.id); // send to server
      console.log('Joined room for:', selectedFriend.name);
    }
  }, [selectedFriend]);

  if (!selectedFriend) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-lg">
        Hello user 👋, start messaging someone!
      </div>
    );
  }

  return (
    <div className="h-full p-4">
      <h2 className="text-2xl font-semibold mb-2">{selectedFriend.name}</h2>
      {/* Placeholder for messages */}
      <div className="text-gray-500">Conversation with {selectedFriend.name} will appear here.</div>
    </div>
  );
}

export default Messages;
