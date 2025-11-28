import React, { useState, useEffect } from 'react';
import { AppId, WindowState } from '../types';
import { APP_CONFIGS } from '../constants';
import { IconWinStart } from './Icons';

interface TaskbarProps {
  windows: WindowState[];
  activeId: string | null;
  onAppClick: (appId: AppId) => void;
  onWindowClick: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onToggleStart: (e: React.MouseEvent) => void;
  startOpen: boolean;
}

// Mini components for the thumbnails to simulate "Live" content
const ThumbnailContent: React.FC<{ appId: AppId }> = ({ appId }) => {
  switch (appId) {
    case AppId.EXPLORER:
      return (
        <div className="w-full h-full bg-white flex flex-col p-1 gap-1">
          <div className="h-2 w-full bg-gray-100 border-b flex items-center gap-1 px-1">
             <div className="w-1 h-1 rounded-full bg-gray-300"></div>
             <div className="w-8 h-1 bg-gray-200 rounded-sm"></div>
          </div>
          <div className="flex-1 flex gap-1">
             <div className="w-4 bg-gray-50 h-full"></div>
             <div className="flex-1 grid grid-cols-3 gap-1 content-start">
               {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-blue-50/50 rounded-sm border border-blue-100/50"></div>)}
             </div>
          </div>
        </div>
      );
    case AppId.WORD:
      return (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center p-2">
          <div className="w-16 h-full bg-white shadow-sm flex flex-col gap-1 p-1">
             <div className="w-10 h-1 bg-gray-800 rounded-sm mb-1"></div>
             <div className="w-14 h-0.5 bg-gray-300"></div>
             <div className="w-12 h-0.5 bg-gray-300"></div>
             <div className="w-14 h-0.5 bg-gray-300"></div>
          </div>
        </div>
      );
    case AppId.BROWSER:
      return (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="h-3 bg-gray-200 flex items-center px-1 gap-1">
             <div className="w-1 h-1 rounded-full bg-gray-400"></div>
             <div className="flex-1 h-1.5 bg-white rounded-sm border border-gray-300"></div>
          </div>
          <div className="flex-1 flex items-center justify-center">
             <div className="w-6 h-6 rounded-full border-2 border-blue-400 border-t-transparent animate-spin"></div>
          </div>
        </div>
      );
    case AppId.CALCULATOR:
      return (
        <div className="w-full h-full bg-gray-50 flex flex-col p-1 gap-0.5">
           <div className="h-6 bg-gray-100 text-right px-1 text-[8px] flex items-center justify-end">123</div>
           <div className="flex-1 grid grid-cols-4 gap-0.5">
              {[...Array(12)].map((_, i) => <div key={i} className="bg-white rounded-[1px] shadow-sm"></div>)}
           </div>
        </div>
      );
    case AppId.PAINT:
      return (
        <div className="w-full h-full bg-white flex flex-col">
           <div className="h-3 bg-gray-100 border-b"></div>
           <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-red-300 relative">
                 <div className="absolute inset-2 bg-blue-200 rounded-full opacity-50"></div>
              </div>
           </div>
        </div>
      );
    default:
      return <div className="w-full h-full bg-gray-100"></div>;
  }
};

const Taskbar: React.FC<TaskbarProps> = ({ windows, activeId, onAppClick, onWindowClick, onCloseWindow, onToggleStart, startOpen }) => {
  const [time, setTime] = useState(new Date());
  const [hoveredApp, setHoveredApp] = useState<AppId | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pinnedApps = [AppId.EXPLORER, AppId.BROWSER, AppId.WORD, AppId.PAINT, AppId.CALCULATOR];
  const taskbarApps = Array.from(new Set([...pinnedApps, ...windows.map(w => w.appId)]));

  return (
    <div className="absolute bottom-0 left-0 w-full h-12 bg-[#f3f4f6]/85 backdrop-blur-xl border-t border-white/40 flex items-center justify-between px-2 z-50 transition-colors duration-300">
      <div className="flex-1"></div>

      {/* Centered App Icons */}
      <div className="flex items-center gap-2 h-full px-2 relative">
        <button 
          onClick={onToggleStart}
          className={`group relative h-10 w-10 flex items-center justify-center rounded hover:bg-white/50 transition-colors ${startOpen ? 'bg-white/40' : ''}`}
          title="Start"
        >
           <div className="transform transition-transform duration-200 group-hover:scale-90 group-active:scale-75">
             <IconWinStart className="w-7 h-7" />
           </div>
        </button>

        {taskbarApps.map(appId => {
          const appWindows = windows.filter(w => w.appId === appId);
          const isOpen = appWindows.length > 0;
          const isActive = appWindows.some(w => w.id === activeId && !w.isMinimized);
          
          return (
            <div 
              key={appId} 
              className="relative"
              onMouseEnter={() => setHoveredApp(appId)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* Windows 11 Style Hover Preview */}
              {hoveredApp === appId && isOpen && (
                <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 z-[60]">
                  {appWindows.map(win => (
                    <div 
                      key={win.id}
                      className="w-48 h-32 bg-gray-800/90 backdrop-blur-md rounded-lg p-2 shadow-2xl flex flex-col gap-2 border border-white/10 group/preview"
                    >
                      {/* Preview Header */}
                      <div className="flex items-center gap-2 text-white">
                        <div className="w-4 h-4">
                          {React.cloneElement(APP_CONFIGS[appId].icon as React.ReactElement<{ className?: string }>, { className: 'w-4 h-4' })}
                        </div>
                        <span className="text-xs truncate flex-1 font-medium">{win.title}</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onCloseWindow(win.id); }}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-500/80 hover:text-white text-gray-400 transition-colors"
                        >
                           <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor"><path d="M1 1L9 9M9 1L1 9" /></svg>
                        </button>
                      </div>

                      {/* Preview Thumbnail Body */}
                      <div 
                        className="flex-1 bg-white rounded overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          onWindowClick(win.id);
                          setHoveredApp(null);
                        }}
                      >
                         <ThumbnailContent appId={appId} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                   if (isOpen) {
                       // If multiple windows, toggle the most recent or active one
                       // (Simplified behavior: just focus/toggle last active)
                       const target = appWindows.find(w => w.id === activeId) || appWindows[appWindows.length - 1];
                       onWindowClick(target.id);
                   } else {
                       onAppClick(appId);
                   }
                }}
                className={`group relative h-10 w-10 flex items-center justify-center rounded hover:bg-white/50 transition-all duration-200 ${isActive ? 'bg-white/40' : ''}`}
              >
                <div className="transform transition-transform duration-200 group-hover:-translate-y-1 group-active:translate-y-0 group-active:scale-90">
                  {React.cloneElement(APP_CONFIGS[appId].icon as React.ReactElement<{ className?: string }>, { className: 'w-7 h-7' })}
                </div>
                
                <div className={`absolute bottom-0.5 w-1.5 h-1 rounded-full transition-all duration-300 ${isOpen ? (isActive ? 'w-4 bg-blue-500' : 'bg-gray-400') : 'w-0 opacity-0'}`}></div>
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex-1 flex justify-end items-center h-full">
        <div className="flex items-center gap-2 px-3 py-1 hover:bg-white/50 rounded-md transition-colors cursor-default" title="System Tray">
          <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.536 8.464a5 5 0 000 7.072m-2.828-9.9a9 9 0 000 12.728" /></svg>
          <div className="flex flex-col items-end leading-none ml-2">
            <span className="text-xs font-semibold text-gray-800">{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            <span className="text-[10px] text-gray-600">{time.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;