import React, { useState } from 'react';
import { AppId } from '../types';
import { APP_CONFIGS } from '../constants';

interface StartMenuProps {
  onAppClick: (appId: AppId) => void;
  isOpen: boolean;
  onLogout: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onAppClick, isOpen, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!isOpen) return null;

  return (
    <div 
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-[640px] h-[650px] bg-[#f2f6fa]/95 backdrop-blur-2xl border border-gray-300/50 shadow-2xl rounded-xl p-6 z-50 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
    >
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
           <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
        </div>
        <input 
            type="text" 
            placeholder="Search for apps, settings, and documents" 
            className="w-full bg-[#eef1f5] border-b-2 border-transparent focus:border-blue-500 rounded-md py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:bg-white transition-colors placeholder-gray-500 text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Pinned Section */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold text-gray-800">Pinned</span>
            <button className="text-xs bg-white border px-2 py-1 rounded text-gray-600 hover:bg-gray-50">All apps &gt;</button>
        </div>
        
        <div className="grid grid-cols-6 gap-y-4 gap-x-2">
          {Object.values(AppId).map((appId) => (
            <button
              key={appId}
              onClick={() => onAppClick(appId)}
              className="flex flex-col items-center gap-2 p-2 hover:bg-white/60 rounded-lg transition-all group"
            >
              <div className="transform transition-transform group-hover:scale-105 group-active:scale-95">
                {React.cloneElement(APP_CONFIGS[appId].icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10" })}
              </div>
              <span className="text-[11px] font-medium text-center text-gray-700">{APP_CONFIGS[appId].title}</span>
            </button>
          ))}
          {/* Fillers for visual density */}
          <div className="flex flex-col items-center gap-2 p-2 opacity-50 grayscale hover:grayscale-0 hover:bg-white/60 rounded-lg transition-all cursor-pointer">
             <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">X</div>
             <span className="text-[11px] font-medium text-center text-gray-700">Excel</span>
          </div>
           <div className="flex flex-col items-center gap-2 p-2 opacity-50 grayscale hover:grayscale-0 hover:bg-white/60 rounded-lg transition-all cursor-pointer">
             <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center text-white font-bold text-xs">P</div>
             <span className="text-[11px] font-medium text-center text-gray-700">PowerPoint</span>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold text-gray-800">Recommended</span>
            <button className="text-xs bg-white border px-2 py-1 rounded text-gray-600 hover:bg-gray-50">More &gt;</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 px-2">
          <div className="flex items-center gap-3 p-2 hover:bg-white/60 rounded-lg cursor-pointer transition-colors">
             <div className="w-8 h-8 flex items-center justify-center">
                 <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-semibold text-gray-800">Resume.rtf</span>
               <span className="text-[10px] text-gray-500">10m ago</span>
             </div>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-white/60 rounded-lg cursor-pointer transition-colors">
             <div className="w-8 h-8 flex items-center justify-center">
                 <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-semibold text-gray-800">Project Images</span>
               <span className="text-[10px] text-gray-500">2h ago</span>
             </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-12 border-t border-gray-300/50 -mx-6 -mb-6 px-6 bg-[#f0f3f8] rounded-b-xl flex items-center justify-between">
        <div className="flex items-center gap-3 hover:bg-white/50 px-2 py-1 rounded-md cursor-pointer transition-colors group relative">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
             A
          </div>
          <span className="text-xs font-semibold text-gray-700">Administrator</span>
          
          {/* Simple User Menu Popup */}
          <div className="absolute bottom-10 left-0 w-32 bg-white rounded-lg shadow-xl border border-gray-200 hidden group-hover:block py-1">
             <button onClick={onLogout} className="w-full text-left px-4 py-2 text-xs hover:bg-gray-100 text-gray-700">Sign out</button>
          </div>
        </div>
        
        <button className="p-2 hover:bg-white/50 rounded-md text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </div>
    </div>
  );
};

export default StartMenu;