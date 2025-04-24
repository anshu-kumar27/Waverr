import React from 'react'
import Settings from './Settings'
import { zustandStore } from '../../zustand/zustand';
import Message from '../midlayer/Message';
import Group from '../midlayer/Group';
import Call from '../midlayer/Call';
import Globe from '../midlayer/Globe'

function Home() {
  const { activeTab, setActiveTab } = zustandStore();
  return (
    <div className='w-full flex' >
      <div className='flex h-screen w-[10%]'>
      <Settings/>
      </div>
    
    <div className="flex-1">
    {activeTab === 'message' && <Message />}
    {activeTab === 'globe' && <Globe />} 
    {activeTab === 'phone' && <Call />}
    {activeTab === 'group' && <Group />}
    </div>
    </div>
  )
}

export default Home