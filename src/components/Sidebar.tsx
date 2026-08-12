import React from 'react';
import { ViewMode } from '../types';
import { 
  Home, 
  MessageSquare, 
  BarChart3, 
  FileText, 
  Layers, 
  Award, 
  Settings,
  Shield,
  Zap
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  documentCount: number;
  sourceCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  documentCount,
  sourceCount
}) => {
  const NAV_ITEMS = [
    { id: 'home' as ViewMode, label: 'Home Overview', icon: Home },
    { id: 'chat' as ViewMode, label: 'Ask CORE (AI Chat)', icon: MessageSquare, badge: 'AI Live' },
    { id: 'insights' as ViewMode, label: 'Insights & Analytics', icon: BarChart3 },
    { id: 'documents' as ViewMode, label: 'Documents Vault', icon: FileText, count: documentCount },
    { id: 'sources' as ViewMode, label: 'Sources & Systems', icon: Layers, count: sourceCount },
    { id: 'impact' as ViewMode, label: 'Business Impact', icon: Award },
    { id: 'settings' as ViewMode, label: 'Settings & Security', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#FDFCFB] border-r border-[#1A1A1A] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] text-[#1A1A1A]">
      {/* Top Nav Items */}
      <div className="p-4 space-y-2">
        <div className="px-3 py-2 text-[10px] font-sans font-bold text-[#1A1A1A]/50 uppercase tracking-[0.2em]">
          Enterprise Navigation
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 text-xs font-sans transition-all ${
                isActive
                  ? 'bg-[#1A1A1A] text-[#FDFCFB] font-bold shadow-sm'
                  : 'text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-[#E5E3DF]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FDFCFB]' : 'text-[#1A1A1A]'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                  isActive ? 'bg-[#FDFCFB] text-[#1A1A1A]' : 'bg-[#1A1A1A] text-[#FDFCFB]'
                }`}>
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && (
                <span className={`px-2 py-0.5 text-[10px] font-bold border ${
                  isActive ? 'bg-[#1A1A1A] border-[#FDFCFB] text-[#FDFCFB]' : 'bg-[#E5E3DF] border-[#1A1A1A]/40 text-[#1A1A1A]'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Security Card & Quick System Status */}
      <div className="p-4 border-t border-[#1A1A1A]">
        <div className="bg-[#E5E3DF] p-4 border border-[#1A1A1A] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#1A1A1A]" />
              <span className="text-xs font-bold font-sans uppercase tracking-wider text-[#1A1A1A]">Private AI Tenant</span>
            </div>
            <Zap className="w-3.5 h-3.5 text-[#1A1A1A]" />
          </div>

          <p className="text-[11px] text-[#1A1A1A]/70 leading-relaxed font-sans">
            Your data stays in your environment. Only authorized role permissions apply.
          </p>

          <div className="pt-2 flex items-center justify-between text-[10px] text-[#1A1A1A] font-sans border-t border-[#1A1A1A]/30">
            <span className="font-mono">Model: Gemini 3.6</span>
            <span className="font-bold uppercase tracking-wider">● SOC2 Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

