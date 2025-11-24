import React from 'react';

const Help: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-medium text-gray-800 mb-6">帮助中心</h2>
      
      {/* Tab headers */}
      <div className="flex border-b mb-6">
          <div className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium text-sm cursor-pointer">常用问题</div>
          <div className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm cursor-pointer">账号相关</div>
          <div className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm cursor-pointer">客户端相关</div>
          <div className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm cursor-pointer">网络相关</div>
      </div>

      <div className="grid grid-cols-2 gap-10">
          <div>
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <h3 className="font-bold text-sm text-gray-800">账号问题</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-3 pl-8">
                  <li className="cursor-pointer hover:text-blue-500 hover:underline">1111</li>
              </ul>
          </div>

           <div>
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center font-bold text-[10px]">
                      VPN
                  </div>
                  <h3 className="font-bold text-sm text-gray-800">VPN连接通用问题</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-3 pl-8">
                  <li className="cursor-pointer hover:text-blue-500 hover:underline">VPN 极速模式和全局模式是什么？</li>
              </ul>
          </div>
      </div>

      <div className="mt-auto text-right text-xs">
          <span className="text-blue-500 cursor-pointer hover:underline">其他问题？意见反馈</span>
      </div>
    </div>
  );
};

export default Help;