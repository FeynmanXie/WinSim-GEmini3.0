import React, { useState, useEffect, useRef } from 'react';
import { AppId, WindowState } from './types';
import { APP_CONFIGS } from './constants';
import WindowFrame from './components/WindowFrame';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import LoginScreen from './components/LoginScreen';
import Explorer from './apps/Explorer';
import TextEditor from './apps/TextEditor';
import Paint from './apps/Paint';
import Calculator from './apps/Calculator';
import Browser from './apps/Browser';

interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isVisible: boolean;
}

// Initial App State
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [startOpen, setStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, visible: boolean }>({ x: 0, y: 0, visible: false });
  
  // Selection Box State
  const [selectionBox, setSelectionBox] = useState<SelectionBox>({ startX: 0, startY: 0, currentX: 0, currentY: 0, isVisible: false });
  const [selectedIcons, setSelectedIcons] = useState<Set<AppId>>(new Set());
  const desktopRef = useRef<HTMLDivElement>(null);

  const openApp = (appId: AppId) => {
    const newId = `${appId}-${Date.now()}`;
    const newWindow: WindowState = {
      id: newId,
      appId,
      title: APP_CONFIGS[appId].title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: zIndexCounter + 1,
      position: { x: 50 + (windows.length * 30), y: 50 + (windows.length * 30) },
      size: { width: 800, height: 500 } // Default size
    };

    if (appId === AppId.CALCULATOR) {
      newWindow.size = { width: 320, height: 480 };
    }

    setWindows([...windows, newWindow]);
    setActiveId(newId);
    setZIndexCounter(prev => prev + 1);
    setStartOpen(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const focusWindow = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;
    
    if (win.isMinimized) {
      updateWindow(id, { isMinimized: false, zIndex: zIndexCounter + 1 });
    } else {
      updateWindow(id, { zIndex: zIndexCounter + 1 });
    }
    setActiveId(id);
    setZIndexCounter(prev => prev + 1);
  };

  const updateWindow = (id: string, updates: Partial<WindowState>) => {
    setWindows(windows.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, visible: true });
    setStartOpen(false);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    // Only clear if clicking directly on background and not dragging
    if (!selectionBox.isVisible) {
      setContextMenu({ ...contextMenu, visible: false });
      setStartOpen(false);
      // If click target is the background itself, clear selection
      if (e.target === e.currentTarget) {
        setSelectedIcons(new Set());
      }
    }
  };

  // Selection Box Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectionBox({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
        isVisible: true
      });
      // Clear selection on new drag start (mimicking standard behavior without ctrl)
      setSelectedIcons(new Set());
      setContextMenu({ ...contextMenu, visible: false });
      setStartOpen(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectionBox.isVisible) return;

    const newSelectionBox = {
      ...selectionBox,
      currentX: e.clientX,
      currentY: e.clientY
    };
    setSelectionBox(newSelectionBox);

    // Calculate intersection
    const left = Math.min(newSelectionBox.startX, newSelectionBox.currentX);
    const top = Math.min(newSelectionBox.startY, newSelectionBox.currentY);
    const right = Math.max(newSelectionBox.startX, newSelectionBox.currentX);
    const bottom = Math.max(newSelectionBox.startY, newSelectionBox.currentY);

    const newSelected = new Set<AppId>();
    
    Object.values(AppId).forEach(appId => {
      const el = document.getElementById(`desktop-icon-${appId}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        // Check if rectangle overlaps
        const overlaps = !(rect.right < left || 
                           rect.left > right || 
                           rect.bottom < top || 
                           rect.top > bottom);
        if (overlaps) {
          newSelected.add(appId);
        }
      }
    });
    
    setSelectedIcons(newSelected);
  };

  const handleMouseUp = () => {
    setSelectionBox({ ...selectionBox, isVisible: false });
  };

  const renderAppContent = (appId: AppId) => {
    switch (appId) {
      case AppId.EXPLORER: return <Explorer />;
      case AppId.WORD: return <TextEditor />;
      case AppId.PAINT: return <Paint />;
      case AppId.CALCULATOR: return <Calculator />;
      case AppId.BROWSER: return <Browser />;
      default: return null;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div 
      ref={desktopRef}
      className="w-screen h-screen overflow-hidden relative font-sans text-gray-900 select-none bg-cover bg-center"
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopContextMenu}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        backgroundImage: 'url(https://i.redd.it/5bwxtq07ny571.jpg)',
        backgroundColor: '#1e3a8a' 
      }}
    >
      {/* Selection Box */}
      {selectionBox.isVisible && (
        <div 
          className="absolute bg-blue-500/30 border border-blue-500/60 z-10 pointer-events-none"
          style={{
            left: Math.min(selectionBox.startX, selectionBox.currentX),
            top: Math.min(selectionBox.startY, selectionBox.currentY),
            width: Math.abs(selectionBox.currentX - selectionBox.startX),
            height: Math.abs(selectionBox.currentY - selectionBox.startY)
          }}
        />
      )}

      {/* Desktop Icons */}
      <div className="absolute top-0 left-0 p-2 flex flex-col flex-wrap h-[calc(100%-48px)] gap-2 content-start z-0">
        {Object.values(AppId).map(appId => {
          const isSelected = selectedIcons.has(appId);
          return (
            <div 
              id={`desktop-icon-${appId}`}
              key={appId}
              onDoubleClick={() => openApp(appId)}
              onClick={(e) => {
                 e.stopPropagation();
                 setSelectedIcons(new Set([appId]));
              }}
              className={`w-[84px] relative flex flex-col items-center gap-1 p-2 rounded-[2px] border group transition-colors cursor-default ${
                isSelected 
                  ? 'bg-blue-100/40 border-white/20' 
                  : 'border-transparent hover:bg-white/10 hover:border-white/10'
              }`}
            >
              {/* Checkbox for selection state - visible on hover or selection */}
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 border border-gray-400 bg-white shadow-sm flex items-center justify-center ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {isSelected && <svg className="w-3 h-3 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
              </div>

              <div className="filter drop-shadow-sm transform transition-transform group-active:scale-95 mb-1 pointer-events-none">
                {React.cloneElement(APP_CONFIGS[appId].icon as React.ReactElement<{ className?: string }>, { className: 'w-12 h-12' })}
              </div>
              <span className={`text-[12px] text-center font-normal leading-tight line-clamp-2 px-1 rounded-sm pointer-events-none ${isSelected ? 'text-white' : 'text-white'}`} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                {APP_CONFIGS[appId].title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Windows */}
      {windows.map(win => (
        <WindowFrame
          key={win.id}
          windowState={win}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => {
            updateWindow(win.id, { isMinimized: true });
            setActiveId(null);
          }}
          onMaximize={() => updateWindow(win.id, { isMaximized: !win.isMaximized })}
          onFocus={() => focusWindow(win.id)}
          onMove={(x, y) => updateWindow(win.id, { position: { x, y } })}
          onResize={(width, height) => updateWindow(win.id, { size: { width, height } })}
          icon={APP_CONFIGS[win.appId].icon}
        >
          {renderAppContent(win.appId)}
        </WindowFrame>
      ))}

      {/* Context Menu */}
      {contextMenu.visible && (
        <div 
          className="absolute bg-[#eeeeee]/95 backdrop-blur-xl border border-gray-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.2)] rounded-lg py-1.5 z-[9999] min-w-[240px]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200/50 flex items-center gap-3 transition-colors" onClick={() => window.location.reload()}>
            <div className="w-4 flex justify-center"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></div>
            <span>Refresh</span>
          </button>
          <div className="h-px bg-gray-300/50 my-1 mx-2"></div>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200/50 flex items-center gap-3 transition-colors">
            <div className="w-4 flex justify-center"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg></div>
            <span>Personalize</span>
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200/50 flex items-center gap-3 transition-colors">
             <div className="w-4 flex justify-center"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
             <span>Display settings</span>
          </button>
        </div>
      )}

      {/* UI Shell */}
      <StartMenu 
        isOpen={startOpen} 
        onAppClick={openApp}
        onLogout={() => {
            setStartOpen(false);
            setIsLoggedIn(false);
        }}
      />
      <Taskbar 
        windows={windows} 
        activeId={activeId} 
        onAppClick={openApp}
        onWindowClick={(id) => focusWindow(id)}
        onToggleStart={(e) => { e?.stopPropagation(); setStartOpen(!startOpen); }}
        startOpen={startOpen}
        onCloseWindow={closeWindow}
      />
    </div>
  );
};

export default App;