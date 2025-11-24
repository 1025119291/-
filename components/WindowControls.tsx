import React from 'react';
import { Minus, X } from 'lucide-react';

const WindowControls: React.FC = () => {
  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimize();
    } else {
      console.log("Minimize clicked (Not in Electron environment)");
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.close();
    } else {
      console.log("Close clicked (Not in Electron environment)");
    }
  };

  return (
    <div className="flex items-center gap-0 no-drag">
      <button 
        onClick={handleMinimize}
        className="p-2 hover:bg-gray-100 text-gray-500 transition-colors outline-none"
      >
        <Minus size={18} />
      </button>
      <button 
        onClick={handleClose}
        className="p-2 hover:bg-red-500 hover:text-white text-gray-500 transition-colors outline-none"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default WindowControls;