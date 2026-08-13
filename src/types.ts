export type ViewMode = 'home' | 'chat' | 'insights' | 'documents' | 'sources' | 'impact' | 'settings';

export type RolePersona = 
  | 'Executive'
  | 'Operations & Finance'
  | 'Sales & Marketing'
  | 'HR & Compliance'
  | 'Project Manager'
  | 'General Employee';

export interface SourceCitation {
  id: string;
  title: string;
  type: 'SOP' | 'Policy' | 'Contract' | 'Report' | 'ERP/CRM' | 'Database' | 'Spreadsheet';
  excerpt: string;
  confidence: number;
  lastUpdated: string;
  systemOrigin: string;
  pageOrSection?: string;
}

export interface MetricVisual {
  title: string;
  type: 'bar' | 'pie' | 'line';
  data: { label: string; value: number; secondaryValue?: number; category?: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'core';
  text: string;
  timestamp: string;
  citations?: SourceCitation[];
  metricVisual?: MetricVisual;
  recommendations?: string[];
  isStreaming?: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'SOPs' | 'Policies' | 'Contracts' | 'Reports' | 'Manuals' | 'Financials';
  fileType: 'pdf' | 'docx' | 'xlsx' | 'csv' | 'txt';
  size: string;
  lastUpdated: string;
  author: string;
  department: string;
  status: 'Indexed' | 'Syncing' | 'Restricted';
  summary: string;
  tags: string[];
  contentExcerpt: string;
}

export interface SystemSource {
  id: string;
  name: string;
  category: 'ERP' | 'CRM' | 'HR' | 'Finance' | 'Databases' | 'Spreadsheets' | 'Communications';
  status: 'Connected' | 'Syncing' | 'Disconnected' | 'Error';
  lastSync: string;
  recordsCount: number;
  description: string;
  iconName: string;
  securityLevel: 'Encrypted (AES-256)' | 'SOC2 Type II' | 'ISO 27001';
}

export interface BusinessImpactMetric {
  title: string;
  value: string;
  subtext: string;
  trend: string;
  icon: string;
}
