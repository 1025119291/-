import React, { useState, useEffect } from 'react';
import { ChevronRight, Globe, RotateCcw, Monitor, CheckCircle2, Wifi, ShieldCheck, ArrowLeft, ChevronDown } from 'lucide-react';

type LabView = 'menu' | 'localInfo' | 'netDiag';

interface LabProps {
    initialView?: LabView;
}

const Lab: React.FC<LabProps> = ({ initialView = 'menu' }) => {
  const [view, setView] = useState<LabView>(initialView);

  useEffect(() => {
      if (initialView) {
          setView(initialView);
      }
  }, [initialView]);

  // Sub-view Header
  const Header = ({ title, parent = "实验室" }: { title: string, parent?: string }) => (
      <div className="flex items-center text-sm mb-6">
          <span 
            className="text-gray-500 cursor-pointer hover:text-blue-500"
            onClick={() => setView('menu')}
          >
            {parent}
          </span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-gray-800 font-medium">{title}</span>
          <div className="flex-1"></div>
          {view === 'netDiag' && (
               <span className="text-blue-500 cursor-pointer flex items-center gap-1 text-xs hover:underline" onClick={() => setView('localInfo')}>
                   本机信息 <ChevronRight size={12} />
               </span>
          )}
      </div>
  );

  if (view === 'localInfo') {
      return (
          <div className="h-full flex flex-col">
              <Header title="本机信息获取" />
              <div className="flex-1 overflow-y-auto app-scroll pr-2">
                  {/* Device Info Section */}
                  <div className="mb-6">
                      <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                          设备信息 <CopyIcon />
                      </h3>
                      <div className="bg-gray-50 p-4 rounded flex justify-between items-center text-sm text-gray-600">
                          <span>设备版本 Windows10_v10.0 (Microsoft)</span>
                          <span>CPU 占有率 50.79%</span>
                          <span>内存占有率 61.00%</span>
                      </div>
                  </div>

                  {/* Network Info Section */}
                  <div className="mb-6">
                      <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                          网络信息 <CopyIcon />
                      </h3>
                      <div className="space-y-4">
                          <NetworkCard 
                            name="以太网 2(有线)" 
                            active 
                            ip="192.168.88.128"
                            mac="00:16:3e:2d:8d:a2" 
                            gateway="192.168.88.1"
                            dns="100.96.0.2"
                          />
                          <NetworkCard name="本地连接 2(有线)" />
                          <NetworkCard name="以太网(有线)" />
                          <NetworkCard name="以太网 3(有线)" />
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  if (view === 'netDiag') {
      return (
          <div className="h-full flex flex-col">
              <Header title="网络诊断" />
              
              <div className="flex gap-4 h-full">
                  {/* Left Status Circle */}
                  <div className="w-1/3 flex flex-col items-center justify-center border-r border-gray-100 pr-4">
                       <div className="w-48 h-48 relative flex items-center justify-center mb-8">
                           <div className="absolute inset-0 bg-green-50 rounded-full animate-pulse"></div>
                           <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                               <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                   <span className="text-2xl font-bold">⚡</span>
                               </div>
                           </div>
                           {/* Orbiting Icons Mockup */}
                           <div className="absolute top-4 right-8 text-gray-300 text-xs">VPN</div>
                       </div>
                       <div className="font-bold text-gray-800 mb-6">网络诊断结束，状态良好</div>
                       <div className="flex gap-3">
                           <button className="px-6 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50">重新诊断</button>
                           <button className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 shadow-lg shadow-blue-200">仍有问题</button>
                       </div>
                  </div>

                  {/* Right Details */}
                  <div className="flex-1 flex flex-col gap-4 pl-2">
                      <div className="grid grid-cols-3 gap-3">
                          <DiagCard title="网络连接" status="已成功连接 有线网络" icon={<Wifi className="text-green-500" />} />
                          <DiagCard title="网络代理" status="未检测到网络代理" icon={<ShieldCheck className="text-green-500" />} />
                          <DiagCard title="VPN 网络" status="VPN 服务正常" icon={<span className="text-green-500 font-bold text-xs border border-green-500 px-1 rounded">VPN</span>} />
                      </div>

                      <div className="bg-white border rounded-lg p-4 flex-1">
                          <h4 className="font-medium text-gray-700 mb-1">互联网网址检测</h4>
                          <p className="text-xs text-gray-400 mb-4">全部访问成功</p>
                          <div className="space-y-3 text-sm">
                              <WebCheckItem name="火山引擎" />
                              <WebCheckItem name="今日头条" />
                              <WebCheckItem name="百度" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className="h-full">
      <h2 className="text-lg font-medium text-gray-800 mb-6">实验室</h2>
      <div className="grid grid-cols-3 gap-6">
          <LabItem 
            title="网络诊断" 
            desc="排查日常网络问题" 
            icon={<Globe className="text-white" />} 
            color="bg-green-500"
            onClick={() => setView('netDiag')}
          />
          <LabItem 
            title="DNS重置" 
            desc="解决DNS解析问题" 
            icon={<RotateCcw className="text-white" />} 
            color="bg-indigo-500"
            onClick={() => {}}
          />
           <LabItem 
            title="本机信息" 
            desc="获取计算机网络等信息" 
            icon={<Monitor className="text-white" />} 
            color="bg-orange-500"
            onClick={() => setView('localInfo')}
          />
           <LabItem 
            title="神秘功能" 
            desc="开发中，敬请期待" 
            icon={<div className="w-4 h-1 bg-gray-400 rounded"></div>} 
            color="bg-gray-200"
            textColor="text-gray-400"
            onClick={() => {}}
          />
      </div>
    </div>
  );
};

const LabItem = ({ title, desc, icon, color, textColor = 'text-gray-800', onClick }: any) => (
    <div onClick={onClick} className="bg-white p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow group">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
            {icon}
        </div>
        <div>
            <div className={`font-medium ${textColor}`}>{title}</div>
            <div className="text-xs text-gray-400 mt-1">{desc}</div>
        </div>
    </div>
);

const NetworkCard = ({ name, active, ip, mac, gateway, dns }: any) => (
    <div className="border-b border-gray-100 pb-4 last:border-0">
        <div className="flex justify-between items-center mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded -mx-2">
            <div className="flex items-center gap-2 font-medium text-gray-700">
                <Wifi size={16} className="text-gray-500" />
                {name}
                <CopyIcon />
            </div>
            <div className={`text-xs flex items-center gap-1 ${active ? 'text-green-500' : 'text-gray-400'}`}>
                {active ? '使用中' : '未启用'} <ChevronDown size={14} className={active ? 'rotate-180' : ''} />
            </div>
        </div>
        {active && (
            <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 px-6">
                <div>IPv4 地址 <span className="text-gray-800 ml-2">{ip}</span></div>
                <div>IPv6 地址 <span className="text-gray-800 ml-2">fe80::4c4e:9a6f:1058:3301</span></div>
                <div className="col-span-2">MAC 地址 <span className="text-gray-800 ml-2">{mac}</span></div>
                <div>网络强度 -</div>
                <div>网关地址 <span className="text-gray-800 ml-2">{gateway}</span></div>
                <div>首选 DNS <span className="text-gray-800 ml-2">{dns}</span></div>
                <div className="flex items-center gap-2">DHCP <span className="flex items-center text-green-600 gap-1"><CheckCircle2 size={10} fill="currentColor" className="text-white" /> 已启用</span></div>
            </div>
        )}
    </div>
);

const DiagCard = ({ title, status, icon }: any) => (
    <div className="border rounded-lg p-3 flex flex-col justify-between h-24">
        <div className="flex justify-between items-start">
            <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center">
                {icon}
            </div>
        </div>
        <div>
            <div className="font-bold text-xs text-gray-800">{title}</div>
            <div className="text-[10px] text-gray-500 mt-1">{status}</div>
        </div>
    </div>
);

const WebCheckItem = ({ name }: { name: string }) => (
    <div className="flex justify-between items-center py-1">
        <div className="flex items-center gap-2">
             {/* Favicon mock */}
            <div className="w-4 h-4 bg-blue-100 rounded-sm"></div>
            <span>{name}</span>
            <span className="text-[10px] text-gray-400 cursor-pointer">▼</span>
        </div>
        <div className="flex items-center gap-1 text-green-600 text-xs">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 成功
        </div>
    </div>
)

const CopyIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 cursor-pointer hover:text-blue-500"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
)

export default Lab;