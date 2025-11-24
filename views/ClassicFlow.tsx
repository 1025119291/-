import React from 'react';
import { ExternalLink } from 'lucide-react';
import WindowControls from '../components/WindowControls';

interface ClassicFlowProps {
  state: 'loading' | 'interrupted';
  onAuthorize: () => void;
}

const ClassicFlow: React.FC<ClassicFlowProps> = ({ state, onAuthorize }) => {
  if (state === 'loading') {
    return (
      <div className="w-full h-full bg-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* Loading Illustration */}
        <div className="mb-8 relative">
           <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Server/Printer Box */}
                <rect x="40" y="50" width="80" height="50" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                <circle cx="60" cy="75" r="6" fill="#34D399" className="animate-pulse" />
                <circle cx="80" cy="75" r="6" fill="#60A5FA" className="animate-pulse delay-75" />
                <circle cx="100" cy="75" r="6" fill="#A78BFA" className="animate-pulse delay-150" />
                
                {/* Paper sheet */}
                <rect x="55" y="30" width="50" height="40" rx="2" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                
                {/* Paper Plane */}
                <path d="M30 20 L60 35 L30 50 L35 35 Z" fill="#3B82F6" className="animate-[bounce_2s_infinite] origin-center" />
                
                {/* Wifi Signal */}
                <path d="M20 90 Q10 90 10 100" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" className="opacity-50" />
                <path d="M15 85 Q0 85 0 100" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" className="opacity-30" />
                
                {/* Decor elements */}
                <circle cx="130" cy="100" r="10" fill="#22D3EE" className="opacity-20" />
                <path d="M120 90 L140 90 L120 110 Z" fill="#3B82F6" className="opacity-20" />
           </svg>
        </div>
        
        <div className="text-gray-600 font-medium tracking-wide animate-pulse">
           初始化加载中...
        </div>
      </div>
    );
  }

  if (state === 'interrupted') {
    return (
      <div className="w-full h-full bg-white flex flex-col relative animate-in fade-in duration-300">
         {/* Window Controls */}
         <div className="absolute top-0 right-0 p-2">
            <WindowControls />
         </div>

         <div className="flex-1 flex flex-col items-center justify-center px-16 text-center">
            {/* Interrupted Plug Illustration */}
            <div className="mb-8">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    {/* Wall Socket background */}
                    <rect x="30" y="20" width="60" height="60" rx="4" fill="#F3F4F6" />
                    {/* Socket holes */}
                    <rect x="45" y="40" width="8" height="20" rx="4" fill="#3B82F6" />
                    <rect x="67" y="40" width="8" height="20" rx="4" fill="#3B82F6" />
                    
                    {/* Disconnected Plug */}
                    <g transform="translate(0, 10)">
                        <path d="M30 70 H90 V90 C90 100 80 110 60 110 C40 110 30 100 30 90 V70 Z" fill="none" stroke="#06B6D4" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="20" y="60" width="20" height="10" fill="#4B5563" /> {/* Prong left base */}
                        <rect x="80" y="60" width="20" height="10" fill="#4B5563" /> {/* Prong right base */}
                        
                        {/* Prongs */}
                        <rect x="25" y="50" width="10" height="15" fill="#9CA3AF" />
                        <rect x="85" y="50" width="10" height="15" fill="#9CA3AF" />

                        {/* Wire frayed ends */}
                        <path d="M60 110 L65 115" stroke="#8B5CF6" strokeWidth="2" />
                        <path d="M60 110 L55 115" stroke="#8B5CF6" strokeWidth="2" />
                        <path d="M60 110 L60 118" stroke="#8B5CF6" strokeWidth="2" />
                    </g>
                </svg>
            </div>

            <p className="text-gray-700 font-medium mb-8 leading-relaxed max-w-md">
                飞连服务被拦截，客户端无法正常运行，飞连正尝试修复，<br/>需要您的授权
            </p>

            <button 
                onClick={onAuthorize}
                className="bg-[#1861ff] hover:bg-blue-600 text-white px-16 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-blue-200 transition-transform active:scale-95"
            >
                授权
            </button>
         </div>

         {/* Footer */}
         <div className="pb-12 flex flex-col items-center gap-3">
             <div className="h-px w-64 bg-gray-100 mb-2 relative">
                 <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400">
                     如不授权，可尝试重装飞连
                 </span>
             </div>
             
             <a href="#" className="text-[#1861ff] text-sm flex items-center gap-1 hover:underline">
                 <ExternalLink size={14} />
                 去下载新版飞连
             </a>
         </div>
      </div>
    );
  }

  return null;
};

export default ClassicFlow;