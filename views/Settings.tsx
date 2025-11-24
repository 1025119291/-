import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import Modal from '../components/Modal';

interface SettingsProps {
  onLogout?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCheckUpdate = () => {
      setShowUpdate(true);
  };

  return (
    <div className="h-full flex flex-col relative">
      <h2 className="text-lg font-medium text-gray-800 mb-6">设置</h2>

      <div className="flex-1 overflow-y-auto app-scroll pr-4 space-y-8">
          {/* General Settings */}
          <section>
              <h3 className="font-bold text-gray-700 mb-4 text-sm">通用设置</h3>
              <div className="space-y-4 pl-2">
                  <div className="flex items-center">
                      <label className="w-24 text-sm text-gray-500">启动时</label>
                      <div className="flex gap-6">
                          <Checkbox label="启动自动连接 VPN" />
                          <Checkbox label="默认进入网络页" />
                      </div>
                  </div>
                   <div className="flex items-center">
                      <label className="w-24 text-sm text-gray-500">语言环境</label>
                      <Select value="中文" />
                  </div>
                   <div className="flex items-center">
                      <label className="w-24 text-sm text-gray-500 flex items-center gap-1">
                          传输协议 <Info size={12} className="text-gray-400" />
                      </label>
                      <Select value="自适应(推荐)" />
                  </div>
              </div>
          </section>

           <div className="border-t border-gray-100"></div>

          {/* Shortcuts */}
           <section>
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-700 text-sm">快捷键设置</h3>
                  <button className="text-xs text-gray-400 px-3 py-1 border rounded-full hover:bg-gray-50">恢复默认</button>
              </div>
              <div className="space-y-4 pl-2">
                  <div className="flex items-center">
                      <label className="w-24 text-sm text-gray-500">VPN 开/关</label>
                      <div className="flex items-center gap-4">
                           <div className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-600 w-32 flex justify-between items-center">
                               Ctrl+O <span className="text-gray-300 cursor-pointer">×</span>
                           </div>
                           <Checkbox label="启用全局快捷键" />
                      </div>
                  </div>
                  <div className="flex items-center">
                      <label className="w-24 text-sm text-gray-500">显示/隐藏飞连</label>
                      <div className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-400 w-32 flex justify-between items-center cursor-not-allowed">
                           点击设置快捷键 <span className="text-gray-300">×</span>
                      </div>
                  </div>
              </div>
          </section>

           <div className="border-t border-gray-100"></div>

           {/* Updates */}
           <section>
              <h3 className="font-bold text-gray-700 mb-4 text-sm">软件更新</h3>
               <div className="space-y-4 pl-2">
                  <div className="flex items-center">
                      <label className="w-24 text-sm text-gray-500">飞连版本</label>
                      <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-800">3.1.18</span>
                          <Checkbox label="自动检查更新" checked />
                      </div>
                  </div>
                   <div className="flex items-center">
                      <label className="w-24 text-sm text-gray-500">配置更新</label>
                      <span 
                        className="text-sm text-blue-500 cursor-pointer hover:underline"
                        onClick={handleCheckUpdate}
                      >
                          获取飞连最新配置
                      </span>
                  </div>
               </div>
           </section>

            <div className="border-t border-gray-100"></div>

            {/* About */}
            <section>
                 <div className="flex items-center justify-between">
                     <div className="flex items-center text-sm text-gray-500 gap-2">
                         <h3 className="font-bold text-gray-700 text-sm">关于飞连</h3>
                         <Info size={14} className="cursor-pointer hover:text-blue-500" onClick={() => setShowAbout(true)} />
                         <span className="ml-4">企业识别码: ts-sup</span>
                         <QrIcon />
                     </div>
                     <button 
                        onClick={onLogout}
                        className="px-4 py-1 border border-gray-200 rounded-full text-xs text-gray-500 hover:bg-gray-50 transition-colors"
                     >
                        退出账号
                     </button>
                 </div>
                 <div className="mt-4 pl-2 text-xs text-gray-400 space-x-4">
                     <span className="text-gray-500 font-medium mr-4">协议</span>
                     <span className="underline cursor-pointer hover:text-blue-500">用户协议</span>
                     <span className="underline cursor-pointer hover:text-blue-500">隐私政策</span>
                     <span className="underline cursor-pointer hover:text-blue-500">飞连 用户协议</span>
                     <span className="underline cursor-pointer hover:text-blue-500">飞连 隐私政策</span>
                     <div className="mt-2 underline cursor-pointer hover:text-blue-500">开源组件声明</div>
                 </div>
            </section>
      </div>

      {/* Modals */}
      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)} title="相关信息">
          <div className="text-sm text-gray-600 space-y-2">
              <div className="flex"><span className="w-24 text-gray-400">用户名:</span> ZhangShuai</div>
              <div className="flex"><span className="w-24 text-gray-400">客户端版本:</span> 3.1.18</div>
              <div className="flex"><span className="w-24 text-gray-400">Build Number:</span> 1583</div>
              <div className="flex"><span className="w-24 text-gray-400">企业识别码:</span> ts-sup</div>
              <div className="flex"><span className="w-24 text-gray-400">操作系统版本:</span> Windows10_v10.0</div>
              <div className="flex"><span className="w-24 text-gray-400">设备 ID:</span> 66e434d89a4a51b7110a9b3aeb5a3087</div>
              <div className="flex"><span className="w-24 text-gray-400">MAC 地址:</span> 00:16:3e:2d:8d:a2</div>
          </div>
          <div className="mt-8 flex justify-between gap-4">
              <button onClick={() => setShowAbout(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-full text-sm">取消</button>
              <button className="flex-1 bg-[#3470ff] hover:bg-blue-600 text-white py-2 rounded-full text-sm shadow-lg shadow-blue-200">一键复制</button>
          </div>
      </Modal>

      <Modal isOpen={showUpdate} onClose={() => setShowUpdate(false)} title="飞连配置已更新" width="w-[400px]">
          <div className="text-center py-4">
              <p className="text-sm text-gray-600 mb-8">最新配置预计将在 1 分钟后生效</p>
              <button onClick={() => setShowUpdate(false)} className="bg-[#3470ff] hover:bg-blue-600 text-white py-2 px-12 rounded-full text-sm shadow-lg shadow-blue-200">知道了</button>
          </div>
      </Modal>

    </div>
  );
};

const Checkbox = ({ label, checked }: { label: string, checked?: boolean }) => (
    <div className="flex items-center gap-2 cursor-pointer">
        <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center ${checked ? 'bg-blue-500 border-blue-500' : 'border-gray-300 bg-white'}`}>
            {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
        </div>
        <span className="text-sm text-gray-600">{label}</span>
    </div>
)

const Select = ({ value }: { value: string }) => (
    <div className="bg-gray-100 px-3 py-1.5 rounded text-sm text-gray-700 min-w-[120px] flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors">
        {value} <ChevronDown size={14} className="text-gray-500" />
    </div>
)

const QrIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
)

export default Settings;