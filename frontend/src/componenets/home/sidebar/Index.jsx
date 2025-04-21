import React, { useState } from 'react'
import Messages from './Messages'
import Groups from './Groups'
import Communities from './Communities'
import CallHistory from './CallHistory'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'

function Index() {
    const [selectedFriend, setSelectedFriend] = useState(null);
    return (
        <div className="flex h-screen">
          <div className="w-[45%] border-r">
            <Sidebar onSelectFriend={setSelectedFriend} />
          </div>
          <div className="">
            <Messages selectedFriend={selectedFriend} />
          </div>
        </div>
    )
}

export default Index;
