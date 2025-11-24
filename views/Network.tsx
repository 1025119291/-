import React, { useState, useEffect } from 'react';
import { Power, ChevronDown, AlertCircle } from 'lucide-react';

type NetworkTab = 'vpn' | 'wifi' | 'wired';

interface NetworkProps {
    activeSubTab?: NetworkTab;
    onTabChange?: (tab: NetworkTab) => void;
}

const Network: React.FC<NetworkProps> = ({ activeSubTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<NetworkTab>('vpn');
  const [isConnected, setIsConnected] = useState(false);
  const [isHoveringConnect, setIsHoveringConnect] = useState(false);

  useEffect(() => {
      if (activeSubTab) {
          setActiveTab(activeSubTab);
      }
  }, [activeSubTab]);

  const handleTabClick = (tab: NetworkTab) => {
      setActiveTab(tab);
      if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="h-full flex flex-col">
        {/* Top Tabs */}
        <div className="flex justify-center mb-4 flex-shrink-0">
            <div className="bg-gray-100 rounded-full p-1 flex">
                <TabButton active={activeTab === 'vpn'} onClick={() => handleTabClick('vpn')}>VPN</TabButton>
                <TabButton active={activeTab === 'wifi'} onClick={() => handleTabClick('wifi')}>Wi-Fi</TabButton>
                <TabButton active={activeTab === 'wired'} onClick={() => handleTabClick('wired')}>有线网络</TabButton>
            </div>
        </div>

        {/* Wired Alert Banner - Moved here below tabs */}
        {activeTab === 'wired' && (
            <div className="w-full px-10 mb-4">
                <div className="w-full bg-blue-50 border border-blue-100 text-blue-600 text-xs p-2 rounded flex items-center gap-2">
                    <AlertCircle size={14} />
                    若弹出系统弹窗，请取消或关闭弹窗，不影响公司专有网口使用
                </div>
            </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-y-auto app-scroll">
            
            {activeTab === 'vpn' && (
                <>
                    {/* Connect Circle Button */}
                    <div 
                        className="relative mb-8 group cursor-pointer"
                        onClick={() => setIsConnected(!isConnected)}
                        onMouseEnter={() => setIsHoveringConnect(true)}
                        onMouseLeave={() => setIsHoveringConnect(false)}
                    >
                        {/* Outer Rings */}
                        <div className={`absolute inset-0 rounded-full border-[4px] border-gray-100 ${isConnected ? 'border-green-100 animate-pulse' : ''} scale-125`}></div>
                        <div className={`absolute inset-0 rounded-full border-[4px] border-gray-50 ${isConnected ? 'border-green-50' : ''} scale-150`}></div>

                        {/* Main Circle */}
                        <div className={`
                            w-32 h-32 rounded-full flex flex-col items-center justify-center text-white shadow-lg transition-all duration-300
                            ${isConnected ? 'bg-green-500' : 'bg-gray-400 hover:bg-blue-500'}
                        `}>
                            <Power size={32} className="mb-1" />
                            <span className="text-sm font-medium">{isConnected ? '已连接' : '点击连接'}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4 mb-6">
                         <button className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium flex items-center gap-1 hover:bg-blue-100">
                             <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">⚡</div>
                             极速模式
                         </button>
                         <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-500 text-sm hover:bg-gray-200 flex items-center gap-1">
                             <GlobeIcon />
                             全局模式
                         </button>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm gap-1 cursor-pointer hover:text-blue-600">
                        当前服务器 <span className="bg-blue-500 text-white text-[10px] px-1 rounded mx-1">AUTO</span> 自动 <ChevronDown size={14} />
                    </div>

                    <div className="absolute bottom-6 text-xs text-gray-300 flex gap-4">
                         <span>IP: 192.168.88.128</span>
                         <span>DNS: 100.96.0.2</span>
                         <span>传输协议: -</span>
                    </div>
                </>
            )}

            {activeTab === 'wifi' && (
                 <div className="flex flex-col items-center">
                     <div className="w-20 h-20 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                     </div>
                     <div className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                         Wi-Fi 名称 <span className="font-bold text-gray-800">222222</span> <ChevronDown size={14} />
                     </div>
                     <div className="text-gray-500 text-sm mb-8 flex items-center gap-2">
                         <span className="text-gray-400">账号</span> 
                         <span className="font-bold text-gray-800">1025119291@qq.com</span>
                         <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                     </div>
                     
                     <button className="bg-[#3470ff] text-white px-16 py-2.5 rounded-full hover:bg-blue-600 shadow-lg shadow-blue-200 transition-all">
                         一键连接
                     </button>

                     <div className="mt-12 text-xs text-orange-400 flex items-center gap-1">
                         <div className="w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-[8px]">!</div>
                         温馨提示：使用员工 Wi-Fi，请点击“一键连接”快速入网
                     </div>
                 </div>
            )}

            {activeTab === 'wired' && (
                <div className="flex flex-col items-center w-full px-10 pt-4">
                    
                    <div className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                         <span className="text-gray-400">账号</span> 
                         <span className="font-bold text-gray-800">1025119291@qq.com</span>
                         <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </div>

                    <button className="bg-[#3470ff] text-white px-16 py-2.5 rounded-full hover:bg-blue-600 shadow-lg shadow-blue-200 transition-all">
                         一键认证
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

const TabButton = ({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`px-8 py-1.5 rounded-full text-sm font-medium transition-all ${active ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
    >
        {children}
    </button>
);

const GlobeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
)

export default Network;