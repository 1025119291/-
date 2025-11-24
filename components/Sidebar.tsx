import React from 'react';
import { Home, Globe, Shield, FlaskConical, LayoutGrid, MessageSquare, Settings } from 'lucide-react';
import { TabId } from '../types';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: '概览', icon: Home },
    { id: 'network', label: '网络', icon: Globe },
    { id: 'security', label: '安全', icon: Shield },
    { id: 'lab', label: '实验室', icon: FlaskConical },
    { id: 'software', label: '软件库', icon: LayoutGrid },
    { id: 'help', label: '帮助', icon: MessageSquare }, // Using MessageSquare as closest to the smiley chat icon
    { id: 'settings', label: '设置', icon: Settings },
  ];

  return (
    <div className="w-[80px] bg-[#3470ff] flex flex-col items-center py-4 text-white shrink-0">
      {/* Logo area placeholder - usually top */}
      <div className="mb-6 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L2 22"/><path d="M12 2L2 22"/><path d="M22 2L12 22"/></svg>
      </div>

      <div className="flex flex-col w-full gap-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex flex-col items-center justify-center py-3 cursor-pointer transition-colors relative
                ${isActive ? 'bg-[#2559cc]' : 'hover:bg-[#467eff]'}
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white" />
              )}
              <item.icon size={22} className={isActive ? 'text-white' : 'text-blue-100'} />
              <span className={`text-xs mt-1.5 ${isActive ? 'font-medium' : 'font-normal text-blue-100'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;