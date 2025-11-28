import React, { useState, useEffect, useRef } from 'react';
import { WindowState } from '../types';

interface WindowFrameProps {
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const WindowFrame: React.FC<WindowFrameProps> = ({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  children,
  icon
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Trigger opening animation
  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsOpening(false));
    return () => cancelAnimationFrame(timer);
  }, []);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200); // Match CSS transition duration
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onMove(e.clientX - dragOffset.current.x, e.clientY - dragOffset.current.y);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, onMove]);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onFocus();
    if (!windowState.isMaximized) {
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - windowState.position.x,
        y: e.clientY - windowState.position.y
      };
    }
  };

  if (windowState.isMinimized) return null;

  const frameStyle: React.CSSProperties = windowState.isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)', transform: 'none', borderRadius: 0 }
    : {
        width: windowState.size.width,
        height: windowState.size.height,
        transform: `translate(${windowState.position.x}px, ${windowState.position.y}px)`,
      };

  // Animation and Transition Logic
  // - duration-0 when dragging to ensure window follows mouse perfectly (no lag)
  // - duration-200 for open/close/maximize animations
  const transitionClass = isDragging ? 'duration-0' : 'duration-200 ease-out';
  const animationClass = (isClosing || isOpening) ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

  return (
    <div
      className={`absolute flex flex-col bg-white rounded-xl overflow-hidden border border-gray-300/50 transition-all ${transitionClass} ${animationClass} ${
        isDragging ? 'shadow-2xl' : 'shadow-xl'
      }`}
      style={{
        ...frameStyle,
        zIndex: windowState.zIndex,
        willChange: 'transform, opacity, width, height', // Optimize rendering
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 10px 40px rgba(0,0,0,0.2)'
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-[#f3f9fd] border-b border-gray-100 flex items-center justify-between px-3 select-none"
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
          {icon}
          <span className="mt-0.5">{windowState.title}</span>
        </div>
        <div className="flex items-center h-full gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-8 h-8 rounded hover:bg-gray-200/50 flex items-center justify-center text-gray-500 transition-colors"
          >
            <svg width="10" height="1" viewBox="0 0 10 1"><path d="M0 0.5H10" stroke="currentColor" strokeWidth="1"/></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-8 h-8 rounded hover:bg-gray-200/50 flex items-center justify-center text-gray-500 transition-colors"
          >
            {windowState.isMaximized ? (
               <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor"><path d="M3.5 3.5V1.5H8.5V6.5H6.5" /><rect x="1.5" y="3.5" width="5" height="5" /></svg>
            ) : (
               <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor"><rect x="1.5" y="1.5" width="7" height="7" /></svg>
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="w-8 h-8 rounded hover:bg-red-500 hover:text-white flex items-center justify-center text-gray-500 transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor"><path d="M1 1L9 9M9 1L1 9" /></svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;