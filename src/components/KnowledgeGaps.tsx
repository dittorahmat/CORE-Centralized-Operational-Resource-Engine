import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Upload, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  FilePlus, 
  ShieldAlert, 
  HelpCircle, 
  Clock, 
  Building2, 
  TrendingUp, 
  Sparkles,
  X,
  Filter
} from 'lucide-react';
import { DocumentItem } from '../types';

interface KnowledgeGap {
  id: string;
  topic: string;
  description: string;
  department: 'Finance' | 'Operations' | 'Legal' | 'IT & Security' | 'HR & People';
  searchFrequency: number; // Searches in last 7 days
  coveragePct: number; // 0 to 100
  priority: 'Critical' | 'High' | 'Medium';
  suggestedDocType: string;
  sampleQueries: string[];
  resolved?: boolean;
}

interface KnowledgeGapsProps {
  onAddDocument: (doc: DocumentItem) => void;
  onAskNexus: (query: string) => void;
  onNavigateToDocuments: () => void;
}

const INITIAL_GAPS: KnowledgeGap[] = [
  {
    id: 'gap-1',
    topic: 'Q4 AI & GPU Infrastructure Spending Approval SOP',
    description: '184 searches this week with only 12% matching documentation. Executive teams are searching for spending authorization limits and vendor procurement paths.',
    department: 'Finance',
    searchFrequency: 184,
    coveragePct: 12,
    priority: 'Critical',
    suggestedDocType: 'Financial Policy / SOP',
    sampleQueries: [
      'Who approves GPU hardware purchases above $50k?',
      'What is the Q4 AI infrastructure budget limit?'
    ]
  },
  {
    id: 'gap-2',
    topic: 'Remote & BYOD Hardware Security Guidelines 2026',
    description: '142 unfulfilled employee searches regarding personal device registration, hardware encryption rules, and international travel VPN protocols.',
    department: 'IT & Security',
    searchFrequency: 142,
    coveragePct: 0,
    priority: 'Critical',
    suggestedDocType: 'Security Standard Operating Procedure',
    sampleQueries: [
      'Can I connect a personal iPad to enterprise Slack?',
      'What is the international travel laptop loaner policy?'
    ]
  },
  {
    id: 'gap-3',
    topic: 'Vendor SLA Penalty Clause & Contract Termination Workflow',
    description: '98 searches from Legal and Procurement asking for specific escalation protocols when SaaS vendors breach 99.9% uptime commitments.',
    department: 'Legal',
    searchFrequency: 98,
    coveragePct: 25,
    priority: 'High',
    suggestedDocType: 'Legal Playbook / Contract Template',
    sampleQueries: [
      'What is our standard SLA penalty credit percentage?',
      'How do we issue a 30-day vendor cure notice?'
    ]
  },
  {
    id: 'gap-4',
    topic: 'Branch #04 Supply Chain Contingency Protocol',
    description: '76 searches regarding backup freight carriers and secondary warehouse routing when logistics routes experience weather delays.',
    department: 'Operations',
    searchFrequency: 76,
    coveragePct: 18,
    priority: 'High',
    suggestedDocType: 'Operations Manual / Runbook',
    sampleQueries: [
      'Who is the secondary freight broker for Midwest distribution?',
      'What is the emergency rerun threshold for delayed shipments?'
    ]
  },
  {
    id: 'gap-5',
    topic: 'Executive Parental Leave & Sabbatical Policy Update',
    description: '54 searches this month seeking official policy text on flexible sabbatical options for senior director roles.',
    department: 'HR & People',
    searchFrequency: 54,
    coveragePct: 5,
    priority: 'Medium',
    suggestedDocType: 'HR Policy Briefing',
    sampleQueries: [
      'What is the tenure requirement for executive sabbatical?',
      'How does health insurance coverage work during unpaid leave?'
    ]
  }
];

