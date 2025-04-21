import React from 'react';

const friends = [
  {
    id: 1,
    name: 'Alice',
    lastMessage: 'Hey, how are you?',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Bob',
    lastMessage: 'Let’s catch up later!',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Charlie',
    lastMessage: 'Sent the file.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Dana',
    lastMessage: 'Okay cool.',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 5,
    name: 'Eve',
    lastMessage: 'Good night!',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

function Sidebar({ onSelectFriend }) {
  return (
    <div className="w-[100%] h-full py-6 px-4 border-r border-gray-300 flex flex-col gap-4 overflow-auto">
      {/* Heading */}
      <h2 className="text-xl font-bold">Messages</h2>

      {/* Search Bar */}
      <div className="relative p-2 rounded-lg">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
  </svg>
  <input
    type="text"
    placeholder="Search"
    className="w-full pl-12 p-2 rounded-xl bg-[#74D4FF] outline-none text-white placeholder-white"
  />
</div>

      {/* Line Separator */}
      <div className="my-2 mx-4 h-[2px] bg-gray-300 rounded-full" />

      {/* Avatars scrollable row */}
      <div className="flex overflow-x-auto space-x-4 px-1">
        {friends.map((friend) => (
          <img
            key={friend.id}
            src={friend.avatar}
            alt={friend.name}
            className="w-12 h-12 rounded-full border-2 border-blue-400 shrink-0"
          />
        ))}
      </div>

      {/* Friends List */}
      <div className="mt-4 space-y-3 pr-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 295px)' }}>
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
          onClick={() => onSelectFriend(friend)}
        >
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold">{friend.name}</div>
            <div className="text-sm text-gray-600 truncate max-w-[180px]">
              {friend.lastMessage}
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Sidebar;
