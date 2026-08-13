import { DocumentItem, SystemSource, BusinessImpactMetric } from '../types';

export const STARTER_QUESTIONS = [
  "What were our most profitable customers in the last 12 months?",
  "Which products or services generate the highest margins?",
  "Which branches or departments are underperforming against targets?",
  "What operational issues require my attention this week?",
  "Where are we losing money, and what should we do about it?",
  "Which contracts expire next quarter?"
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-001',
    title: 'Q3 Enterprise Financial Performance & Margin Analysis',
    category: 'Financials',
    fileType: 'pdf',
    size: '4.2 MB',
    lastUpdated: '2026-08-01',
    author: 'Finance & Controller Team',
    department: 'Finance',
    status: 'Indexed',
    summary: 'Comprehensive breakdown of gross margin by product line, customer tier profit contribution, and overhead variances.',
    tags: ['Profitability', 'Q3', 'Margins', 'Revenue'],
    contentExcerpt: 'Customer Tier Alpha accounted for $14.8M in revenue with net profit margin of 41.2%. Product Line Apex Cloud Pro yielded highest margin at 68.4%, while Legacy Hardware Support dropped to 18.1% due to supply chain inflation.'
  },
  {
    id: 'doc-002',
    title: 'Global Procurement & Contract Renewal Schedule 2026',
    category: 'Contracts',
    fileType: 'xlsx',
    size: '1.8 MB',
    lastUpdated: '2026-07-28',
    author: 'Legal & Procurement',
    department: 'Operations',
    status: 'Indexed',
    summary: 'Master repository of all vendor, client, and operational software licensing contracts expiring in Q3/Q4 2026.',
    tags: ['Contracts', 'Renewals', 'Procurement', 'Legal'],
    contentExcerpt: 'Acme Cloud Hosting agreement ($420k/yr) expires Oct 15, 2026. Vendor auto-renew clause triggers 30 days prior. Supply chain logistics contract with TransGlobal expires Nov 30, 2026.'
  },
  {
    id: 'doc-003',
    title: 'Standard Operating Procedure (SOP) - Customer Onboarding & Risk Assessment',
    category: 'SOPs',
    fileType: 'docx',
    size: '890 KB',
    lastUpdated: '2026-06-15',
    author: 'Compliance & Risk Ops',
    department: 'Compliance',
    status: 'Indexed',
    summary: 'Mandatory workflow for enterprise client KYB checks, credit limit authorizations, and legal disclosures.',
    tags: ['SOP', 'Onboarding', 'Compliance', 'Risk'],
    contentExcerpt: 'Section 4.2: Any client contract exceeding $250,000 annually requires dual-approval from CFO and Head of Legal prior to service activation.'
  },
  {
    id: 'doc-004',
    title: 'Regional Branch Performance & Operational Efficiency Audit',
    category: 'Reports',
    fileType: 'pdf',
    size: '3.5 MB',
    lastUpdated: '2026-08-05',
    author: 'Operations Strategy Group',
    department: 'Operations',
    status: 'Indexed',
    summary: 'Detailed operational audit evaluating 12 regional distribution hubs against Q2 output benchmarks.',
    tags: ['Audit', 'Branch Performance', 'Efficiency', 'Operations'],
    contentExcerpt: 'Branch #04 (Southeast Logistics Hub) underperformed sales targets by 14.2% and suffered 88 hours of unplanned downtime due to automated sorting rig failures.'
  },
  {
    id: 'doc-005',
    title: 'Enterprise Cyber Security & Data Privacy Governance Policy v4.1',
    category: 'Policies',
    fileType: 'pdf',
    size: '2.1 MB',
    lastUpdated: '2026-05-10',
    author: 'Chief Information Security Officer',
    department: 'IT Security',
    status: 'Indexed',
    summary: 'Rules governing enterprise AI data handling, tenant isolation, SOC2 encryption standards, and employee access levels.',
    tags: ['Security', 'Privacy', 'Compliance', 'SOC2'],
    contentExcerpt: 'All internal corporate data processed by CORE remains strictly within tenant-bounded private Cloud Run containers with AES-256 at-rest encryption and zero model training retention.'
  },
  {
    id: 'doc-006',
    title: 'Employee Onboarding & Knowledge Management Handbook',
    category: 'Manuals',
    fileType: 'pdf',
    size: '5.6 MB',
    lastUpdated: '2026-04-01',
    author: 'People & Culture Team',
    department: 'HR',
    status: 'Indexed',
    summary: 'Internal handbook detailing company policies, benefit packages, escalation hierarchies, and knowledge retention guidelines.',
    tags: ['HR', 'Onboarding', 'SOP', 'Benefits'],
    contentExcerpt: 'Section 8: Exit knowledge transfer mandates that all department heads document key process dependencies in the central CORE repository at least 14 days prior to handover.'
  }
];

