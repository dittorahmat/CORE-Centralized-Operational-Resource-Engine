import React from 'react';
import { RolePersona } from '../types';
import { 
  Cpu, 
  ChevronDown, 
  Sparkles, 
  Search, 
  Building2, 
  Info,
  Lock
} from 'lucide-react';

interface HeaderProps {
  currentRole: RolePersona;
  onRoleChange: (role: RolePersona) => void;
  onOpenAcronymModal: () => void;
  onSearchClick: () => void;
}

const ROLES: RolePersona[] = [
  'Operations & Finance',
  'Executive',
  'Sales & Marketing',
  'HR & Compliance',
  'Project Manager',
  'General Employee'
];

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onOpenAcronymModal,
  onSearchClick
}) => {
  return (
    <header className="bg-[#FDFCFB] border-b border-[#1A1A1A] text-[#1A1A1A] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand Acronym */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center font-bold font-serif text-lg tracking-tighter">
              C
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-2xl tracking-tight text-[#1A1A1A]">
                  CORE<span className="text-[#1A1A1A] text-xs font-sans font-bold align-super ml-0.5">™</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-widest bg-[#E5E3DF] text-[#1A1A1A] border border-[#1A1A1A]/30">
                  Version 2.0 // System
                </span>
                <button
                  onClick={onOpenAcronymModal}
                  title="View Acronym & Brand Origin"
                  className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#E5E3DF] transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] font-sans uppercase tracking-wider text-[#1A1A1A]/60 hidden md:block">
                Centralized Operational Resource Engine
              </p>
            </div>
          </div>

          {/* Quick Search trigger */}
          <div className="flex-1 max-w-md hidden lg:flex items-center gap-2">
            <button
              onClick={onSearchClick}
              className="w-full bg-[#E5E3DF]/50 hover:bg-[#E5E3DF] text-[#1A1A1A]/70 hover:text-[#1A1A1A] text-xs px-3.5 py-2 border border-[#1A1A1A] flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2 font-sans">
                <Search className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span className="italic font-serif text-sm">Ask CORE or search SOPs, contracts, metrics...</span>
              </div>
              <kbd className="bg-[#1A1A1A] text-[#FDFCFB] px-1.5 py-0.5 text-[10px] font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Section: Role Switcher & Security Badge */}
          <div className="flex items-center gap-3">
            
            {/* Private & Secure Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#E5E3DF] text-[#1A1A1A] text-[10px] font-sans font-bold uppercase tracking-widest border border-[#1A1A1A]">
              <Lock className="w-3 h-3 text-[#1A1A1A]" />
              <span>100% Private & Secure</span>
            </div>

            {/* Role Switcher Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-[#1A1A1A] text-[#FDFCFB] border border-[#1A1A1A] px-3 py-1.5 text-xs cursor-pointer transition-all hover:bg-[#333333]">
                <Building2 className="w-3.5 h-3.5 text-[#FDFCFB]" />
                <div className="text-left">
                  <div className="text-[9px] text-[#FDFCFB]/70 uppercase tracking-widest font-sans">Persona</div>
                  <div className="font-bold font-sans text-xs">{currentRole}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#FDFCFB] ml-1 group-hover:rotate-180 transition-transform" />
              </div>

              {/* Role Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-56 bg-[#FDFCFB] border-2 border-[#1A1A1A] shadow-xl py-1 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 border-b border-[#1A1A1A] text-[9px] font-bold text-[#1A1A1A]/60 uppercase tracking-widest font-sans">
                  Select Perspective
                </div>
                {ROLES.map((role) => (
                  <button
                    key={role}
                    onClick={() => onRoleChange(role)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#E5E3DF] transition-colors font-sans ${
                      currentRole === role ? 'text-[#1A1A1A] font-bold bg-[#E5E3DF]' : 'text-[#1A1A1A]/80'
                    }`}
                  >
                    <span>{role}</span>
                    {currentRole === role && <Sparkles className="w-3 h-3 text-[#1A1A1A]" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

