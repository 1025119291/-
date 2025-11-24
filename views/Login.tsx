import React, { useState } from 'react';
import WindowControls from '../components/WindowControls';
import { Eye, EyeOff, QrCode, ChevronDown, Monitor, Globe, Smartphone } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<0 | 1>(0); // 0: Activation, 1: Login
  const [corpId, setCorpId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'sms'>('password');

  const handleNext = () => {
    if (step === 0 && corpId) {
      setStep(1);
    } else if (step === 1) {
      onLogin();
    }
  };

  return (
    <div className="w-[900px] h-[600px] bg-white shadow-2xl rounded-lg flex flex-col relative overflow-hidden font-sans select-none text-gray-800 border border-gray-200">
       
       {/* Window Controls - Top Right (Absolute) */}
       {/* We add a full width titlebar area for dragging */}
       <div className="absolute top-0 left-0 w-full h-10 z-10 titlebar"></div>

       <div className="absolute top-0 right-0 z-20 p-2 flex items-center">
          <WindowControls />
       </div>

       {/* Login Header (Only visible in Login step) */}
       {step === 1 && (
           <div className="absolute top-4 right-16 flex text-xs text-gray-500 gap-4 z-10 no-drag">
               <span className="cursor-pointer hover:text-[#3470ff]">切换企业登录</span>
               <span className="w-px h-3 bg-gray-300 mt-0.5"></span>
               <span className="cursor-pointer hover:text-[#3470ff]">切换单位登录</span>
               <span className="w-px h-3 bg-gray-300 mt-0.5"></span>
               <span className="flex items-center gap-1 cursor-pointer hover:text-[#3470ff]">
                   简体中文 <ChevronDown size={10} />
               </span>
           </div>
       )}

       {/* Main Content */}
       <div className="flex-1 flex flex-col items-center justify-center w-full no-drag">
          
          {/* Logo - Common for both */}
          <div className="flex flex-col items-center mb-8">
               {/* Logo Icon */}
               <div className="mb-3">
                   <svg width="56" height="56" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M149.6 514.5l142.4-72.1 121.8-378.9c11.8-36.8 63.7-38.3 77.7-2.3l383 984.6c6.8 17.5-9.3 34.8-25.6 27.5L576.7 908l-427.1-393.5z" fill="#3470FF" />
                        <path d="M576.7 908L292 644.5l557-479-272.3 742.5z" fill="#1E5EFF" />
                   </svg>
               </div>
               <h1 className="text-3xl font-bold text-gray-900 tracking-wider">飞连</h1>
          </div>

          {step === 0 ? (
              // === ACTIVATION VIEW ===
              <div className="w-full max-w-[420px] flex flex-col gap-6 animate-[fade-in_0.3s_ease-out]">
                  <div className="relative">
                      <input 
                          type="text" 
                          placeholder="请输入企业识别码"
                          className="w-full h-12 px-4 bg-white border border-blue-500 rounded hover:border-blue-600 focus:border-blue-600 outline-none transition-all text-center text-base tracking-wide placeholder-gray-400"
                          value={corpId}
                          onChange={(e) => setCorpId(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                          autoFocus
                      />
                  </div>

                  <button 
                      onClick={handleNext}
                      disabled={!corpId}
                      className="w-full h-12 bg-[#3470ff] hover:bg-blue-600 text-white rounded text-base font-medium transition-all shadow-md shadow-blue-100 active:scale-[0.99]"
                  >
                      验证激活
                  </button>

                  <div className="text-center mt-8">
                      <p className="text-xs text-gray-300 leading-relaxed px-8">
                         当前客户端未激活，请打开网页版完成激活操作或联系企业管<br/>理员获取企业识别码完成激活
                      </p>
                  </div>
              </div>
          ) : (
              // === LOGIN VIEW ===
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] w-[400px] p-8 pt-6 relative animate-[fade-in_0.3s_ease-out]">
                  {/* QR Code Corner */}
                  <div className="absolute top-4 right-4 p-2 cursor-pointer text-gray-400 hover:text-[#3470ff] transition-colors">
                      <QrCode size={24} />
                  </div>

                  {/* Tabs */}
                  <div className="flex mb-8 border-b border-gray-100">
                      <div 
                        className={`pb-3 mr-6 text-base font-medium cursor-pointer transition-all border-b-2 ${loginMethod === 'password' ? 'text-gray-800 border-[#3470ff]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                        onClick={() => setLoginMethod('password')}
                      >
                          账号密码
                      </div>
                      <div 
                         className={`pb-3 text-base font-medium cursor-pointer transition-all border-b-2 ${loginMethod === 'sms' ? 'text-gray-800 border-[#3470ff]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                         onClick={() => setLoginMethod('sms')}
                      >
                          短信验证
                      </div>
                  </div>

                  {loginMethod === 'password' && (
                      <div className="space-y-5">
                            {/* Employee ID Input */}
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 z-10">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="请输入员工 ID"
                                        className="w-full h-11 pl-10 pr-8 bg-white border border-gray-200 rounded hover:border-blue-400 focus:border-blue-500 outline-none transition-all text-sm text-gray-600"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer" />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="relative group">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="请输入密码"
                                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded hover:border-blue-400 focus:border-blue-500 outline-none transition-all text-sm pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                />
                                <button 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        
                            <button 
                                onClick={handleNext}
                                className="w-full h-11 bg-[#3470ff] hover:bg-blue-600 text-white rounded text-sm font-medium transition-all shadow-lg shadow-blue-100 mt-2"
                            >
                                登录
                            </button>

                            <div className="flex flex-col gap-2 text-xs text-gray-500 pt-1">
                                <label className="flex items-start gap-2 cursor-pointer hover:text-gray-700">
                                    <input type="checkbox" className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span>我已阅读并同意企业 <span className="text-[#3470ff]">用户协议</span> 和 <span className="text-[#3470ff]">隐私政策</span></span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    记住我的登录账号
                                </label>
                            </div>
                      </div>
                  )}

                  {loginMethod === 'sms' && (
                      <div className="space-y-5 py-4">
                          <div className="text-center text-gray-400 text-sm py-8">
                              请联系管理员配置短信登录
                          </div>
                          <button 
                                onClick={handleNext}
                                className="w-full h-11 bg-[#3470ff] hover:bg-blue-600 text-white rounded text-sm font-medium transition-all shadow-lg shadow-blue-100"
                            >
                                登录
                          </button>
                      </div>
                  )}

                  {/* More Login Methods */}
                  <div className="mt-8 relative">
                      <div className="flex items-center justify-center gap-4 mb-4 relative">
                           <div className="h-px bg-gray-100 absolute w-full top-1/2 z-0"></div>
                           <span className="text-xs text-gray-400 bg-white px-2 z-10 relative">更多登录方式</span>
                      </div>
                      <div className="flex justify-center gap-8">
                          <button className="p-1.5 bg-white border border-gray-100 rounded-full hover:border-blue-200 transition-colors text-[#0075ff]" title="飞书">
                              <Globe size={20} />
                          </button>
                          <button className="p-1.5 bg-white border border-gray-100 rounded-full hover:border-blue-200 transition-colors text-[#0089ff]" title="钉钉">
                              <Monitor size={20} />
                          </button>
                          <button className="p-1.5 bg-white border border-gray-100 rounded-full hover:border-blue-200 transition-colors text-[#21ac38]" title="企业微信">
                              <Smartphone size={20} />
                          </button>
                      </div>
                  </div>
              </div>
          )}
       </div>

    </div>
  );
};

export default Login;