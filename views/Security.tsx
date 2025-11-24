import React from 'react';
import { ShieldCheck, HardDrive, ChevronDown } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-800">安全概览</h2>
            <div className="flex text-xs text-gray-500 gap-4">
                <span className="flex items-center gap-1 cursor-pointer hover:text-blue-500"><ShieldCheck size={12} /> 信任区 0</span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-blue-500"><HardDrive size={12} /> 隔离区 0</span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-blue-500">更多 <ChevronDown size={12} /></span>
            </div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-10">
            {/* Left Laptop Graphic */}
            <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">火山-远程机</h3>
                <p className="text-xs text-gray-400 mb-8">设备型号: OpenStack Nova</p>
                
                <div className="relative mb-6">
                    {/* Laptop Mockup */}
                    <div className="w-64 h-40 bg-gray-800 rounded-t-xl border-4 border-gray-300 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <ShieldCheck size={32} className="text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="w-72 h-3 bg-gray-300 rounded-b-lg shadow-xl"></div>
                </div>

                <div className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                    <ShieldCheck size={12} fill="currentColor" className="text-green-600" />
                    安全 <span className="text-gray-300 mx-1">|</span> 累计保护 46 天
                </div>
            </div>

            {/* Right Action Items */}
            <div className="w-[340px] flex flex-col gap-4">
                <SecurityCard 
                    icon={<div className="w-8 h-8 bg-purple-500 rounded text-white flex items-center justify-center text-xs">APP</div>} 
                    title="应用软件" 
                    status="暂无风险"
                />
                 <SecurityCard 
                    icon={<div className="w-8 h-8 bg-red-400 rounded text-white flex items-center justify-center text-xs">Virus</div>} 
                    title="病毒木马" 
                    status="暂无风险"
                    actions={["快速查杀", "指定路径"]}
                />

                <div className="flex gap-4 mt-8">
                    <button className="flex-1 bg-gray-50 text-gray-600 py-2.5 rounded-full text-sm hover:bg-gray-100 font-medium">检测详情</button>
                    <button className="flex-1 bg-[#3470ff] text-white py-2.5 rounded-full text-sm hover:bg-blue-600 shadow-lg shadow-blue-200 font-medium">一键检测</button>
                </div>
            </div>
        </div>
    </div>
  );
};

const SecurityCard = ({ icon, title, status, actions }: any) => (
    <div className="border rounded-lg p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
        {icon}
        <div className="flex-1">
            <div className="font-medium text-gray-700 text-sm">{title}</div>
        </div>
        <div className="text-right">
             <div className="text-xs text-gray-400 mb-1">{status}</div>
             {actions && (
                 <div className="text-xs text-blue-500 space-x-2">
                     {actions.map((a: string) => <span key={a} className="cursor-pointer hover:underline">{a}</span>)}
                 </div>
             )}
        </div>
    </div>
)

export default Security;