export const INITIAL_SYSTEM_SOURCES: SystemSource[] = [
  {
    id: 'sys-erp',
    name: 'SAP S/4HANA Enterprise ERP',
    category: 'ERP',
    status: 'Connected',
    lastSync: '2 mins ago',
    recordsCount: 428190,
    description: 'Financial ledger, purchase orders, inventory levels, and asset management.',
    iconName: 'Database',
    securityLevel: 'Encrypted (AES-256)'
  },
  {
    id: 'sys-crm',
    name: 'Salesforce Enterprise CRM',
    category: 'CRM',
    status: 'Connected',
    lastSync: 'Just now',
    recordsCount: 184200,
    description: 'Customer accounts, pipeline opps, customer support tickets, and sales margins.',
    iconName: 'Users',
    securityLevel: 'SOC2 Type II'
  },
  {
    id: 'sys-hr',
    name: 'Workday HR Cloud',
    category: 'HR',
    status: 'Connected',
    lastSync: '15 mins ago',
    recordsCount: 3450,
    description: 'Org charts, employee skill matrices, headcount allocations, and training records.',
    iconName: 'UserCheck',
    securityLevel: 'ISO 27001'
  },
  {
    id: 'sys-db',
    name: 'PostgreSQL & BigQuery Warehouse',
    category: 'Databases',
    status: 'Connected',
    lastSync: '5 mins ago',
    recordsCount: 1250000,
    description: 'Unified operational data lake containing real-time transaction logs and branch metrics.',
    iconName: 'Server',
    securityLevel: 'Encrypted (AES-256)'
  },
  {
    id: 'sys-sheets',
    name: 'Google Workspace & Spreadsheets',
    category: 'Spreadsheets',
    status: 'Connected',
    lastSync: '10 mins ago',
    recordsCount: 4580,
    description: 'Departmental budget models, operational trackers, and project roadmaps.',
    iconName: 'FileSpreadsheet',
    securityLevel: 'SOC2 Type II'
  },
  {
    id: 'sys-mail',
    name: 'Enterprise Email & Communications',
    category: 'Communications',
    status: 'Connected',
    lastSync: '1 min ago',
    recordsCount: 92100,
    description: 'Executive announcements, supplier email logs, and customer communications.',
    iconName: 'Mail',
    securityLevel: 'ISO 27001'
  }
];

export const IMPACT_METRICS: BusinessImpactMetric[] = [
  {
    title: 'Time Saved',
    value: '1,840 Hours',
    subtext: 'Monthly time saved searching across fragmented tools',
    trend: '+24% vs last month',
    icon: 'Clock'
  },
  {
    title: 'Better Decisions',
    value: '4.8x Speed',
    subtext: 'Average reduction in time-to-insight for executive decisions',
    trend: '88% accuracy confidence',
    icon: 'Target'
  },
  {
    title: 'Productivity Lift',
    value: '+34%',
    subtext: 'More time spent executing high-value business goals',
    trend: 'Across 1,200+ employees',
    icon: 'TrendingUp'
  },
  {
    title: 'Knowledge Retained',
    value: '99.2%',
    subtext: 'Preserved institutional knowledge despite team transitions',
    trend: 'Zero key person dependency',
    icon: 'ShieldCheck'
  },
  {
    title: 'Compliance Rate',
    value: '100% Secure',
    subtext: 'Role-based access controls with strict tenant isolation',
    trend: 'Audited SOC2 compliant',
    icon: 'CheckCircle2'
  }
];
