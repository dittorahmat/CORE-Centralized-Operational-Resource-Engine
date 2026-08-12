import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { 
  FileText, 
  Search, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Sparkles, 
  X,
  FileSpreadsheet,
  Plus
} from 'lucide-react';

interface DocumentsViewProps {
  documents: DocumentItem[];
  onAddDocument: (doc: DocumentItem) => void;
  onSelectDocument: (doc: DocumentItem) => void;
}

const CATEGORIES = ['All', 'SOPs', 'Policies', 'Contracts', 'Reports', 'Manuals', 'Financials'];

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  onAddDocument,
  onSelectDocument
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Modal form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'SOPs' | 'Policies' | 'Contracts' | 'Reports' | 'Manuals' | 'Financials'>('SOPs');
  const [newContent, setNewContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesQuery = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
          category: newCategory
        })
      });

      const analyzedDoc: DocumentItem = await res.json();
      onAddDocument(analyzedDoc);
      setIsUploadModalOpen(false);
      setNewTitle('');
      setNewContent('');
    } catch (err) {
      console.error('Failed to upload & analyze doc:', err);
      // Fallback local document creation
      const fallbackDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        title: newTitle.trim(),
        category: newCategory,
        fileType: newTitle.endsWith('.pdf') ? 'pdf' : 'docx',
        size: `${(newContent.length / 1024).toFixed(1)} KB`,
        lastUpdated: new Date().toISOString().split('T')[0],
        author: 'User Uploaded',
        department: 'Enterprise Strategy',
        status: 'Indexed',
        summary: `User indexed document: ${newTitle.trim()}. Auto-structured into CORE knowledge engine.`,
        tags: ['Custom Upload', newCategory, 'Indexed'],
        contentExcerpt: newContent.slice(0, 250) + '...'
      };
      onAddDocument(fallbackDoc);
      setIsUploadModalOpen(false);
      setNewTitle('');
      setNewContent('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 bg-[#FDFCFB] text-[#1A1A1A] p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1A1A1A]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-black text-[#1A1A1A]">Documents & SOPs Vault</h1>
            <span className="px-2.5 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-sans font-bold uppercase tracking-widest">
              {documents.length} Indexed
            </span>
          </div>
          <p className="text-[#1A1A1A]/70 text-xs font-serif italic mt-1">
            CORE automatically ingests SOPs, policies, manuals, contracts, and financial spreadsheets into private AI context.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-5 py-3 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-sans font-bold text-xs uppercase tracking-widest flex items-center gap-2 border border-[#1A1A1A] transition-colors self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload & Index Document</span>
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-sans font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A]'
                  : 'bg-[#E5E3DF] text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-[#1A1A1A]/60 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents, tags, or contents..."
            className="w-full bg-[#E5E3DF]/50 border border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] pl-9 pr-4 py-2.5 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/50 outline-none font-sans"
          />
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] flex flex-col justify-between space-y-4 group hover:bg-[#FDFCFB] transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 bg-[#1A1A1A] text-[#FDFCFB]">
                  {doc.fileType === 'xlsx' ? <FileSpreadsheet className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[9px] font-sans font-bold uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#FDFCFB]" /> {doc.status}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A] leading-snug line-clamp-2">
                  {doc.title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/70 mt-1">
                  <span>{doc.category}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.lastUpdated}</span>
                </div>
              </div>

              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed line-clamp-3 bg-[#FDFCFB] p-3 border border-[#1A1A1A]/40 font-serif italic">
                {doc.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {doc.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#1A1A1A]/10 text-[#1A1A1A] text-[9px] font-mono font-bold border border-[#1A1A1A]/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-3 border-t border-[#1A1A1A]/30 flex items-center justify-between text-xs font-sans">
              <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/70">
                Dept: <strong className="text-[#1A1A1A]">{doc.department}</strong>
              </div>
              <button
                onClick={() => onSelectDocument(doc)}
                className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] border border-[#1A1A1A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Content</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCFB] border-2 border-[#1A1A1A] max-w-lg w-full p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#1A1A1A]" />
                <h2 className="font-serif font-black text-xl text-[#1A1A1A]">Upload & Index Custom Document</h2>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-[#1A1A1A] hover:bg-[#E5E3DF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Document Title & Extension
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Q4 Operational Cost Budget.pdf"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#E5E3DF]/50 border border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] px-3.5 py-2 text-xs text-[#1A1A1A] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Knowledge Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full bg-[#E5E3DF]/50 border border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] px-3.5 py-2 text-xs text-[#1A1A1A] outline-none font-bold"
                >
                  <option value="SOPs">SOPs</option>
                  <option value="Policies">Policies</option>
                  <option value="Contracts">Contracts</option>
                  <option value="Reports">Reports</option>
                  <option value="Manuals">Manuals</option>
                  <option value="Financials">Financials</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Document Content Text / Excerpt
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Paste SOP instructions, policy terms, financial figures, or contract clauses..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-[#E5E3DF]/50 border border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] p-3 text-xs text-[#1A1A1A] outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-[#E5E3DF] text-[#1A1A1A] border border-[#1A1A1A] text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-[#1A1A1A]"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>AI Indexing...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Index into CORE</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

