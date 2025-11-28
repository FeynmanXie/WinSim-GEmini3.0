import { FileItem, AppId } from './types';
import { IconExplorer, IconWord, IconPaint, IconCalculator, IconBrowser } from './components/Icons';

export const INITIAL_FILES: FileItem[] = [
  {
    id: 'root',
    name: 'This PC',
    type: 'folder',
    children: [
      {
        id: 'docs',
        name: 'Documents',
        type: 'folder',
        children: [
          { id: 'resume', name: 'Resume.rtf', type: 'file', content: 'John Doe - Developer' },
          { id: 'notes', name: 'ProjectNotes.txt', type: 'file', content: '1. Build React OS\n2. ???\n3. Profit' }
        ]
      },
      {
        id: 'pics',
        name: 'Pictures',
        type: 'folder',
        children: [
          { id: 'img1', name: 'Vacation.jpg', type: 'file' },
          { id: 'img2', name: 'Cat.png', type: 'file' }
        ]
      },
      { id: 'downloads', name: 'Downloads', type: 'folder', children: [] }
    ]
  }
];

export const APP_CONFIGS = {
  [AppId.EXPLORER]: { title: 'File Explorer', icon: <IconExplorer className="w-5 h-5" /> },
  [AppId.WORD]: { title: 'Word', icon: <IconWord className="w-5 h-5" /> },
  [AppId.PAINT]: { title: 'Paint', icon: <IconPaint className="w-5 h-5" /> },
  [AppId.CALCULATOR]: { title: 'Calculator', icon: <IconCalculator className="w-5 h-5" /> },
  [AppId.BROWSER]: { title: 'Google Chrome', icon: <IconBrowser className="w-5 h-5" /> },
};