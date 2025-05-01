
import React from 'react'
import Settings from './componenets/home/Settings';

function MainLayout({children}) {
    return (
        <div className="flex w-[100%]">
          {/* Sidebar visible only on md and up */}
          <div className="w-auto shrink-0">
            <Settings/>
          </div>
    
          {/* Page Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      );
    
}

export default MainLayout