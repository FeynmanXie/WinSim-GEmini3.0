import React, { useState } from 'react';
import { FileItem } from '../types';
import { INITIAL_FILES } from '../constants';

const FileIcon = ({ type }: { type: 'folder' | 'file' }) => (
  type === 'folder' ? (
    <svg className="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  ) : (
    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
    </svg>
  )
);

const Explorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<FileItem[]>([INITIAL_FILES[0]]);
  const currentFolder = currentPath[currentPath.length - 1];

  const navigateTo = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item]);
    }
  };

  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b p-2 flex items-center gap-2">
        <button 
          onClick={navigateUp}
          disabled={currentPath.length <= 1}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
        <div className="flex-1 bg-gray-50 border px-3 py-1 text-sm rounded text-gray-600 truncate">
          {currentPath.map(p => p.name).join(' > ')}
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar (Mock) */}
        <div className="w-48 border-r bg-gray-50 p-2 hidden sm:block">
          <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Quick Access</div>
          {['Desktop', 'Downloads', 'Documents', 'Pictures'].map(name => (
            <div key={name} className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              {name}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 content-start overflow-y-auto">
          {currentFolder.children && currentFolder.children.length > 0 ? (
            currentFolder.children.map(item => (
              <div 
                key={item.id} 
                className="flex flex-col items-center gap-1 p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded cursor-pointer group"
                onDoubleClick={() => navigateTo(item)}
              >
                <FileIcon type={item.type} />
                <span className="text-xs text-center text-gray-700 break-all px-1 group-hover:text-blue-700">{item.name}</span>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-sm mt-10">This folder is empty.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorer;