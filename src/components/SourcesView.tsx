import React, { useState } from 'react';
import { SystemSource } from '../types';
import { 
  Database, 
  Users, 
  UserCheck, 
  Server, 
  FileSpreadsheet, 
  Mail, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Layers,
  Zap,
  HardDrive
} from 'lucide-react';

interface SourcesViewProps {
  sources: SystemSource[];
  onToggleSync: (id: string) => void;
}

export const SourcesView: React.FC<SourcesViewProps> = ({ sources, onToggleSync }) => {
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const totalRecords = sources.reduce((acc, curr) => acc + curr.recordsCount, 0);

  const handleManualSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      onToggleSync(id);
      setSyncingId(null);
    }, 1200);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Database': return Database;
      case 'Users': return Users;
      case 'UserCheck': return UserCheck;
      case 'Server': return Server;
      case 'FileSpreadsheet': return FileSpreadsheet;
      case 'Mail': return Mail;
      default: return HardDrive;
    }
  };

  return (
    <div className="flex-1 bg-[#FDFCFB] text-[#1A1A1A] p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1A1A1A]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-black text-[#1A1A1A]">Connected Enterprise Systems</h1>
            <span className="px-2.5 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-sans font-bold uppercase tracking-widest">
              6/6 Operational
            </span>
          </div>
          <p className="text-[#1A1A1A]/70 text-xs font-serif italic mt-1">
            CORE connects directly with your enterprise ERP, CRM, HR, Data Lakes, Spreadsheets, and Communications.
          </p>
        </div>

        {/* Total Records Counter */}
        <div className="p-4 bg-[#E5E3DF] border border-[#1A1A1A] flex items-center gap-3">
          <div className="p-2.5 bg-[#1A1A1A] text-[#FDFCFB]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A]/60">Synced Knowledge Base</div>
            <div className="text-xl font-serif font-black text-[#1A1A1A]">
              {totalRecords.toLocaleString()} Records
            </div>
          </div>
        </div>
      </div>

      {/* Connection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((sys) => {
          const IconComponent = getIcon(sys.iconName);
          const isSyncing = syncingId === sys.id;

          return (
            <div
              key={sys.id}
              className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] flex flex-col justify-between space-y-4 hover:bg-[#FDFCFB] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-[#1A1A1A] text-[#FDFCFB]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <span className="px-2.5 py-1 bg-[#1A1A1A] text-[#FDFCFB] text-[9px] font-sans font-bold uppercase tracking-widest flex items-center gap-1.5 border border-[#1A1A1A]">
                    <CheckCircle2 className="w-3 h-3 text-[#FDFCFB]" />
                    {sys.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">{sys.name}</h3>
                  <p className="text-xs font-serif italic text-[#1A1A1A]/80 mt-1 leading-relaxed">
                    {sys.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1A1A1A]/30 text-xs font-sans">
                  <div className="bg-[#FDFCFB] p-2.5 border border-[#1A1A1A]/30">
                    <div className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/60">Records Index</div>
                    <div className="font-bold text-[#1A1A1A] text-sm">{sys.recordsCount.toLocaleString()}</div>
                  </div>
                  <div className="bg-[#FDFCFB] p-2.5 border border-[#1A1A1A]/30">
                    <div className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/60">Security Standard</div>
                    <div className="font-bold text-[#1A1A1A] text-[10px] uppercase tracking-wider truncate">{sys.securityLevel}</div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-[#1A1A1A]/30 flex items-center justify-between text-xs font-sans">
                <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">Sync: {sys.lastSync}</span>
                
                <button
                  onClick={() => handleManualSync(sys.id)}
                  disabled={isSyncing}
                  className="px-3.5 py-1.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all border border-[#1A1A1A]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#FDFCFB] ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Force Sync'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Security Architecture Callout */}
      <div className="p-6 bg-[#1A1A1A] text-[#FDFCFB] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#FDFCFB] text-[#1A1A1A] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-[#FDFCFB]">Zero-Trust Enterprise Data Access</h4>
            <p className="text-xs font-sans text-[#FDFCFB]/80 mt-0.5">
              CORE never replicates source databases permanently. Queries execute with real-time role permission filtering and ephemeral tokenization.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#FDFCFB] shrink-0 border border-[#FDFCFB] px-3 py-1.5">
          <Zap className="w-4 h-4" />
          <span>AES-256 Encryption</span>
        </div>
      </div>

    </div>
  );
};

