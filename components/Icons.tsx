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