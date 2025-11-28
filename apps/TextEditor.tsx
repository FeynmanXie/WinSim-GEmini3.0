import React, { useRef, useState } from 'react';

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);

  const execCmd = (cmd: string) => {
    document.execCommand(cmd, false, undefined);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || "";
      setWordCount(text.trim().split(/\s+/).filter(w => w.length > 0).length);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex gap-1 items-center flex-wrap">
        <button onClick={() => execCmd('bold')} className="p-1.5 hover:bg-gray-200 rounded min-w-[32px] font-bold" title="Bold">B</button>
        <button onClick={() => execCmd('italic')} className="p-1.5 hover:bg-gray-200 rounded min-w-[32px] italic" title="Italic">I</button>
        <button onClick={() => execCmd('underline')} className="p-1.5 hover:bg-gray-200 rounded min-w-[32px] underline" title="Underline">U</button>
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <select className="text-sm border rounded px-1 py-1 bg-white outline-none" onChange={(e) => document.execCommand('fontName', false, e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times</option>
          <option value="Courier New">Courier</option>
        </select>
      </div>

      {/* Editor Area */}
      <div 
        ref={editorRef}
        contentEditable
        className="flex-1 p-8 outline-none overflow-y-auto font-sans text-gray-800"
        style={{ minHeight: '200px' }}
        onInput={handleInput}
      >
        <p>Start typing here...</p>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 border-t px-4 py-1 text-xs text-gray-500 flex justify-between">
        <span>UTF-8</span>
        <span>{wordCount} words</span>
      </div>
    </div>
  );
};

export default TextEditor;