import React from 'react';
import { X, Cpu, Sparkles } from 'lucide-react';

interface AcronymModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcronymModal: React.FC<AcronymModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCFB] border border-[#1A1A1A] max-w-lg w-full p-6 space-y-6 shadow-2xl text-[#1A1A1A]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-[#FDFCFB]" />
            </div>
            <div>
              <h2 className="font-serif font-extrabold text-lg text-[#1A1A1A]">Brand Architecture & Acronym</h2>
              <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60">Enterprise AI Intelligence Platform</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1A1A1A] hover:bg-[#E5E3DF] transition-colors border border-transparent hover:border-[#1A1A1A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Comparison */}
        <div className="grid grid-cols-2 gap-3 text-xs font-sans">
          
          {/* Legacy Poster Name */}
          <div className="p-3.5 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2">
            <span className="px-2 py-0.5 bg-[#1A1A1A]/20 text-[#1A1A1A] text-[9px] font-bold uppercase tracking-widest">
              Original Draft
            </span>
            <div className="font-serif font-extrabold text-base text-[#1A1A1A]">ERIC™</div>
            <p className="text-[10px] text-[#1A1A1A]/70 font-mono">
              Enterprise Resource Intelligence Centre
            </p>
          </div>

          {/* Corrected Matching Name */}
          <div className="p-3.5 bg-[#1A1A1A] text-[#FDFCFB] border border-[#1A1A1A] space-y-2">
            <span className="px-2 py-0.5 bg-[#FDFCFB] text-[#1A1A1A] text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 w-fit">
              <Sparkles className="w-2.5 h-2.5 text-[#1A1A1A]" /> Official Acronym
            </span>
            <div className="font-serif font-extrabold text-lg text-[#FDFCFB]">
              CORE™
            </div>
            <p className="text-[10px] text-[#FDFCFB]/80 font-mono font-bold">
              Centralized Operational Resource Engine
            </p>
          </div>

        </div>

        {/* Acronym Breakdown */}
        <div className="p-4 bg-[#E5E3DF] border border-[#1A1A1A] space-y-3">
          <div className="text-xs font-sans font-bold text-[#1A1A1A] flex items-center justify-between border-b border-[#1A1A1A]/20 pb-2">
            <span className="uppercase tracking-wider">Exact Letter Breakdown</span>
            <span className="text-[10px] text-[#1A1A1A] font-mono font-bold">C - O - R - E</span>
          </div>

          <ul className="space-y-2 text-xs font-sans text-[#1A1A1A]">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 bg-[#1A1A1A] text-[#FDFCFB] font-bold flex items-center justify-center shrink-0 text-xs">C</span>
              <div><strong className="font-serif">Centralized</strong> — Interconnects all ERP, CRM, HR, & Data Lakes into one hub.</div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 bg-[#1A1A1A] text-[#FDFCFB] font-bold flex items-center justify-center shrink-0 text-xs">O</span>
              <div><strong className="font-serif">Operational</strong> — Built for daily executive, financial, & workflow execution.</div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 bg-[#1A1A1A] text-[#FDFCFB] font-bold flex items-center justify-center shrink-0 text-xs">R</span>
              <div><strong className="font-serif">Resource</strong> — Unifies all enterprise documents, SOPs, contracts, & datasets.</div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 bg-[#1A1A1A] text-[#FDFCFB] font-bold flex items-center justify-center shrink-0 text-xs">E</span>
              <div><strong className="font-serif">Engine</strong> — Private AI engine delivering instant, verified answers & insights.</div>
            </li>
          </ul>
        </div>

        {/* Footer Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-xs uppercase tracking-widest transition-colors border border-[#1A1A1A]"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};

