import React from 'react';
import { SourceCitation, DocumentItem } from '../types';
import { X, FileText, CheckCircle2, Clock, ShieldCheck, Database, ExternalLink, Sparkles } from 'lucide-react';

interface DocumentModalProps {
  item: SourceCitation | DocumentItem | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isCitation = 'excerpt' in item;

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCFB] border border-[#1A1A1A] max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-[#1A1A1A]">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1A1A1A] pb-4 gap-3">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-[#1A1A1A] text-[#FDFCFB] shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#1A1A1A] text-[#FDFCFB] uppercase">
                  {isCitation ? item.type : item.category}
                </span>
                <span className="text-[11px] text-[#1A1A1A] font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Indexed & Verified
                </span>
              </div>
              <h2 className="font-serif font-black text-xl text-[#1A1A1A] mt-1 leading-snug">{item.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#E5E3DF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-sans">
          <div className="p-3 bg-[#E5E3DF] border border-[#1A1A1A]">
            <div className="text-[10px] text-[#1A1A1A]/60 font-bold uppercase tracking-wider">System Origin</div>
            <div className="font-bold text-[#1A1A1A] mt-0.5 truncate">
              {isCitation ? item.systemOrigin : item.department}
            </div>
          </div>

          <div className="p-3 bg-[#E5E3DF] border border-[#1A1A1A]">
            <div className="text-[10px] text-[#1A1A1A]/60 font-bold uppercase tracking-wider">Last Updated</div>
            <div className="font-bold text-[#1A1A1A] mt-0.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#1A1A1A]" />
              {item.lastUpdated}
            </div>
          </div>

          <div className="p-3 bg-[#E5E3DF] border border-[#1A1A1A] col-span-2 sm:col-span-1">
            <div className="text-[10px] text-[#1A1A1A]/60 font-bold uppercase tracking-wider">Location / Section</div>
            <div className="font-bold text-[#1A1A1A] mt-0.5">
              {isCitation ? (item.pageOrSection || 'Section 1') : `${item.size} (${item.fileType.toUpperCase()})`}
            </div>
          </div>
        </div>

        {/* Excerpt Text Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" /> Source Document Text
            </span>
            <span className="text-[10px] text-[#1A1A1A]/60 font-mono">AES-256 Tenant Isolated</span>
          </div>

          <div className="p-4 bg-[#E5E3DF] border border-[#1A1A1A] text-xs text-[#1A1A1A] font-mono leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
            {isCitation ? item.excerpt : (item.contentExcerpt || item.summary)}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1A1A1A] flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-1.5 text-[#1A1A1A]/70 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>CORE Private Enterprise Knowledge Vault</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-bold text-xs uppercase tracking-widest transition-colors border border-[#1A1A1A]"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
