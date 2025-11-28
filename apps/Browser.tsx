import React, { useState } from 'react';

const Browser: React.FC = () => {
  // Use a special Google URL that is more iframe-friendly
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [inputUrl, setInputUrl] = useState('https://www.google.com');
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl;
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `https://${target}`;
    }
    setUrl(target);
    setInputUrl(target);
    setIsLoading(true);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Address Bar */}
      <div className="bg-gray-100 border-b p-2 flex gap-2 items-center shadow-sm z-10">
        <div className="flex gap-2 text-gray-500">
           <button className="hover:bg-gray-200 rounded-full p-1.5 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
           <button className="hover:bg-gray-200 rounded-full p-1.5 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
           <button onClick={() => setUrl(url)} className="hover:bg-gray-200 rounded-full p-1.5 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6M1 20v-6h6"/></svg></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1">
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full px-4 py-1.5 rounded-full border border-gray-300 bg-[#f1f3f4] text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-inner"
            placeholder="Search with Google or enter a URL"
          />
        </form>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-0">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <iframe
          src={url}
          className="w-full h-full border-0"
          title="Browser"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
        {/* Overlay for sites that refuse connection */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center hidden">
            <span className="bg-black/75 text-white px-4 py-2 rounded">If content doesn't load, the website likely blocks embedding.</span>
        </div>
      </div>
    </div>
  );
};

export default Browser;