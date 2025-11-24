import React, { useState } from 'react';
import { Search, Download, ChevronDown } from 'lucide-react';

const Software: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
         <div className="flex items-center gap-1 font-bold text-gray-800 cursor-pointer">
             全部 <ChevronDown size={14} />
         </div>
         <div className="relative">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input 
                type="text" 
                placeholder="搜索软件"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 bg-gray-100 rounded-full pl-9 pr-4 py-1.5 text-xs outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
             />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto app-scroll pr-2">
          {/* Category: Office */}
          <div className="mb-8">
              <h3 className="font-bold text-gray-700 mb-4 text-sm">办公软件</h3>
              <div className="grid grid-cols-3 gap-4">
                   <SoftwareItem name="QQ" desc="测试QQ" iconColor="bg-blue-500" />
              </div>
          </div>

           {/* Category: Other */}
          <div className="mb-8">
              <h3 className="font-bold text-gray-700 mb-4 text-sm">其他</h3>
              <div className="grid grid-cols-3 gap-4">
                   <SoftwareItem name="Filezilla" desc="SFTP" iconColor="bg-blue-600" />
                   <SoftwareItem name="打印客户端" desc="打印客户端" iconColor="bg-blue-500" />
                   <SoftwareItem name="tets" desc="111" iconColor="bg-blue-500" version="1.1.1" />
                   <SoftwareItem name="中望CAD" desc="中望CAD" iconColor="bg-blue-700" />
                   <SoftwareItem name="P6 Primavera" desc="P6 Primavera" iconColor="bg-blue-500" />
                   <SoftwareItem name="大包测试" desc="大包测试" iconColor="bg-blue-500" />
                   <SoftwareItem name="夸克浏览器" desc="测试" iconColor="bg-blue-500" />
              </div>
          </div>
      </div>
    </div>
  );
};

const SoftwareItem = ({ name, desc, iconColor, version }: any) => (
    <div className="bg-white border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow relative group">
        {version && <span className="absolute -top-2 left-2 text-[10px] text-gray-400 bg-white px-1">{version}</span>}
        <div className={`w-10 h-10 rounded-full ${iconColor} flex items-center justify-center text-white`}>
            {/* Simple user icon as placeholder for app logo */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div className="flex-1">
            <div className="font-bold text-sm text-gray-800">{name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
        </div>
        <button className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium hover:bg-blue-100">
            下载
        </button>
    </div>
)

export default Software;