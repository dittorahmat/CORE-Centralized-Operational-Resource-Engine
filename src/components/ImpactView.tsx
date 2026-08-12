import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  Clock, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Mail, 
  BarChart2, 
  Database, 
  FileSpreadsheet, 
  Users, 
  Lock, 
  Sparkles,
  Award,
  ChevronRight,
  Building2,
  Briefcase,
  UserCheck,
  Check,
  Calendar,
  Activity,
  Zap
} from 'lucide-react';

interface ImpactViewProps {
  onAskNexusClick: () => void;
}

const IMPACT_30_DAYS_DATA = [
  { date: 'Jul 14', day: 'Day 1', hoursSaved: 32, queryVolume: 140, accuracyPct: 92.4, velocityIndex: 58 },
  { date: 'Jul 17', day: 'Day 4', hoursSaved: 54, queryVolume: 280, accuracyPct: 93.8, velocityIndex: 64 },
  { date: 'Jul 20', day: 'Day 7', hoursSaved: 88, queryVolume: 420, accuracyPct: 95.1, velocityIndex: 71 },
  { date: 'Jul 23', day: 'Day 10', hoursSaved: 112, queryVolume: 590, accuracyPct: 96.0, velocityIndex: 76 },
  { date: 'Jul 26', day: 'Day 13', hoursSaved: 145, queryVolume: 780, accuracyPct: 96.8, velocityIndex: 82 },
  { date: 'Jul 29', day: 'Day 16', hoursSaved: 190, queryVolume: 940, accuracyPct: 97.5, velocityIndex: 86 },
  { date: 'Aug 01', day: 'Day 19', hoursSaved: 235, queryVolume: 1150, accuracyPct: 98.1, velocityIndex: 89 },
  { date: 'Aug 04', day: 'Day 22', hoursSaved: 290, queryVolume: 1420, accuracyPct: 98.6, velocityIndex: 92 },
  { date: 'Aug 07', day: 'Day 25', hoursSaved: 360, queryVolume: 1750, accuracyPct: 99.0, velocityIndex: 95 },
  { date: 'Aug 10', day: 'Day 28', hoursSaved: 425, queryVolume: 2100, accuracyPct: 99.3, velocityIndex: 97 },
  { date: 'Aug 12', day: 'Day 30', hoursSaved: 480, queryVolume: 2450, accuracyPct: 99.6, velocityIndex: 99 },
];

