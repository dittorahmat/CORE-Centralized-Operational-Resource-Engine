import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, RolePersona, SourceCitation } from '../types';
import { STARTER_QUESTIONS } from '../data/initialData';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  FileText, 
  ExternalLink, 
  BarChart2, 
  CheckCircle, 
  RefreshCw, 
  Lightbulb, 
  ChevronRight,
  Copy,
  Check,
  ShieldCheck,
  HelpCircle,
  Printer,
  FileDown,
  Download,
  History,
  Search,
  Trash2,
  X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface AskNexusViewProps {
  currentRole: RolePersona;
  messages: ChatMessage[];
  onSendMessage: (query: string) => void;
  onCitationClick: (citation: SourceCitation) => void;
  isLoading: boolean;
}

interface ToastNotification {
  id: string;
  type: 'PDF' | 'TXT';
  title: string;
  message: string;
  filename: string;
  scope: string;
  timestamp: string;
}

export const AskNexusView: React.FC<AskNexusViewProps> = ({
  currentRole,
  messages,
  onSendMessage,
  onCitationClick,
  isLoading
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('core_recent_searches');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [
      "What are our Q3 gross profit margins?",
      "Show me the IT security BYOD guidelines",
      "Vendor SLA penalty clause details"
    ];
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Keep recent searches updated with user messages
  useEffect(() => {
    const userQueries = messages
      .filter((m) => m.sender === 'user')
      .map((m) => m.text.trim())
      .filter(Boolean);

    if (userQueries.length > 0) {
      setRecentSearches((prev) => {
        const combined = [...userQueries.reverse(), ...prev];
        const unique: string[] = [];
        for (const item of combined) {
          if (!unique.some((u) => u.toLowerCase() === item.toLowerCase())) {
            unique.push(item);
          }
          if (unique.length >= 5) break;
        }
        try {
          localStorage.setItem('core_recent_searches', JSON.stringify(unique));
        } catch (e) {}
        return unique;
      });
    }
  }, [messages]);

  const handleSendQuery = (query: string) => {
    if (!query.trim() || isLoading) return;
    const trimmed = query.trim();
    
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('core_recent_searches', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    onSendMessage(trimmed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    handleSendQuery(inputText.trim());
    setInputText('');
  };

  const handleStarterClick = (question: string) => {
    if (isLoading) return;
    handleSendQuery(question);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportText = (singleMessage?: ChatMessage) => {
    const targetMessages = singleMessage ? [singleMessage] : messages;
    if (targetMessages.length === 0) return;

    const currentDate = new Date().toLocaleString();
    let content = `==================================================\n`;
    content += `CORE™ ENTERPRISE INTELLIGENCE REPORT\n`;
    content += `Role Context: ${currentRole}\n`;
    content += `Generated: ${currentDate}\n`;
    content += `Scope: ${singleMessage ? 'Single Insight Response' : 'Full Conversation Thread'}\n`;
    content += `==================================================\n\n`;

    targetMessages.forEach((msg) => {
      const sender = msg.sender === 'user' ? `[USER (${currentRole})]` : `[CORE INTELLIGENCE]`;
      content += `--------------------------------------------------\n`;
      content += `${sender} - ${msg.timestamp}\n`;
      content += `--------------------------------------------------\n`;
      content += `${msg.text}\n\n`;

      if (msg.recommendations && msg.recommendations.length > 0) {
        content += `STRATEGIC ACTION RECOMMENDATIONS:\n`;
        msg.recommendations.forEach((rec, rIdx) => {
          content += `  ${rIdx + 1}. ${rec}\n`;
        });
        content += `\n`;
      }

      if (msg.citations && msg.citations.length > 0) {
        content += `VERIFIED SOURCE CITATIONS:\n`;
        msg.citations.forEach((cite) => {
          content += `  • ${cite.title} | Type: ${cite.type} | Dept: ${cite.department}\n`;
        });
        content += `\n`;
      }

      if (msg.metricVisual) {
        content += `METRIC VISUALIZATION DATA (${msg.metricVisual.title}):\n`;
        msg.metricVisual.data.forEach((d) => {
          content += `  - ${d.label}: ${d.value}${d.secondaryValue !== undefined ? ` (Secondary: ${d.secondaryValue})` : ''}\n`;
        });
        content += `\n`;
      }
    });

    content += `==================================================\n`;
    content += `CONFIDENTIAL - FOR INTERNAL ENTERPRISE USE ONLY\n`;
    content += `SOC2 Type II Certified | CORE AI Platform\n`;
    content += `==================================================\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fileName = singleMessage 
      ? `CORE_Insight_${singleMessage.id.slice(0, 6)}_${new Date().toISOString().slice(0, 10)}.txt`
      : `CORE_Conversation_${new Date().toISOString().slice(0, 10)}.txt`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportNotice(singleMessage ? 'Single insight downloaded as TXT' : 'Conversation exported as TXT');
    setToast({
      id: Date.now().toString(),
      type: 'TXT',
      title: singleMessage ? 'Insight Text Download Started' : 'Conversation Text Download Started',
      message: 'Your .txt file download has been successfully initiated by CORE.',
      filename: fileName,
      scope: singleMessage ? 'Single Insight Response' : 'Full Conversation Thread',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleExportPDF = (singleMessage?: ChatMessage) => {
    const targetMessages = singleMessage ? [singleMessage] : messages;
    if (targetMessages.length === 0) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate the PDF report.');
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CORE Executive Intelligence Report - ${currentDate}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
            
            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              color: #1a1a1a;
              background: #ffffff;
              margin: 0;
              padding: 40px;
              line-height: 1.6;
            }

            @page {
              size: A4;
              margin: 15mm;
            }

            .header {
              border-bottom: 2px solid #1a1a1a;
              padding-bottom: 16px;
              margin-bottom: 24px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }

            .brand-title {
              font-family: 'Playfair Display', serif;
              font-size: 26px;
              font-weight: 800;
              margin: 0;
              letter-spacing: -0.5px;
            }

            .brand-subtitle {
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: #666;
              margin-top: 4px;
              font-weight: 700;
            }

            .meta-box {
              text-align: right;
              font-size: 11px;
              color: #444;
            }

            .meta-tag {
              display: inline-block;
              background: #1a1a1a;
              color: #ffffff;
              padding: 3px 8px;
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 6px;
            }

            .msg-card {
              border: 1px solid #1a1a1a;
              background: #fdfcfb;
              padding: 18px;
              margin-bottom: 20px;
              page-break-inside: avoid;
            }

            .msg-header {
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: #1a1a1a;
              border-bottom: 1px solid #e5e3df;
              padding-bottom: 8px;
              margin-bottom: 12px;
              display: flex;
              justify-content: space-between;
            }

            .user-msg {
              background: #e5e3df;
              border: 1px solid #1a1a1a;
            }

            .msg-body {
              font-size: 12px;
              white-space: pre-wrap;
              line-height: 1.7;
            }

            .recommendations {
              margin-top: 14px;
              background: #f4f3f0;
              border-left: 3px solid #1a1a1a;
              padding: 12px 14px;
            }

            .recommendations h4 {
              margin: 0 0 6px 0;
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-weight: 700;
            }

            .recommendations ul {
              margin: 0;
              padding-left: 16px;
              font-size: 11px;
            }

            .citations {
              margin-top: 14px;
              border-top: 1px dashed #bbb;
              padding-top: 10px;
            }

            .citations-title {
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              font-weight: 700;
              color: #666;
              margin-bottom: 6px;
            }

            .cite-badge {
              display: inline-block;
              border: 1px solid #1a1a1a;
              padding: 2px 6px;
              font-size: 10px;
              margin-right: 6px;
              margin-bottom: 6px;
              background: #ffffff;
            }

            .metrics-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
              font-size: 11px;
            }

            .metrics-table th, .metrics-table td {
              border: 1px solid #1a1a1a;
              padding: 5px 8px;
              text-align: left;
            }

            .metrics-table th {
              background: #1a1a1a;
              color: #ffffff;
              font-size: 9px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }

            .footer {
              margin-top: 30px;
              border-top: 1px solid #1a1a1a;
              padding-top: 12px;
              font-size: 9px;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: #666;
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="brand-title">CORE Intelligence</h1>
              <div class="brand-subtitle">Enterprise Offline Review Report</div>
            </div>
            <div class="meta-box">
              <div class="meta-tag">Role: ${currentRole}</div>
              <div>Generated: ${currentDate}</div>
              <div>Classification: Strictly Confidential</div>
            </div>
          </div>

          <main>
            ${targetMessages.map((msg) => `
              <div class="msg-card ${msg.sender === 'user' ? 'user-msg' : ''}">
                <div class="msg-header">
                  <span>${msg.sender === 'user' ? `Query by ${currentRole}` : 'CORE Executive Intelligence'}</span>
                  <span>${msg.timestamp}</span>
                </div>
                <div class="msg-body">${msg.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>

                ${msg.metricVisual ? `
                  <div style="margin-top: 12px;">
                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
                      Metrics: ${msg.metricVisual.title}
                    </div>
                    <table class="metrics-table">
                      <thead>
                        <tr>
                          <th>Metric</th>
                          <th>Primary Value</th>
                          ${msg.metricVisual.data[0]?.secondaryValue !== undefined ? '<th>Secondary Value</th>' : ''}
                        </tr>
                      </thead>
                      <tbody>
                        ${msg.metricVisual.data.map(d => `
                          <tr>
                            <td>${d.label}</td>
                            <td><strong>${d.value}</strong></td>
                            ${d.secondaryValue !== undefined ? `<td>${d.secondaryValue}</td>` : ''}
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                ` : ''}

                ${msg.recommendations && msg.recommendations.length > 0 ? `
                  <div class="recommendations">
                    <h4>Strategic Recommendations</h4>
                    <ul>
                      ${msg.recommendations.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${msg.citations && msg.citations.length > 0 ? `
                  <div class="citations">
                    <div class="citations-title">Verified Sources (${msg.citations.length})</div>
                    ${msg.citations.map(c => `
                      <span class="cite-badge"><strong>${c.title}</strong> [${c.type}] - ${c.department}</span>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </main>

          <div class="footer">
            <span>SOC2 Type II Certified | CORE Enterprise System</span>
            <span>Confidential Executive Record</span>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 300);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    const fileName = singleMessage 
      ? `CORE_Insight_${singleMessage.id.slice(0, 6)}_${new Date().toISOString().slice(0, 10)}.pdf`
      : `CORE_Conversation_${new Date().toISOString().slice(0, 10)}.pdf`;

    setExportNotice(singleMessage ? 'Opening PDF Report Print Preview...' : 'Opening PDF Conversation Print Preview...');
    setToast({
      id: Date.now().toString(),
      type: 'PDF',
      title: singleMessage ? 'Insight PDF Export Started' : 'Conversation PDF Export Started',
      message: 'Your formatted executive PDF document has been created and opened.',
      filename: fileName,
      scope: singleMessage ? 'Single Insight Response' : 'Full Conversation Thread',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-[#FDFCFB] text-[#1A1A1A] overflow-hidden relative">
      
      {/* Download Started Toast Notification Overlay */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 max-w-sm w-full bg-[#1A1A1A] text-[#FDFCFB] border-2 border-[#1A1A1A] shadow-2xl p-4 animate-in slide-in-from-top-4 fade-in duration-200 font-sans">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="p-2 bg-[#FDFCFB] text-[#1A1A1A] shrink-0 mt-0.5">
                <Download className="w-5 h-5 text-[#1A1A1A] animate-bounce" />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-[#FDFCFB] text-[#1A1A1A] text-[9px] font-bold uppercase tracking-widest font-mono">
                    {toast.type} EXPORT
                  </span>
                  <span className="text-[10px] text-[#FDFCFB]/70 font-mono flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#FDFCFB]" /> Download Initiated
                  </span>
                </div>
                <h4 className="font-serif font-black text-sm text-[#FDFCFB] leading-tight">
                  {toast.title}
                </h4>
                <p className="text-xs text-[#FDFCFB]/90 leading-snug">
                  {toast.message}
                </p>
                <div className="text-[10px] font-mono text-[#FDFCFB]/70 truncate pt-0.5">
                  File: {toast.filename}
                </div>
              </div>
            </div>

            <button
              onClick={() => setToast(null)}
              className="p-1 text-[#FDFCFB]/60 hover:text-[#FDFCFB] hover:bg-[#333333] transition-colors shrink-0"
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Animated Progress Bar */}
          <div className="mt-3 w-full bg-[#333333] h-1 overflow-hidden">
            <div className="bg-[#FDFCFB] h-full animate-[pulse_1s_infinite] w-full"></div>
          </div>
        </div>
      )}
      
      {/* Top Chat Action Bar for Exporting */}
      <div className="px-4 py-3 bg-[#E5E3DF] border-b border-[#1A1A1A] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1A1A1A]"></span>
          <span className="font-serif font-bold text-sm text-[#1A1A1A]">CORE Intelligence Chat</span>
          {messages.length > 0 && (
            <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-sans font-bold uppercase tracking-wider">
              {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
            </span>
          )}
          {exportNotice && (
            <span className="px-2.5 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-sans font-bold animate-pulse">
              ✓ {exportNotice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={messages.length === 0}
            onClick={() => handleExportPDF()}
            className="px-3.5 py-1.5 bg-[#1A1A1A] hover:bg-[#333333] disabled:opacity-40 text-[#FDFCFB] text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-[#1A1A1A]"
            title="Export current conversation as a formatted PDF report for offline review"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          <button
            disabled={messages.length === 0}
            onClick={() => handleExportText()}
            className="px-3.5 py-1.5 bg-[#FDFCFB] hover:bg-[#E5E3DF] disabled:opacity-40 text-[#1A1A1A] text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-[#1A1A1A]"
            title="Export current conversation as a text file (.txt)"
          >
            <FileDown className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>Export TXT</span>
          </button>
        </div>
      </div>

      {/* Scrollable Chat / Welcome Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full">
        
        {/* Welcome Banner matching Poster Laptop View */}
        {messages.length === 0 && (
          <div className="my-6 space-y-6 text-center animate-in fade-in duration-300">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-sans font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-[#FDFCFB]" />
              <span>CORE™ AI Intelligence Engine Active</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#1A1A1A]">
                Hello! I'm <span className="underline italic">CORE</span>.
              </h1>
              <p className="text-[#1A1A1A]/80 font-serif italic text-base sm:text-lg max-w-xl mx-auto">
                Ask me anything about your company's documents, SOPs, financial metrics, contracts, and systems.
              </p>
            </div>

            {/* Poster Featured Starter Question Grid */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                <HelpCircle className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>Frequently Asked Business Questions</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {STARTER_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStarterClick(q)}
                    className="p-4 bg-[#E5E3DF] hover:bg-[#1A1A1A] hover:text-[#FDFCFB] border border-[#1A1A1A] transition-all text-xs font-serif italic flex items-start justify-between group"
                  >
                    <span className="pr-2 leading-relaxed">{q}</span>
                    <ChevronRight className="w-4 h-4 text-[#1A1A1A] group-hover:text-[#FDFCFB] group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches Section in Welcome Screen */}
            {recentSearches.length > 0 && (
              <div className="pt-3 space-y-2 border-t border-[#1A1A1A]/20">
                <div className="flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-1.5 font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                    <History className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    <span>Recent Searches ({recentSearches.length}/5)</span>
                  </div>
                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      try { localStorage.removeItem('core_recent_searches'); } catch (e) {}
                    }}
                    className="text-[10px] text-[#1A1A1A]/60 hover:text-[#1A1A1A] uppercase tracking-wider font-bold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3 text-[#1A1A1A]" />
                    <span>Clear History</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-left">
                  {recentSearches.map((sq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(sq)}
                      className="px-3.5 py-2 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-[#FDFCFB] border border-[#1A1A1A] transition-all text-xs font-serif italic flex items-center gap-2 group shadow-sm"
                      title={`Re-run recent query: "${sq}"`}
                    >
                      <Search className="w-3.5 h-3.5 text-[#1A1A1A]/60 group-hover:text-[#FDFCFB] shrink-0" />
                      <span className="truncate max-w-[280px]">"{sq}"</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#1A1A1A]/60 group-hover:text-[#FDFCFB] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Subtext info */}
            <div className="pt-4 flex items-center justify-center gap-4 text-[#1A1A1A]/60 font-sans text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" /> SOC2 Encrypted
              </span>
              <span>•</span>
              <span>Multi-Source Citations</span>
              <span>•</span>
              <span>Role Context: <strong className="text-[#1A1A1A]">{currentRole}</strong></span>
            </div>

          </div>
        )}

        {/* Conversation Thread */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            } animate-in fade-in duration-200`}
          >
            {/* Bot Avatar */}
            {msg.sender === 'core' && (
              <div className="w-9 h-9 bg-[#1A1A1A] text-[#FDFCFB] font-serif font-black flex items-center justify-center shrink-0 mt-1">
                C
              </div>
            )}

            {/* Message Bubble Content */}
            <div
              className={`max-w-3xl p-5 text-xs sm:text-sm space-y-4 ${
                msg.sender === 'user'
                  ? 'bg-[#1A1A1A] text-[#FDFCFB] font-sans font-medium'
                  : 'bg-[#E5E3DF] border border-[#1A1A1A] text-[#1A1A1A]'
              }`}
            >
              {/* Header inside bot message */}
              {msg.sender === 'core' && (
                <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]/30 text-[10px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A]/70">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1A1A1A]">CORE Intelligence</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExportPDF(msg)}
                      className="flex items-center gap-1 text-[#1A1A1A] hover:opacity-75 transition-colors"
                      title="Export single insight as PDF"
                    >
                      <Printer className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => handleExportText(msg)}
                      className="flex items-center gap-1 text-[#1A1A1A] hover:opacity-75 transition-colors"
                      title="Export single insight as TXT"
                    >
                      <FileText className="w-3 h-3" />
                      <span>TXT</span>
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="flex items-center gap-1 text-[#1A1A1A] hover:opacity-75 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#1A1A1A]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Text content with markdown styled lines */}
              <div className="space-y-2 whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </div>

              {/* Metric Chart Visualizer if attached */}
              {msg.metricVisual && (
                <div className="p-4 bg-[#FDFCFB] border border-[#1A1A1A] space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A]">
                    <span className="flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4 text-[#1A1A1A]" />
                      {msg.metricVisual.title}
                    </span>
                    <span className="text-[10px] text-[#1A1A1A]/60">Live Enterprise Metrics</span>
                  </div>
                  
                  <div className="h-48 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={msg.metricVisual.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e3df" />
                        <XAxis dataKey="label" stroke="#1a1a1a" tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} />
                        <YAxis stroke="#1a1a1a" tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a1a', color: '#fdfcfb', borderColor: '#1a1a1a', borderRadius: '0px', fontSize: '11px' }}
                        />
                        <Bar dataKey="value" fill="#1a1a1a" radius={[0, 0, 0, 0]} name="Value" />
                        {msg.metricVisual.data[0]?.secondaryValue !== undefined && (
                          <Bar dataKey="secondaryValue" fill="#666666" radius={[0, 0, 0, 0]} name="Secondary Metric" />
                        )}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Action Recommendations Card */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="p-4 bg-[#FDFCFB] border border-[#1A1A1A] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A]">
                    <Lightbulb className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    <span>CORE Strategic Action Recommendations</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#1A1A1A] font-sans">
                    {msg.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1A1A1A] shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Citations & Source Documents */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-3 border-t border-[#1A1A1A]/30 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/80">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3 text-[#1A1A1A]" /> Verified Source Citations ({msg.citations.length})
                    </span>
                    <span className="text-[#1A1A1A] font-bold">98% Confidence</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {msg.citations.map((cite) => (
                      <button
                        key={cite.id}
                        onClick={() => onCitationClick(cite)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-[#FDFCFB] border border-[#1A1A1A] text-[11px] font-sans transition-all text-left group"
                      >
                        <span className="font-bold truncate max-w-[200px]">{cite.title}</span>
                        <span className="px-1.5 py-0.2 bg-[#E5E3DF] text-[#1A1A1A] group-hover:bg-[#FDFCFB] text-[9px] font-mono font-bold">
                          {cite.type}
                        </span>
                        <ExternalLink className="w-3 h-3 text-[#1A1A1A] group-hover:text-[#FDFCFB] transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* User Avatar */}
            {msg.sender === 'user' && (
              <div className="w-9 h-9 border border-[#1A1A1A] bg-[#E5E3DF] flex items-center justify-center shrink-0 mt-1 text-[#1A1A1A] font-bold text-xs">
                <User className="w-4 h-4 text-[#1A1A1A]" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3.5 items-center animate-pulse text-xs font-sans text-[#1A1A1A]">
            <div className="w-9 h-9 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center">
              <RefreshCw className="w-4 h-4 animate-spin text-[#FDFCFB]" />
            </div>
            <span className="font-serif italic">CORE is searching company documents, SAP ERP, and contracts...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Sticky Input Bar */}
      <div className="p-4 bg-[#E5E3DF] border-t border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto space-y-2.5">
          
          {/* Quick Access Recent Searches Pill Bar */}
          {recentSearches.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans pb-1 border-b border-[#1A1A1A]/20">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 shrink-0">
                <History className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>Recent Searches:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                {recentSearches.map((search, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendQuery(search)}
                    disabled={isLoading}
                    className="px-2.5 py-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-[#FDFCFB] border border-[#1A1A1A] text-[11px] font-serif italic text-[#1A1A1A] transition-colors truncate max-w-[200px] sm:max-w-[280px] flex items-center gap-1 group"
                    title={`Click to re-run query: "${search}"`}
                  >
                    <Search className="w-3 h-3 text-[#1A1A1A]/60 group-hover:text-[#FDFCFB] shrink-0" />
                    <span className="truncate">{search}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setRecentSearches([]);
                  try { localStorage.removeItem('core_recent_searches'); } catch (e) {}
                }}
                className="text-[10px] text-[#1A1A1A]/50 hover:text-[#1A1A1A] underline uppercase tracking-wider shrink-0 font-sans"
                title="Clear recent searches history"
              >
                Clear
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your question..."
              disabled={isLoading}
              className="w-full bg-[#FDFCFB] border border-[#1A1A1A] focus:ring-2 focus:ring-[#1A1A1A] px-4 py-3 text-xs sm:text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/50 outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="absolute right-2 top-2 bottom-2 px-5 bg-[#1A1A1A] hover:bg-[#333333] disabled:opacity-40 text-[#FDFCFB] font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] font-sans text-[#1A1A1A]/60 px-1">
            <span>Asking as: <strong className="text-[#1A1A1A]">{currentRole}</strong></span>
            <span className="uppercase tracking-widest font-mono">CORE Private Cloud Run • Zero Data Retention</span>
          </div>
        </div>
      </div>

    </div>
  );
};