export const KnowledgeGaps: React.FC<KnowledgeGapsProps> = ({
  onAddDocument,
  onAskNexus,
  onNavigateToDocuments
}) => {
  const [gaps, setGaps] = useState<KnowledgeGap[]>(INITIAL_GAPS);
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedGapForUpload, setSelectedGapForUpload] = useState<KnowledgeGap | null>(null);

  // Upload Form State
  const [docTitle, setDocTitle] = useState('');
  const [docContent, setDocContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestedGapIds, setRequestedGapIds] = useState<Record<string, boolean>>({});

  const filteredGaps = gaps.filter((g) => {
    if (selectedDept !== 'All' && g.department !== selectedDept) return false;
    return true;
  });

  const handleOpenUpload = (gap: KnowledgeGap) => {
    setSelectedGapForUpload(gap);
    setDocTitle(gap.topic);
    setDocContent('');
  };

  const handleCloseUpload = () => {
    setSelectedGapForUpload(null);
    setDocTitle('');
    setDocContent('');
  };

  const handleSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docContent.trim() || !selectedGapForUpload) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newDoc: DocumentItem = {
        id: `doc-gap-${Date.now()}`,
        title: docTitle.trim(),
        category: selectedGapForUpload.suggestedDocType,
        fileType: 'pdf',
        size: '1.8 MB',
        lastUpdated: new Date().toISOString().slice(0, 10),
        author: 'User Direct Upload',
        department: selectedGapForUpload.department,
        status: 'Indexed',
        summary: `User indexed knowledge gap resolution for "${selectedGapForUpload.topic}". Auto-ingested into CORE knowledge context.`,
        tags: [selectedGapForUpload.department, 'Gap Resolved', 'Priority Ingest'],
        contentExcerpt: docContent.trim()
      };

      onAddDocument(newDoc);

      // Mark gap coverage as resolved
      setGaps((prev) =>
        prev.map((g) =>
          g.id === selectedGapForUpload.id
            ? { ...g, coveragePct: 100, resolved: true }
            : g
        )
      );

      setIsSubmitting(false);
      handleCloseUpload();
    }, 600);
  };

  const handleRequestDoc = (gapId: string) => {
    setRequestedGapIds((prev) => ({ ...prev, [gapId]: true }));
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#1A1A1A] pb-3 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
            <AlertTriangle className="w-4 h-4 text-[#1A1A1A]" />
            <span>03. Internal Knowledge Gaps & Telemetry</span>
          </div>
          <h2 className="text-2xl font-serif font-black text-[#1A1A1A] mt-1">
            Missing Documentation Alerts
          </h2>
          <p className="text-xs font-serif italic text-[#1A1A1A]/80 mt-0.5">
            CORE automatically detects high-frequency search topics with low verified document coverage. Upload relevant data to resolve gaps.
          </p>
        </div>

        <button
          onClick={onNavigateToDocuments}
          className="px-4 py-2 bg-[#E5E3DF] hover:bg-[#D5D3CF] text-[#1A1A1A] text-xs font-sans font-bold uppercase tracking-wider border border-[#1A1A1A] flex items-center gap-2 self-start sm:self-auto transition-colors shrink-0"
        >
          <FilePlus className="w-3.5 h-3.5" />
          <span>Open Full Vault</span>
        </button>
      </div>

      {/* Summary KPI Banner */}
      <div className="p-5 bg-[#E5E3DF] border border-[#1A1A1A] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center font-bold font-mono text-lg shrink-0">
            {gaps.filter(g => !g.resolved).length}
          </div>
          <div>
            <div className="font-serif font-bold text-base text-[#1A1A1A]">
              Active Knowledge Gaps Requiring Data Upload
            </div>
            <div className="text-xs font-sans text-[#1A1A1A]/70 mt-0.5">
              554 unfulfilled employee queries logged in the last 7 days. Resolved topics immediately enhance AI accuracy.
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#FDFCFB] border border-[#1A1A1A] p-1 text-xs font-sans font-bold">
          <Filter className="w-3.5 h-3.5 text-[#1A1A1A] ml-2 mr-1" />
          {['All', 'Finance', 'IT & Security', 'Legal', 'Operations', 'HR & People'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-2.5 py-1 transition-colors uppercase tracking-wider text-[11px] ${
                selectedDept === dept 
                  ? 'bg-[#1A1A1A] text-[#FDFCFB]' 
                  : 'text-[#1A1A1A] hover:bg-[#E5E3DF]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Gap Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredGaps.map((gap) => (
          <div 
            key={gap.id}
            className={`p-6 border border-[#1A1A1A] transition-all relative ${
              gap.resolved ? 'bg-[#FDFCFB]/60 opacity-80' : 'bg-[#FDFCFB] hover:border-black'
            }`}
          >
            {/* Card Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-[#1A1A1A]/20 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-widest bg-[#1A1A1A] text-[#FDFCFB]">
                    {gap.department}
                  </span>
                  
                  <span className={`px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-widest border border-[#1A1A1A] ${
                    gap.priority === 'Critical' 
                      ? 'bg-[#1A1A1A] text-[#FDFCFB]' 
                      : gap.priority === 'High' 
                      ? 'bg-[#E5E3DF] text-[#1A1A1A]' 
                      : 'bg-[#FDFCFB] text-[#1A1A1A]'
                  }`}>
                    {gap.priority} Priority Gap
                  </span>

                  {gap.resolved && (
                    <span className="px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-widest bg-[#1A1A1A] text-[#FDFCFB] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#FDFCFB]" />
                      Data Indexed & Gap Resolved
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mt-2">
                  {gap.topic}
                </h3>
                <p className="text-xs font-sans text-[#1A1A1A]/80 leading-relaxed max-w-3xl">
                  {gap.description}
                </p>
              </div>

              {/* Metrics Badge */}
              <div className="flex md:flex-col items-end justify-between md:justify-start gap-4 md:gap-1 shrink-0 bg-[#E5E3DF] p-3 border border-[#1A1A1A] text-right font-sans">
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#1A1A1A]/60">Weekly Queries</div>
                  <div className="text-lg font-serif font-black text-[#1A1A1A]">{gap.searchFrequency} Searches</div>
                </div>
                <div className="mt-1">
                  <div className="text-[10px] font-bold uppercase text-[#1A1A1A]/60">Document Coverage</div>
                  <div className="text-xs font-bold text-[#1A1A1A]">
                    {gap.coveragePct}% Indexed
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Queries Prompt */}
            <div className="py-3 flex flex-wrap items-center gap-2 text-xs font-sans">
              <span className="font-bold text-[#1A1A1A]/70 uppercase tracking-wider text-[10px]">Frequent Search Prompts:</span>
              {gap.sampleQueries.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => onAskNexus(sq)}
                  className="px-2.5 py-1 bg-[#E5E3DF]/70 hover:bg-[#1A1A1A] hover:text-[#FDFCFB] border border-[#1A1A1A]/30 text-[11px] font-serif italic transition-colors text-left"
                  title="Click to test this prompt in Ask CORE"
                >
                  "{sq}"
                </button>
              ))}
            </div>

            {/* Card Action Toolbar */}
            <div className="pt-3 border-t border-[#1A1A1A]/20 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] font-sans text-[#1A1A1A]/70">
                Suggested Index Format: <strong className="text-[#1A1A1A]">{gap.suggestedDocType}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAskNexus(`Search status and data for: ${gap.topic}`)}
                  className="px-3 py-1.5 bg-[#FDFCFB] hover:bg-[#E5E3DF] text-[#1A1A1A] font-sans font-bold text-[11px] uppercase tracking-wider border border-[#1A1A1A] transition-colors"
                >
                  Ask CORE Status
                </button>

                {!gap.resolved && (
                  <button
                    onClick={() => handleRequestDoc(gap.id)}
                    disabled={requestedGapIds[gap.id]}
                    className="px-3 py-1.5 bg-[#E5E3DF] hover:bg-[#D5D3CF] text-[#1A1A1A] font-sans font-bold text-[11px] uppercase tracking-wider border border-[#1A1A1A] transition-colors disabled:opacity-60"
                  >
                    {requestedGapIds[gap.id] ? 'Request Sent to Lead ✓' : 'Notify Team Lead'}
                  </button>
                )}

                <button
                  onClick={() => handleOpenUpload(gap)}
                  className="px-4 py-1.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-[11px] uppercase tracking-widest border border-[#1A1A1A] flex items-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{gap.resolved ? 'Add More Data' : 'Upload Relevant Data'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Overlay Form for Uploading Relevant Data to Gap */}
      {selectedGapForUpload && (
        <div className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCFB] border border-[#1A1A1A] max-w-2xl w-full p-6 space-y-6 shadow-2xl text-[#1A1A1A] animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#1A1A1A] pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-sans font-bold uppercase tracking-widest mb-1">
                  <FilePlus className="w-3 h-3 text-[#FDFCFB]" />
                  <span>Knowledge Gap Ingestion Tool</span>
                </div>
                <h3 className="text-xl font-serif font-black text-[#1A1A1A]">
                  Upload / Index SOP for "{selectedGapForUpload.topic}"
                </h3>
                <p className="text-xs font-serif italic text-[#1A1A1A]/70 mt-0.5">
                  Inputting text or uploading files directly bridges the coverage gap and trains CORE context instantly.
                </p>
              </div>

              <button 
                onClick={handleCloseUpload}
                className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#E5E3DF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitData} className="space-y-4">
              <div className="space-y-1 font-sans">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Document / Policy Title
                </label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. Q4 AI Hardware Procurement Policy v1.0"
                  className="w-full px-3 py-2 bg-[#E5E3DF] border border-[#1A1A1A] text-xs font-serif text-[#1A1A1A] focus:outline-none focus:bg-[#FDFCFB]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                <div className="p-2.5 bg-[#E5E3DF] border border-[#1A1A1A]">
                  <div className="text-[10px] font-bold uppercase text-[#1A1A1A]/60">Department Target</div>
                  <div className="font-bold text-[#1A1A1A] mt-0.5">{selectedGapForUpload.department}</div>
                </div>
                <div className="p-2.5 bg-[#E5E3DF] border border-[#1A1A1A]">
                  <div className="text-[10px] font-bold uppercase text-[#1A1A1A]/60">Recommended Category</div>
                  <div className="font-bold text-[#1A1A1A] mt-0.5">{selectedGapForUpload.suggestedDocType}</div>
                </div>
              </div>

              <div className="space-y-1 font-sans">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center justify-between">
                  <span>Document Text Content / SOP Notes</span>
                  <span className="text-[10px] text-[#1A1A1A]/60 font-mono">Paste text or markdown</span>
                </label>
                <textarea
                  rows={6}
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  placeholder="Paste official policy guidelines, threshold limits, contact details, or operational instructions here..."
                  className="w-full p-3 bg-[#E5E3DF] border border-[#1A1A1A] text-xs font-mono text-[#1A1A1A] focus:outline-none focus:bg-[#FDFCFB] leading-relaxed"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#1A1A1A] flex items-center justify-between font-sans">
                <span className="text-[10px] uppercase font-bold text-[#1A1A1A]/60 tracking-wider">
                  Tenant Isolated • SOC2 Compliant
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseUpload}
                    className="px-4 py-2 bg-[#E5E3DF] hover:bg-[#D5D3CF] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider border border-[#1A1A1A]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !docTitle.trim() || !docContent.trim()}
                    className="px-6 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] text-xs font-bold uppercase tracking-widest border border-[#1A1A1A] flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Indexing into CORE...</span>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Index & Resolve Gap</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