export const ImpactView: React.FC<ImpactViewProps> = ({ onAskNexusClick }) => {
  const [activeMetricTab, setActiveMetricTab] = useState<'all' | 'hours' | 'volume' | 'accuracy'>('all');

  return (
    <div className="flex-1 bg-[#FDFCFB] text-[#1A1A1A] p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-10">
      
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-sans font-bold uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5 text-[#FDFCFB]" />
          <span>Transforming Corporate Knowledge into Execution</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#1A1A1A] leading-tight">
          CORE Connects Your Enterprise Knowledge
        </h1>
        <p className="text-[#1A1A1A]/80 font-serif italic text-sm sm:text-base leading-relaxed">
          CORE is a private AI-powered platform that turns your company's information, documents, systems, and knowledge into instant answers, insights, and recommendations.
        </p>
      </div>

      {/* Section 1: How CORE Connects Knowledge */}
      <div className="space-y-4">
        <div className="text-center border-b border-[#1A1A1A] pb-2">
          <h2 className="text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
            Unified Knowledge Ingestion Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] text-center space-y-2">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Documents</h3>
            <p className="text-[10px] font-sans text-[#1A1A1A]/70 uppercase tracking-wider">SOPs, Policies, Contracts</p>
          </div>

          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] text-center space-y-2">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Emails & Comms</h3>
            <p className="text-[10px] font-sans text-[#1A1A1A]/70 uppercase tracking-wider">Executive Memos, Supplier Emails</p>
          </div>

          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] text-center space-y-2">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Dashboards</h3>
            <p className="text-[10px] font-sans text-[#1A1A1A]/70 uppercase tracking-wider">Audit Logs & Reviews</p>
          </div>

          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] text-center space-y-2">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Systems</h3>
            <p className="text-[10px] font-sans text-[#1A1A1A]/70 uppercase tracking-wider">ERP, CRM, HR, Finance</p>
          </div>

          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] text-center space-y-2">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Spreadsheets</h3>
            <p className="text-[10px] font-sans text-[#1A1A1A]/70 uppercase tracking-wider">Financial Models & Logs</p>
          </div>

          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] text-center space-y-2">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">Tacit Knowledge</h3>
            <p className="text-[10px] font-sans text-[#1A1A1A]/70 uppercase tracking-wider">Domain Handovers & Expertise</p>
          </div>
        </div>
      </div>

      {/* Section 2: The Business Impact */}
      <div className="space-y-4">
        <div className="text-center border-b border-[#1A1A1A] pb-2">
          <h2 className="text-xl font-serif font-black text-[#1A1A1A]">THE BUSINESS IMPACT</h2>
          <p className="text-xs font-sans uppercase tracking-wider text-[#1A1A1A]/60">Quantifiable operational gains across every tier</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2 text-center">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Save Time</h3>
            <p className="text-xs font-sans text-[#1A1A1A]/80 leading-relaxed">
              Reduce hours spent searching for fragmented information.
            </p>
          </div>

          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2 text-center">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Better Decisions</h3>
            <p className="text-xs font-sans text-[#1A1A1A]/80 leading-relaxed">
              Get accurate insights to make confident, faster decisions.
            </p>
          </div>

          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2 text-center">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Productivity</h3>
            <p className="text-xs font-sans text-[#1A1A1A]/80 leading-relaxed">
              Employees spend less time searching and more time executing.
            </p>
          </div>

          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2 text-center">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Protect IP</h3>
            <p className="text-xs font-sans text-[#1A1A1A]/80 leading-relaxed">
              Preserve institutional knowledge and reduce key-person risk.
            </p>
          </div>

          <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2 text-center">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Compliance</h3>
            <p className="text-xs font-sans text-[#1A1A1A]/80 leading-relaxed">
              Ensure people access approved and up-to-date information.
            </p>
          </div>

        </div>
      </div>

      {/* Section 2.5: 30-Day Enterprise Impact Metrics Chart */}
      <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-6">
        
        {/* Chart Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1A1A1A] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#1A1A1A]">
              <Calendar className="w-4 h-4 text-[#1A1A1A]" />
              <span>30-Day Impact Performance Trend</span>
              <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[9px] font-mono">Jul 14 - Aug 12</span>
            </div>
            <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">Enterprise Impact Metrics</h2>
            <p className="text-xs font-serif italic text-[#1A1A1A]/70">
              Tracking hours saved, synthesis volume, precision accuracy, and decision velocity over the past 30 days.
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FDFCFB] border border-[#1A1A1A] p-1 text-xs font-sans font-bold">
            <button
              onClick={() => setActiveMetricTab('all')}
              className={`px-3 py-1.5 transition-colors uppercase tracking-wider ${
                activeMetricTab === 'all' 
                  ? 'bg-[#1A1A1A] text-[#FDFCFB]' 
                  : 'text-[#1A1A1A] hover:bg-[#E5E3DF]'
              }`}
            >
              Combined View
            </button>
            <button
              onClick={() => setActiveMetricTab('hours')}
              className={`px-3 py-1.5 transition-colors uppercase tracking-wider ${
                activeMetricTab === 'hours' 
                  ? 'bg-[#1A1A1A] text-[#FDFCFB]' 
                  : 'text-[#1A1A1A] hover:bg-[#E5E3DF]'
              }`}
            >
              Hours Saved
            </button>
            <button
              onClick={() => setActiveMetricTab('volume')}
              className={`px-3 py-1.5 transition-colors uppercase tracking-wider ${
                activeMetricTab === 'volume' 
                  ? 'bg-[#1A1A1A] text-[#FDFCFB]' 
                  : 'text-[#1A1A1A] hover:bg-[#E5E3DF]'
              }`}
            >
              Query Volume
            </button>
            <button
              onClick={() => setActiveMetricTab('accuracy')}
              className={`px-3 py-1.5 transition-colors uppercase tracking-wider ${
                activeMetricTab === 'accuracy' 
                  ? 'bg-[#1A1A1A] text-[#FDFCFB]' 
                  : 'text-[#1A1A1A] hover:bg-[#E5E3DF]'
              }`}
            >
              Accuracy & Speed
            </button>
          </div>
        </div>

        {/* 30-Day Quick Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-sans">
          <div className="p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[#1A1A1A]/60">
              <span>Cumulative Hours Saved</span>
              <Clock className="w-3.5 h-3.5 text-[#1A1A1A]" />
            </div>
            <div className="text-xl font-serif font-black text-[#1A1A1A] mt-1">2,645 Hrs</div>
            <div className="text-[10px] font-bold text-[#1A1A1A] flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3 text-[#1A1A1A]" /> +310% over 30 days
            </div>
          </div>

          <div className="p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[#1A1A1A]/60">
              <span>Daily Queries Synthesized</span>
              <Activity className="w-3.5 h-3.5 text-[#1A1A1A]" />
            </div>
            <div className="text-xl font-serif font-black text-[#1A1A1A] mt-1">2,450 / Day</div>
            <div className="text-[10px] font-bold text-[#1A1A1A] flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3 text-[#1A1A1A]" /> 17.5x increase in adoption
            </div>
          </div>

          <div className="p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[#1A1A1A]/60">
              <span>Precision Accuracy Rate</span>
              <Target className="w-3.5 h-3.5 text-[#1A1A1A]" />
            </div>
            <div className="text-xl font-serif font-black text-[#1A1A1A] mt-1">99.6%</div>
            <div className="text-[10px] font-bold text-[#1A1A1A] flex items-center gap-1 mt-0.5">
              <Check className="w-3 h-3 text-[#1A1A1A]" /> +7.2% quality baseline improvement
            </div>
          </div>

          <div className="p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[#1A1A1A]/60">
              <span>Decision Velocity Index</span>
              <Zap className="w-3.5 h-3.5 text-[#1A1A1A]" />
            </div>
            <div className="text-xl font-serif font-black text-[#1A1A1A] mt-1">99 / 100</div>
            <div className="text-[10px] font-bold text-[#1A1A1A] flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3 h-3 text-[#1A1A1A]" /> Near-instant executive answers
            </div>
          </div>
        </div>

        {/* Recharts Line Chart Box */}
        <div className="p-4 bg-[#FDFCFB] border border-[#1A1A1A]">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={IMPACT_30_DAYS_DATA} margin={{ top: 15, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D5D3CF" />
                <XAxis 
                  dataKey="date" 
                  stroke="#1A1A1A" 
                  tick={{ fontSize: 11, fontFamily: 'Plus Jakarta Sans', fontWeight: 600 }}
                />
                <YAxis 
                  stroke="#1A1A1A" 
                  tick={{ fontSize: 11, fontFamily: 'Plus Jakarta Sans', fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    borderColor: '#1A1A1A',
                    color: '#FDFCFB',
                    fontSize: '11px',
                    fontFamily: 'Plus Jakarta Sans',
                    padding: '8px 12px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
                  }}
                  itemStyle={{ color: '#FDFCFB', fontWeight: 600 }}
                  labelStyle={{ color: '#FDFCFB', fontWeight: 700, fontFamily: 'Playfair Display', marginBottom: '4px' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}
                />

                {(activeMetricTab === 'all' || activeMetricTab === 'hours') && (
                  <Line 
                    type="monotone" 
                    dataKey="hoursSaved" 
                    name="Daily Hours Saved" 
                    stroke="#1A1A1A" 
                    strokeWidth={3} 
                    dot={{ fill: '#1A1A1A', r: 4, strokeWidth: 1, stroke: '#FDFCFB' }}
                    activeDot={{ r: 7, fill: '#1A1A1A' }}
                  />
                )}

                {(activeMetricTab === 'all' || activeMetricTab === 'volume') && (
                  <Line 
                    type="monotone" 
                    dataKey="queryVolume" 
                    name="Queries Processed (x10)" 
                    stroke="#555555" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                    dot={{ fill: '#555555', r: 3 }}
                  />
                )}

                {(activeMetricTab === 'all' || activeMetricTab === 'accuracy') && (
                  <Line 
                    type="monotone" 
                    dataKey="accuracyPct" 
                    name="Accuracy Rate (%)" 
                    stroke="#000000" 
                    strokeWidth={2} 
                    dot={{ fill: '#000000', r: 4 }}
                  />
                )}

                {(activeMetricTab === 'all' || activeMetricTab === 'accuracy') && (
                  <Line 
                    type="monotone" 
                    dataKey="velocityIndex" 
                    name="Decision Velocity (Index)" 
                    stroke="#888888" 
                    strokeWidth={2} 
                    strokeDasharray="2 2"
                    dot={{ fill: '#888888', r: 3 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-[#1A1A1A]/20 flex flex-wrap items-center justify-between text-[10px] font-sans text-[#1A1A1A]/70">
            <span>Source: Enterprise CORE AI Telemetry Logs (30-Day Rolling Window)</span>
            <span className="font-mono uppercase">Verified by SOC2 Audit Stream • Updated Live</span>
          </div>
        </div>

      </div>

      {/* Section 3: Ideal For & Security Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ideal For List */}
        <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] md:col-span-2 space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#1A1A1A] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#1A1A1A]" />
            IDEAL FOR
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            <div className="flex items-center gap-3 p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
              <Briefcase className="w-4 h-4 text-[#1A1A1A] shrink-0" />
              <span className="font-bold text-[#1A1A1A]">Business Owners & Executives</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
              <BarChart2 className="w-4 h-4 text-[#1A1A1A] shrink-0" />
              <span className="font-bold text-[#1A1A1A]">Operations & Finance Leaders</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
              <TrendingUp className="w-4 h-4 text-[#1A1A1A] shrink-0" />
              <span className="font-bold text-[#1A1A1A]">Sales & Marketing Teams</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
              <UserCheck className="w-4 h-4 text-[#1A1A1A] shrink-0" />
              <span className="font-bold text-[#1A1A1A]">HR & Compliance Teams</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
              <Award className="w-4 h-4 text-[#1A1A1A] shrink-0" />
              <span className="font-bold text-[#1A1A1A]">Project & Department Managers</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#FDFCFB] border border-[#1A1A1A]">
              <Users className="w-4 h-4 text-[#1A1A1A] shrink-0" />
              <span className="font-bold text-[#1A1A1A]">Every Employee in Your Organization</span>
            </div>
          </div>
        </div>

        {/* 100% Private & Secure Card */}
        <div className="p-6 bg-[#1A1A1A] text-[#FDFCFB] border border-[#1A1A1A] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-[#FDFCFB] text-[#1A1A1A] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="font-serif font-black text-xl text-[#FDFCFB]">100% PRIVATE & SECURE</h3>
            
            <p className="text-xs font-sans text-[#FDFCFB]/80 leading-relaxed">
              Your data stays in your environment. Only authorized people can access it. Zero model training on tenant data.
            </p>
          </div>

          <div className="pt-3 border-t border-[#FDFCFB]/30 space-y-2 text-[10px] font-sans font-bold uppercase tracking-widest text-[#FDFCFB]">
            <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> AES-256 Cloud Encryption</div>
            <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> Role-Based Access Control</div>
            <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> SOC2 Type II Certified</div>
          </div>
        </div>

      </div>

      {/* Call to Action Bar */}
      <div className="p-8 bg-[#E5E3DF] border border-[#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-serif font-black text-[#1A1A1A]">Stop searching. Start asking.</h3>
          <p className="text-xs font-serif italic text-[#1A1A1A]/80 mt-1">
            Unlock the full value of your company's knowledge and turn information into execution.
          </p>
        </div>

        <button
          onClick={onAskNexusClick}
          className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-xs uppercase tracking-widest flex items-center gap-2 border border-[#1A1A1A] transition-colors shrink-0"
        >
          <span>Ask CORE Now</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};


