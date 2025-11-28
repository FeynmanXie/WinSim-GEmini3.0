import React, { useState, useEffect } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [time, setTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLocked(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleLogin = () => {
    // Simulate a brief loading state if desired, but for now instant login
    onLogin();
  };

  if (isLocked) {
    return (
      <div 
        className={`fixed inset-0 z-[100] bg-cover bg-center flex flex-col items-center pt-24 text-white transition-all duration-500 ease-in-out ${isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
        style={{ backgroundImage: 'url(https://i.redd.it/5bwxtq07ny571.jpg)' }}
        onClick={handleDismiss}
      >
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="text-8xl font-semibold tracking-tighter drop-shadow-md">
            {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })}
            </div>
            <div className="text-2xl font-medium mt-4 drop-shadow-md">
            {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
        </div>
      </div>
    );
  }

  return (
    <div 
        className="fixed inset-0 z-[100] bg-cover bg-center flex items-center justify-center animate-in fade-in zoom-in-95 duration-500"
        style={{ backgroundImage: 'url(https://i.redd.it/5bwxtq07ny571.jpg)' }}
    >
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl"></div>

        <div className="relative z-10 flex flex-col items-center gap-6 w-80">
            <div className="w-32 h-32 bg-gray-200/50 rounded-full flex items-center justify-center shadow-xl border-4 border-white/20">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
            </div>
            
            <div className="text-2xl font-semibold text-white tracking-wide">Administrator</div>
            
            <button 
                onClick={handleLogin}
                className="mt-2 px-8 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-md text-white font-medium transition-all active:scale-95 shadow-lg"
            >
                Sign in
            </button>
        </div>
    </div>
  );
};

export default LoginScreen;