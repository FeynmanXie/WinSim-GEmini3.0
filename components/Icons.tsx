import React from 'react';

// Using Icons8 Fluent Color icons for realistic Windows 11 look
const IconImage = ({ src, className }: { src: string, className?: string }) => (
  <img 
    src={src} 
    className={`${className} object-contain drop-shadow-md`} 
    alt="icon" 
    draggable={false}
  />
);

export const IconExplorer = ({ className = "w-6 h-6" }: { className?: string }) => (
  <IconImage src="https://img.icons8.com/fluency/96/null/folder-invoices--v1.png" className={className} />
);

export const IconWord = ({ className = "w-6 h-6" }: { className?: string }) => (
  <IconImage src="https://img.icons8.com/fluency/96/null/microsoft-word-2019.png" className={className} />
);

export const IconPaint = ({ className = "w-6 h-6" }: { className?: string }) => (
  <IconImage src="https://img.icons8.com/fluency/96/null/paint-palette.png" className={className} />
);

export const IconCalculator = ({ className = "w-6 h-6" }: { className?: string }) => (
  <IconImage src="https://img.icons8.com/fluency/96/null/calculator.png" className={className} />
);

export const IconBrowser = ({ className = "w-6 h-6" }: { className?: string }) => (
  <IconImage src="https://img.icons8.com/fluency/96/null/chrome.png" className={className} />
);

export const IconWinStart = ({ className = "w-6 h-6" }: { className?: string }) => (
  <IconImage src="https://img.icons8.com/fluency/96/null/windows-11.png" className={className} />
);

// Generic SVG Icon component for line icons
const SvgIcon = ({ d, className = "w-5 h-5" }: { d: string; className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d={d} clipRule="evenodd"></path>
  </svg>
);

// Explorer specific icons
export const IconFolder = ({ className }: { className?: string }) => <SvgIcon className={className} d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />;
export const IconFile = ({ className }: { className?: string }) => <SvgIcon className={className} d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />;
export const IconChevronRight = ({ className }: { className?: string }) => <SvgIcon className={className} d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />;
export const IconHome = ({ className }: { className?: string }) => <SvgIcon className={className} d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />;
export const IconDesktop = ({ className }: { className?: string }) => <SvgIcon className={className} d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.586l-1.707 1.707A1 1 0 019 17v-2H5a2 2 0 01-2-2V5z" />;
export const IconDownload = ({ className }: { className?: string }) => <SvgIcon className={className} d="M4 12a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1zM4 5a1 1 0 011-1h10a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 8a1 1 0 011-1h6a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1V8z" />;
export const IconDocument = ({ className }: { className?: string }) => <SvgIcon className={className} d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />;
export const IconPictures = ({ className }: { className?: string }) => <SvgIcon className={className} d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 14a2 2 0 100 4 2 2 0 000-4z" />;
export const IconMusic = ({ className }: { className?: string }) => <SvgIcon className={className} d="M18 3a1 1 0 00-1.447-.894L6.447 6.106A1 1 0 006 7v8a3 3 0 103 3V9.586l7.553-3.479A1 1 0 0018 5V3z" />;
export const IconVideo = ({ className }: { className?: string }) => <SvgIcon className={className} d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm4 1v8l6-4-6-4z" />;
export const IconDrive = ({ className }: { className?: string }) => <SvgIcon className={className} d="M3 8v8a2 2 0 002 2h10a2 2 0 002-2V8h-2v2h-2V8H7v2H5V8H3zM5 3a2 2 0 00-2 2v1h14V5a2 2 0 00-2-2H5z" />;