import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import ChatArea from '../components/ChatArea';
import { Menu } from 'lucide-react';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile menu button (moved to the right) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Sidebar with responsive classes */}
      <div className={` 
        fixed lg:relative inset-y-0 left-0 z-40 w-[280px] sm:w-[320px]
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        bg-white border-r border-gray-200
      `}>
        <Sidebar />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-blend-saturation bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main chat area */}
      <div className="flex-1 relative w-full lg:w-[calc(100%-320px)]">
        <ChatArea />
      </div>
    </div>
  );
}

export default Home;
