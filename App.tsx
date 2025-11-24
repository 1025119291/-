import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WindowControls from './components/WindowControls';
import { TabId } from './types';

// Views
import Login from './views/Login';
import Overview from './views/Overview';
import Network from './views/Network';
import Security from './views/Security';
import Lab from './views/Lab';
import Software from './views/Software';
import Help from './views/Help';
import Settings from './views/Settings';
import ClassicFlow from './views/ClassicFlow';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  
  // State for deep linking/sub-navigation
  const [networkTab, setNetworkTab] = useState<'vpn' | 'wifi' | 'wired'>('vpn');
  const [labView, setLabView] = useState<'menu' | 'localInfo' | 'netDiag'>('menu');

  // Classic Flow State (Copy Classic Feature)
  const [classicFlowState, setClassicFlowState] = useState<'idle' | 'loading' | 'interrupted'>('idle');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('overview');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('overview');
    setNetworkTab('vpn');
    setLabView('menu');
  };

  const handleNavigate = (tab: TabId, subView?: string) => {
    setActiveTab(tab);
    if (tab === 'network' && subView) {
        setNetworkTab(subView as any);
    }
    if (tab === 'lab' && subView) {
        setLabView(subView as any);
    }
  };

  const startClassicFlow = () => {
    setClassicFlowState('loading');
  };

  useEffect(() => {
    let timer: number;
    if (classicFlowState === 'loading') {
      timer = window.setTimeout(() => {
        setClassicFlowState('interrupted');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [classicFlowState]);

  const finishClassicFlow = () => {
    setClassicFlowState('idle');
    setActiveTab('overview'); // Ensure we return to overview
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // If Classic Flow is active (not idle), it takes over the entire window
  if (classicFlowState !== 'idle') {
    return (
      <div className="w-[900px] h-[600px] bg-white shadow-2xl rounded-lg overflow-hidden font-sans select-none border border-gray-200">
        <ClassicFlow state={classicFlowState} onAuthorize={finishClassicFlow} />
      </div>
    );
  }

  return (
    <div className="w-[900px] h-[600px] bg-white shadow-2xl rounded-lg flex overflow-hidden text-gray-800 font-sans select-none border border-gray-200">
      {/* Sidebar - Sidebar itself handles clicks, but we can make non-button areas drag if needed. Usually left sidebar is drag-safe area. */}
      <div className="titlebar h-full flex shrink-0">
          <div className="no-drag h-full flex">
             <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white relative">
        
        {/* Title Bar / Header Area - Draggable */}
        <div className="h-10 flex items-center justify-end px-2 shrink-0 bg-white z-10 titlebar">
            <WindowControls />
        </div>

        {/* Content - Non-Draggable */}
        <div className="flex-1 overflow-hidden p-6 pt-0 no-drag">
            {activeTab === 'overview' && (
                <Overview 
                  onNavigate={handleNavigate} 
                  onStartClassicFlow={startClassicFlow}
                />
            )}
            {activeTab === 'network' && (
                <Network activeSubTab={networkTab} onTabChange={setNetworkTab} />
            )}
            {activeTab === 'security' && <Security />}
            {activeTab === 'lab' && (
                <Lab initialView={labView} />
            )}
            {activeTab === 'software' && <Software />}
            {activeTab === 'help' && <Help />}
            {activeTab === 'settings' && (
                <Settings onLogout={handleLogout} />
            )}
        </div>
      </div>
    </div>
  );
};

export default App;