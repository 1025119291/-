import React, { useState, useEffect } from 'react';
import { Wifi, Monitor, MessageSquare, Globe, Laptop, ChevronRight, History } from 'lucide-react';
import { TabId } from '../types';

interface OverviewProps {
  onNavigate: (tab: TabId, subView?: string) => void;
  onStartClassicFlow: () => void;
}

const Overview: React.FC<OverviewProps> = ({ onNavigate, onStartClassicFlow }) => {
  const [vpnConnected, setVpnConnected] = useState(false);
  const [vpnTime, setVpnTime] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    if (vpnConnected) {
      interval = window.setInterval(() => {
        setVpnTime(prev => prev + 1);
      }, 1000);
    } else {
      setVpnTime(0);
    }
    return () => clearInterval(interval);
  }, [vpnConnected]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="h-full flex gap-4 p-1">
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-4">
        
        {/* Profile & VPN Card */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    ZS
                </div>
                <div>
                    <div className="font-bold text-gray-800">ZhangShuai</div>
                    <div className="text-xs text-gray-400">1025119291@qq.com</div>
                </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">VPN 网络</div>
                    <div className="text-xl font-mono font-medium text-gray-900">
                        {formatTime(vpnTime)}
                    </div>
                    <div className="text-xs text-gray-400">在线时长</div>
                </div>
                 <div className="flex items-center gap-2">
                     {/* Toggle Switch */}
                    <div 
                        className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${vpnConnected ? 'bg-green-500' : 'bg-gray-300'}`}
                        onClick={() => setVpnConnected(!vpnConnected)}
                    >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow transition-all ${vpnConnected ? 'left-6' : 'left-1'}`}></div>
                    </div>
                    <span className={`text-sm ${vpnConnected ? 'text-green-500' : 'text-gray-400'}`}>
                        {vpnConnected ? '开' : '关'}
                    </span>
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                 <div className="flex-1 bg-gray-50 rounded p-2 flex flex-col items-center">
                    <span className="bg-blue-600 text-white text-[10px] px-1 rounded mb-1">极速</span>
                    <span className="text-xs text-gray-500">当前模式</span>
                 </div>
                 <div className="flex-1 bg-gray-50 rounded p-2 flex flex-col items-center">
                    <span className="bg-blue-500 text-white text-[10px] px-1 rounded mb-1">AUTO</span>
                    <span className="text-xs text-gray-500">当前服务器</span>
                 </div>
            </div>
        </div>

        {/* Toolbox */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex-1">
            <h3 className="text-sm font-bold text-gray-700 mb-4">工具箱</h3>
            <div className="grid grid-cols-4 gap-y-6 gap-x-2 text-center">
                 <ToolItem 
                    icon={<Globe className="text-green-500" />} 
                    label="网络诊断" 
                    onClick={() => onNavigate('lab', 'netDiag')}
                 />
                 <ToolItem icon={<Monitor className="text-blue-500" />} label="设备登记" />
                 <ToolItem icon={<MessageSquare className="text-indigo-500" />} label="意见反馈" />
                 <ToolItem 
                    icon={<Laptop className="text-blue-400" />} 
                    label="有线网络" 
                    onClick={() => onNavigate('network', 'wired')}
                 />
                 <ToolItem 
                    icon={<Wifi className="text-blue-500" />} 
                    label="员工 Wi-Fi" 
                    onClick={() => onNavigate('network', 'wifi')}
                 />
                 <ToolItem icon={<Wifi className="text-orange-400" />} label="访客 Wi-Fi" />
                 <ToolItem 
                    icon={<History className="text-purple-500" />} 
                    label="复刻经典" 
                    onClick={onStartClassicFlow}
                 />
            </div>
        </div>

      </div>

      {/* Right Column */}
      <div className="w-[320px] bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-700">推荐应用</h3>
            <div className="flex items-center text-blue-500 text-xs cursor-pointer hover:underline" onClick={() => onNavigate('software')}>
                更多应用与设置 <ChevronRight size={12} />
            </div>
        </div>

        {/* Grid for Apps: 2 Columns */}
        <div className="grid grid-cols-2 gap-3">
            <AppCard name="jumpserver" iconColor="bg-teal-500" />
            <AppCard name="百度" iconColor="bg-blue-600" />
            {/* Placeholder to show the grid structure if more apps were added */}
            {/* <AppCard name="测试应用" iconColor="bg-purple-500" /> */}
        </div>
      </div>
    </div>
  );
};

const ToolItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
    <div 
        className="flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        onClick={onClick}
    >
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
            {icon}
        </div>
        <span className="text-xs text-gray-600">{label}</span>
    </div>
);

const AppCard = ({ name, iconColor }: { name: string, iconColor: string }) => (
    <div className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-gray-50/50">
        <div className={`w-10 h-10 ${iconColor} rounded-full flex items-center justify-center text-white text-xs shadow-sm`}>
            App
        </div>
        <span className="text-xs text-gray-700 font-medium truncate w-full text-center">{name}</span>
    </div>
);

export default Overview;