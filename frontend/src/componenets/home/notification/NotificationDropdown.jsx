import React from "react";
import { Check, X, BellOff } from "lucide-react";

export default function NotificationDropdown({ notifications }) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md border z-50 max-h-96 overflow-y-auto">
      <div className="p-4 font-semibold border-b text-center text-gray-700">
        Friend Requests
      </div>

      {(!notifications || notifications.length === 0) ? (
        <div className="flex flex-col items-center justify-center p-6 text-gray-500 text-sm">
          <BellOff className="w-10 h-10 mb-2 text-gray-400" />
          <p>No new friend requests</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notifications.map((notif, index) => (
            <li key={index} className="p-3 flex items-center space-x-3 hover:bg-gray-50">
              {/* Avatar */}
              <img
                src={notif?.user?.avatar?.url || "/default-avatar.png"}
                alt="avatar"
                className="w-12 rounded-full object-cover"
              />

              {/* Name & Date */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{notif?.user?.firstName || "User"}</p>
                <p className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p>
              </div>

              {/* Accept / Reject buttons */}
              <div className="flex space-x-2">
                <button className="text-green-600 hover:text-green-800">
                  <Check size={18} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <X size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
