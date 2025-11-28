import React, { useState } from 'react';
import { FileItem } from '../types';
import { INITIAL_FILES } from '../constants';

const FileIcon = ({ type }: { type: 'folder' | 'file' }) => {
  const commonClass = "w-12 h-12";
  if (type === 'folder') {
    return (
      <svg className={`${commonClass} text-yellow-500`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
      </svg>
    );
  }
  return (
    <svg className={`${commonClass} text-gray-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>
  );
};

const Explorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<FileItem[]>([INITIAL_FILES[0]]);
  const currentFolder = currentPath[currentPath.length - 1];

  const navigateTo = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item]);
    }
  };

  const navigateToIndex = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 font-sans">
      {/* Toolbar */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200 p-2 flex items-center gap-2 text-gray-800">
        <button 
          onClick={navigateUp}
          disabled={currentPath.length <= 1}
          className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div className="flex-1 bg-white border border-gray-300 px-3 py-1.5 text-sm rounded-md shadow-inner flex items-center gap-1 text-gray-700">
          {currentPath.map((p, i) => (
            <React.Fragment key={p.id}>
              <span 
                onClick={() => navigateToIndex(i)}
                className="hover:bg-gray-100 px-2 py-0.5 rounded cursor-pointer"
              >
                {p.name}
              </span>
              {i < currentPath.length - 1 && <span className="text-gray-400">/</span>}
            </React.Fragment>
          ))}
        </div>
        {/* Search Box (mock) */}
        <div className="w-48">
            <input type="text" placeholder="Search" className="w-full bg-white border border-gray-300 px-3 py-1.5 text-sm rounded-md shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-400" />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-gray-200 bg-white/80 p-3 hidden sm:block">
          <div className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">Favorites</div>
          {['Desktop', 'Downloads', 'Documents', 'Pictures', 'Music', 'Videos'].map(name => (
            <div key={name} className="flex items-center gap-3 px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-200/60 rounded cursor-pointer transition-colors">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              <span>{name}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 content-start">
            {currentFolder.children && currentFolder.children.length > 0 ? (
              currentFolder.children.map(item => (
                <div 
                  key={item.id} 
                  className="flex flex-col items-center gap-2 p-2 hover:bg-blue-100/70 border border-transparent hover:border-blue-200 rounded-lg cursor-pointer group transition-colors"
                  onDoubleClick={() => navigateTo(item)}
                >
                  <FileIcon type={item.type} />
                  <span className="text-xs text-center text-gray-800 break-words w-full px-1 group-hover:text-blue-800">{item.name}</span>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-sm mt-12">This folder is empty.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;