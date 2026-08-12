import React, { useState } from 'react';
import { 
  ViewMode, 
  RolePersona, 
  ChatMessage, 
  DocumentItem, 
  SystemSource, 
  SourceCitation 
} from './types';
import { 
  INITIAL_DOCUMENTS, 
  INITIAL_SYSTEM_SOURCES, 
  STARTER_QUESTIONS, 
  IMPACT_METRICS 
} from './data/initialData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AskNexusView } from './components/AskNexusView';
import { DocumentsView } from './components/DocumentsView';
import { SourcesView } from './components/SourcesView';
import { InsightsView } from './components/InsightsView';
import { ImpactView } from './components/ImpactView';
import { KnowledgeGaps } from './components/KnowledgeGaps';
import { DocumentModal } from './components/DocumentModal';
import { AcronymModal } from './components/AcronymModal';

import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Bot, 
  FileText, 
  Layers, 
  Clock, 
  Target, 
  TrendingUp, 
  HelpCircle,
  ChevronRight,
  Cpu,
  Lock
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [currentRole, setCurrentRole] = useState<RolePersona>('Operations & Finance');
  
  // App state
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [sources, setSources] = useState<SystemSource[]>(INITIAL_SYSTEM_SOURCES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // Modal states
  const [activeCitationModal, setActiveCitationModal] = useState<SourceCitation | DocumentItem | null>(null);
  const [isAcronymModalOpen, setIsAcronymModalOpen] = useState(false);

  // Handle sending message to backend Express / Gemini
  const handleSendMessage = async (query: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsLoadingChat(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          role: currentRole,
          history: chatMessages.slice(-6)
        })
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `nex-${Date.now()}`,
        sender: 'nexus',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations,
        metricVisual: data.metricVisual,
        recommendations: data.recommendations
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat API call failed:', err);
      // Fallback message if network is down
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'nexus',
        text: `### NEXUS Enterprise Intelligence (Local Fallback)\n\nI have queried connected systems for **"${query}"**.\n\nKey Insights:\n- **Top Margin Generator**: NEXUS Cloud Enterprise Pro (68.4% gross margin).\n- **Highest Volume Customer**: Apex Global Corp ($14.8M gross revenue, $6.10M net profit).\n- **Immediate Priority**: Branch #04 equipment downtime requiring $45k/day overtime mitigation.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          {
            id: 'doc-001',
            title: 'Q3 Enterprise Financial Performance & Margin Analysis',
            type: 'Report',
            excerpt: 'Apex Global Corp generated $14.8M revenue with net profit margin of 41.2%.',
            confidence: 98,
            lastUpdated: '2026-08-01',
            systemOrigin: 'SAP S/4HANA ERP'
          }
        ]
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleToggleSyncSource = (id: string) => {
    setSources((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, lastSync: 'Just now', status: s.status === 'Connected' ? 'Connected' : 'Connected' }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans flex flex-col selection:bg-[#1A1A1A] selection:text-[#FDFCFB]">
      
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenAcronymModal={() => setIsAcronymModalOpen(true)}
        onSearchClick={() => {
          setCurrentView('chat');
        }}
      />

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          documentCount={documents.length}
          sourceCount={sources.length}
        />

        {/* View Switcher Content Body */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          
          {/* View 1: Home Overview */}
          {currentView === 'home' && (
            <div className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-10">
              
              {/* Hero Banner - Editorial Layout */}
              <div className="p-8 sm:p-12 bg-[#E5E3DF] border border-[#1A1A1A] space-y-6 relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-sans font-bold uppercase tracking-[0.2em]">
                  <Cpu className="w-3.5 h-3.5 text-[#FDFCFB]" />
                  <span>Version 2.0 // Enterprise System</span>
                </div>

                <div className="space-y-3 max-w-3xl">
                  <h1 className="text-4xl sm:text-6xl font-serif font-black text-[#1A1A1A] leading-tight tracking-tight">
                    Your Company's Intelligence. Available Instantly.
                  </h1>
                  <p className="text-base sm:text-lg italic font-serif text-[#1A1A1A]/80 leading-relaxed">
                    CORE™ (Centralized Operational Resource Engine) turns your SOPs, financial documents, ERP records, and contracts into instant, verifiable answers.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setCurrentView('chat')}
                    className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-xs uppercase tracking-widest flex items-center gap-2 border border-[#1A1A1A] transition-colors"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Launch AI Intelligence Assistant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsAcronymModalOpen(true)}
                    className="px-5 py-3 bg-[#FDFCFB] hover:bg-[#E5E3DF] text-[#1A1A1A] font-sans font-bold text-xs uppercase tracking-widest border border-[#1A1A1A] flex items-center gap-2 transition-colors"
                  >
                    <span>View Brand Origin</span>
                  </button>
                </div>
              </div>

              {/* Starter Questions Showcase directly from Poster */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                  <h2 className="text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-[0.2em] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#1A1A1A]" />
                    01. Ask Questions That Matter
                  </h2>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#1A1A1A]/60">Poster Featured Prompts</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {STARTER_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentView('chat');
                        handleSendMessage(q);
                      }}
                      className="p-5 bg-[#FDFCFB] border border-[#1A1A1A] hover:bg-[#E5E3DF] text-left transition-all flex items-start justify-between group"
                    >
                      <span className="pr-3 text-sm font-serif italic text-[#1A1A1A] leading-snug">{q}</span>
                      <ChevronRight className="w-4 h-4 text-[#1A1A1A]/50 group-hover:text-[#1A1A1A] group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats Grid - Big Editorial Numbers */}
              <div className="space-y-4">
                <div className="border-b border-[#1A1A1A] pb-2">
                  <h2 className="text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                    02. Enterprise Impact Metrics
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {IMPACT_METRICS.slice(0, 4).map((m, idx) => (
                    <div key={idx} className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2">
                      <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A]/60">{m.title}</div>
                      <div className="text-4xl font-serif font-black text-[#1A1A1A]">{m.value}</div>
                      <div className="text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-wider">{m.trend}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Knowledge Gaps Detector Component */}
              <KnowledgeGaps
                onAddDocument={handleAddDocument}
                onAskNexus={(query) => {
                  setCurrentView('chat');
                  handleSendMessage(query);
                }}
                onNavigateToDocuments={() => setCurrentView('documents')}
              />

              {/* Security Banner */}
              <div className="p-6 bg-[#1A1A1A] text-[#FDFCFB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-7 h-7 text-[#FDFCFB]" />
                  <div>
                    <h3 className="text-base font-serif font-bold">100% Private & Tenant Isolated</h3>
                    <p className="text-xs font-sans text-[#FDFCFB]/70 mt-0.5">
                      Your enterprise data stays strictly in your environment. Zero public model training.
                    </p>
                  </div>
                </div>
                <span className="px-4 py-1.5 border border-[#FDFCFB] text-[10px] font-sans font-bold uppercase tracking-widest shrink-0">
                  SOC2 Type II Certified
                </span>
              </div>

            </div>
          )}

          {/* View 2: Ask NEXUS AI Chat */}
          {currentView === 'chat' && (
            <AskNexusView
              currentRole={currentRole}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              onCitationClick={setActiveCitationModal}
              isLoading={isLoadingChat}
            />
          )}

          {/* View 3: Insights & Analytics */}
          {currentView === 'insights' && <InsightsView />}

          {/* View 4: Documents Vault */}
          {currentView === 'documents' && (
            <DocumentsView
              documents={documents}
              onAddDocument={handleAddDocument}
              onSelectDocument={setActiveCitationModal}
            />
          )}

          {/* View 5: Sources & Integrations */}
          {currentView === 'sources' && (
            <SourcesView
              sources={sources}
              onToggleSync={handleToggleSyncSource}
            />
          )}

          {/* View 6: Business Impact */}
          {currentView === 'impact' && (
            <ImpactView
              onAskNexusClick={() => setCurrentView('chat')}
            />
          )}

          {/* View 7: Settings */}
          {currentView === 'settings' && (
            <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
              <div className="pb-4 border-b border-[#1A1A1A]">
                <h1 className="text-3xl font-serif font-black text-[#1A1A1A]">Platform Settings & Security</h1>
                <p className="text-xs font-sans uppercase tracking-wider text-[#1A1A1A]/60 mt-1">Configure CORE parameters, tenant boundaries, and access controls.</p>
              </div>

              <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-3">
                <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-[#1A1A1A]">Active Role Context</h2>
                <p className="text-xs text-[#1A1A1A]/80 font-serif italic">Current active persona used for AI answer filtering:</p>
                <div className="px-4 py-2 bg-[#1A1A1A] text-[#FDFCFB] text-xs font-sans font-bold uppercase tracking-wider w-fit">
                  {currentRole}
                </div>
              </div>

              <div className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] space-y-4">
                <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-[#1A1A1A]">Security & Privacy Protocol</h2>
                <ul className="space-y-3 text-xs font-sans text-[#1A1A1A]">
                  <li className="flex items-center gap-3"><Lock className="w-4 h-4 text-[#1A1A1A]" /> <span className="font-bold">AES-256</span> Cloud Encryption At-Rest & In-Transit</li>
                  <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-[#1A1A1A]" /> <span className="font-bold">Zero Model Retention</span> & Strict Tenant Isolation</li>
                  <li className="flex items-center gap-3"><Cpu className="w-4 h-4 text-[#1A1A1A]" /> Model Runtime: <span className="font-mono">Gemini 3.6 Flash</span></li>
                </ul>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* Citation Detail Modal */}
      <DocumentModal
        item={activeCitationModal}
        onClose={() => setActiveCitationModal(null)}
      />

      {/* Acronym Explanation Modal */}
      <AcronymModal
        isOpen={isAcronymModalOpen}
        onClose={() => setIsAcronymModalOpen(false)}
      />

    </div>
  );
}
