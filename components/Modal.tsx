import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, width = "w-[400px]" }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      <div className={`${width} bg-white rounded-lg shadow-2xl p-6 relative animate-[scale-in_0.2s_ease-out]`}>
        <div className="flex justify-between items-center mb-6">
            <div className="flex-1 text-center font-bold text-gray-700 text-base">{title}</div>
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                <X size={18} />
            </button>
        </div>
        <div>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;