import React from 'react'
import Settings from './Settings'
import Index from './sidebar/Index'

function Home() {
  return (
    <div >
      <div className='flex h-screen'>
      <Settings/>
      </div>
    
    {/*  i need settings to be fixed and the other components should change according to the url */}
    <div className="flex-1">
      <Index/>
    </div>
    </div>
  )
}

export default Home