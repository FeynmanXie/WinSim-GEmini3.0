import React from 'react';

export enum AppId {
  EXPLORER = 'explorer',
  WORD = 'word',
  PAINT = 'paint',
  CALCULATOR = 'calculator',
  BROWSER = 'browser'
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  content?: string; // For text files
  children?: FileItem[];
  icon?: React.ReactNode;
}

export interface IconProps {
  name: string;
  icon: React.ReactNode;
  onDoubleClick: () => void;
  style?: React.CSSProperties;
  onMouseDown?: (e: React.MouseEvent) => void;
}