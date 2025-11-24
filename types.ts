export type TabId = 'overview' | 'network' | 'security' | 'lab' | 'software' | 'help' | 'settings';

export interface SoftwareItem {
  id: string;
  name: string;
  desc: string;
  iconColor: string;
  version?: string;
}

export interface LabItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

// 扩展 window 对象，增加 electronAPI
declare global {
  interface Window {
    electronAPI?: {
      minimize: () => void;
      close: () => void;
    };
  }
}