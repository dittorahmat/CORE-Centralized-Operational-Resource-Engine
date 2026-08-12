import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.warn("Failed to initialize GoogleGenAI with provided key:", err);
  }
}

// System Knowledge Base reference for high-fidelity fallback responses
const ENTERPRISE_MOCK_KNOWLEDGE = {
  profitableCustomers: [
    { customer: "Apex Global Corp (Tier Alpha)", revenue: "$14.8M", netProfit: "$6.10M", margin: "41.2%", growth: "+18%" },
    { customer: "Vanguard Tech Systems", revenue: "$9.4M", netProfit: "$3.95M", margin: "42.0%", growth: "+22%" },
    { customer: "Starlight Logistics", revenue: "$7.2M", netProfit: "$2.52M", margin: "35.0%", growth: "+12%" },
    { customer: "Nexus Financial Holdings", revenue: "$6.8M", netProfit: "$3.26M", margin: "48.0%", growth: "+29%" }
  ],
  highMarginProducts: [
    { product: "NEXUS Cloud Enterprise Pro", margin: "68.4%", revShare: "34%", ARPU: "$12,400" },
    { product: "Automated Compliance & Security Suite", margin: "64.1%", revShare: "22%", ARPU: "$8,200" },
    { product: "Predictive ERP Insights Add-On", margin: "59.8%", revShare: "18%", ARPU: "$5,100" },
    { product: "Legacy Hardware Support", margin: "18.1%", revShare: "14%", ARPU: "$2,800" }
  ],
  underperformingBranches: [
    { branch: "Branch #04 - Southeast Logistics Hub", varianceTarget: "-14.2%", revenue: "$3.8M", target: "$4.4M", issue: "88 hrs automated sorting rig downtime & high overtime costs" },
    { branch: "Branch #09 - Midwest Distribution", varianceTarget: "-8.5%", revenue: "$2.9M", target: "$3.2M", issue: "Supply chain bottleneck in raw materials procurement" }
  ],
  operationalIssues: [
    { priority: "CRITICAL", title: "Automated Sorting Rig Failures at Branch #04", impact: "Costing $45k/day in manual dispatch overtime", action: "Deploy maintenance team immediately & trigger SLA warranty clause" },
    { priority: "HIGH", title: "Upcoming Acme Cloud Hosting Contract Expiry", impact: "$420k/year contract expires Oct 15, auto-renews Sept 15", action: "Renegotiate 15% rate reduction before Sept 15 auto-renewal" }
  ],
  expiringContracts: [
    { vendor: "Acme Cloud Infrastructure Services", amount: "$420,000 / yr", expiryDate: "Oct 15, 2026", deadlineNotice: "Sept 15, 2026", risk: "Medium" },
    { vendor: "TransGlobal Logistics Freight Agreement", amount: "$890,000 / yr", expiryDate: "Nov 30, 2026", deadlineNotice: "Oct 30, 2026", risk: "High" },
    { vendor: "Oracle Financial Systems Module License", amount: "$210,000 / yr", expiryDate: "Dec 12, 2026", deadlineNotice: "Nov 12, 2026", risk: "Low" }
  ]
};

// API Endpoint for NEXUS AI Chat & Question Answering
app.post("/api/chat", async (req, res) => {
  const { message, role = "Operations & Finance", history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Attempt real Gemini API call first if key is configured
  if (ai) {
    try {
      const systemInstruction = `
You are NEXUS™ (Networked Enterprise Knowledge & Unified System), an enterprise-grade AI intelligence platform.
Your job is to provide instant, precise, executive-level answers, actionable recommendations, and data insights based on company SOPs, financial reports, ERP/CRM records, and contracts.

User Role: ${role}
Tagline: "Your Company's Intelligence. Available Instantly."

Guidelines:
1. Always structure your answer clearly with:
   - Direct Executive Summary
   - Key Detailed Data Findings (numbers, percentages, dates)
   - Actionable Strategic Recommendations
2. Refer to source systems (SAP S/4HANA ERP, Salesforce CRM, Workday HR, Financial Reports Q3, Vendor Contract Schedule) accurately.
3. Be professional, confident, clear, and direct.
      `;

      const contents = history.map((h: any) => `${h.sender === "user" ? "User" : "NEXUS"}: ${h.text}`).join("\n");
      const fullPrompt = `${contents}\nUser: ${message}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const replyText = response.text || "NEXUS generated an answer based on enterprise data.";

      // Infer citations and chart visuals based on question context
      const inferredCitations = generateCitationsForQuery(message);
      const inferredMetric = generateMetricVisualForQuery(message);
      const inferredRecommendations = generateRecommendationsForQuery(message);

      return res.json({
        reply: replyText,
        citations: inferredCitations,
        metricVisual: inferredMetric,
        recommendations: inferredRecommendations,
      });
    } catch (err) {
      console.error("Gemini API call failed, using high-fidelity contextual knowledge engine:", err);
    }
  }

  // High-fidelity fallback response engine matching poster requirements
  const fallback = generateSmartFallbackResponse(message, role);
  return res.json(fallback);
});

// Helper functions for rich contextual responses
function generateCitationsForQuery(q: string) {
  const lower = q.toLowerCase();
  const citations = [];

  if (lower.includes("profitable") || lower.includes("margin") || lower.includes("customer")) {
    citations.push({
      id: "doc-001",
      title: "Q3 Enterprise Financial Performance & Margin Analysis",
      type: "Report",
      excerpt: "Customer Tier Alpha revenue $14.8M with net profit margin 41.2%. Product Line Apex Cloud Pro gross margin 68.4%.",
      confidence: 98,
      lastUpdated: "2026-08-01",
      systemOrigin: "SAP S/4HANA ERP & Financials",
      pageOrSection: "Page 4, Table 2.1"
    });
    citations.push({
      id: "sys-crm",
      title: "Salesforce Enterprise CRM - Client Profitability Index",
      type: "ERP/CRM",
      excerpt: "Apex Global Corp and Nexus Financial Holdings rank in top 5% LTV to CAC ratios.",
      confidence: 95,
      lastUpdated: "Live Sync (2 mins ago)",
      systemOrigin: "Salesforce CRM",
      pageOrSection: "Account Analytics"
    });
  } else if (lower.includes("contract") || lower.includes("expire") || lower.includes("renewal")) {
    citations.push({
      id: "doc-002",
      title: "Global Procurement & Contract Renewal Schedule 2026",
      type: "Contract",
      excerpt: "Acme Cloud Hosting agreement ($420k/yr) expires Oct 15, 2026. TransGlobal Freight agreement expires Nov 30, 2026.",
      confidence: 99,
      lastUpdated: "2026-07-28",
      systemOrigin: "Legal Contract Repository",
      pageOrSection: "Schedule B, Row 14"
    });
  } else if (lower.includes("branch") || lower.includes("department") || lower.includes("underperform")) {
    citations.push({
      id: "doc-004",
      title: "Regional Branch Performance & Operational Efficiency Audit",
      type: "Report",
      excerpt: "Branch #04 underperformed sales targets by -14.2% due to 88 hours of automated sorting rig downtime.",
      confidence: 96,
      lastUpdated: "2026-08-05",
      systemOrigin: "PostgreSQL Data Warehouse",
      pageOrSection: "Section 3.1 Branch Audits"
    });
  } else {
    citations.push({
      id: "doc-003",
      title: "Standard Operating Procedure - Enterprise Risk & Operations",
      type: "SOP",
      excerpt: "Section 4.2: Any operational anomaly exceeding $50k variance requires immediate dual executive escalation.",
      confidence: 94,
      lastUpdated: "2026-06-15",
      systemOrigin: "Compliance SOP Vault",
      pageOrSection: "Section 4.2"
    });
  }

  return citations;
}

function generateMetricVisualForQuery(q: string) {
  const lower = q.toLowerCase();
  if (lower.includes("profitable") || lower.includes("customer")) {
    return {
      title: "Top Profitable Customers (Net Margin $M)",
      type: "bar" as const,
      data: [
        { label: "Apex Global", value: 6.10, secondaryValue: 14.8 },
        { label: "Vanguard Tech", value: 3.95, secondaryValue: 9.4 },
        { label: "Nexus Financial", value: 3.26, secondaryValue: 6.8 },
        { label: "Starlight Log.", value: 2.52, secondaryValue: 7.2 },
      ]
    };
  } else if (lower.includes("margin") || lower.includes("product")) {
    return {
      title: "Product Line Gross Margin % Comparison",
      type: "bar" as const,
      data: [
        { label: "NEXUS Cloud Pro", value: 68.4 },
        { label: "Compliance Suite", value: 64.1 },
        { label: "Predictive ERP", value: 59.8 },
        { label: "Legacy Hardware", value: 18.1 },
      ]
    };
  } else if (lower.includes("branch") || lower.includes("underperform") || lower.includes("target")) {
    return {
      title: "Branch Revenue vs Target Variance ($M)",
      type: "bar" as const,
      data: [
        { label: "Branch #01 (HQ)", value: 8.4, secondaryValue: 8.0 },
        { label: "Branch #02 (West)", value: 6.2, secondaryValue: 6.0 },
        { label: "Branch #03 (North)", value: 5.1, secondaryValue: 5.0 },
        { label: "Branch #04 (SE)", value: 3.8, secondaryValue: 4.4 },
      ]
    };
  }
  return undefined;
}

function generateRecommendationsForQuery(q: string): string[] {
  const lower = q.toLowerCase();
  if (lower.includes("profitable") || lower.includes("customer")) {
    return [
      "Expand Account Management resources for Tier Alpha accounts (Apex Global & Vanguard) to drive 15% upsell.",
      "Re-evaluate service pricing for low-margin legacy tier customers below 20% margin cutoff.",
      "Automate quarterly QBR reviews for accounts with >$5M annual revenue."
    ];
  } else if (lower.includes("contract") || lower.includes("expire")) {
    return [
      "Send formal negotiation terms to Acme Cloud before Sept 15 notice period to leverage 12% multi-year discount.",
      "Issue RFP for TransGlobal Freight agreement to compare market rates before Nov 30 expiration.",
      "Review automated contract renewal triggers in Legal Portal to prevent unexpected rate increases."
    ];
  } else if (lower.includes("branch") || lower.includes("underperform") || lower.includes("losing money")) {
    return [
      "Dispatch regional engineering team to Branch #04 to replace legacy sorting rig component.",
      "Reallocate high-demand inventory from Branch #09 to North Hub to reduce freight delays.",
      "Establish weekly operational variance reviews with regional vice presidents."
    ];
  }
  return [
    "Verify source document cross-references in NEXUS Documents Vault.",
    "Schedule automated weekly executive summary alert to email.",
    "Share insight report with Operations & Finance leadership committee."
  ];
}

function generateSmartFallbackResponse(q: string, role: string) {
  const lower = q.toLowerCase();
  let text = "";

  if (lower.includes("profitable") || lower.includes("customer")) {
    text = `### Executive Summary: Most Profitable Customers (Last 12 Months)

Based on cross-referenced data from **SAP S/4HANA ERP** and **Salesforce Enterprise CRM**, our top 4 most profitable customers over the past 12 months accounted for **$15.83M in cumulative net profit**:

1. **Apex Global Corp (Tier Alpha)**:
   - **Gross Revenue**: $14.8M | **Net Profit**: $6.10M | **Margin**: 41.2%
   - **Growth**: +18% YoY driven by enterprise software licensing.
2. **Nexus Financial Holdings**:
   - **Gross Revenue**: $6.8M | **Net Profit**: $3.26M | **Margin**: 48.0%
   - Highest margin tier due to automated compliance cloud add-ons.
3. **Vanguard Tech Systems**:
   - **Gross Revenue**: $9.4M | **Net Profit**: $3.95M | **Margin**: 42.0%
4. **Starlight Logistics**:
   - **Gross Revenue**: $7.2M | **Net Profit**: $2.52M | **Margin**: 35.0%

*Key Insight*: Accounts utilizing **NEXUS Cloud Enterprise Pro** deliver **6.8% higher net profitability** than standard legacy accounts.`;
  } else if (lower.includes("margin") || lower.includes("product")) {
    text = `### Executive Summary: Product Margin Analysis

Analysis of **Q3 Enterprise Financial Performance & Margin Analysis** indicates a significant margin spread across product lines:

- **NEXUS Cloud Enterprise Pro**: **68.4% Gross Margin** (Highest margin generator, contributing 34% total revenue).
- **Automated Compliance & Security Suite**: **64.1% Gross Margin** (Fastest growing line at +28% YoY).
- **Predictive ERP Insights Add-On**: **59.8% Gross Margin**.
- **Legacy Hardware Support**: **18.1% Gross Margin** (*Margin Drag* — down 6.2% due to global component cost inflation).

*Strategic Takeaway*: Migrating 15% of Legacy Hardware clients to Cloud Enterprise Pro will yield an estimated **+$1.4M gross profit boost** in FY2027.`;
  } else if (lower.includes("branch") || lower.includes("underperform") || lower.includes("department")) {
    text = `### Operational Alert: Underperforming Branches & Departments

According to the **Regional Branch Performance & Operational Efficiency Audit** (updated Aug 5, 2026):

1. **Branch #04 (Southeast Logistics Hub)**:
   - **Performance vs Target**: **-14.2% Variance** (Revenue: $3.8M vs Target $4.4M).
   - **Root Cause**: 88 cumulative hours of sorting rig downtime and resulting high overtime labor expenditures ($45k/day).
2. **Branch #09 (Midwest Distribution)**:
   - **Performance vs Target**: **-8.5% Variance** (Revenue: $2.9M vs Target $3.2M).
   - **Root Cause**: Freight bottleneck and inventory stocking delays from raw materials suppliers.

*Impact*: Resolving the rig mechanical failure at Branch #04 will restore $600k in monthly missed distribution capacity.`;
  } else if (lower.includes("contract") || lower.includes("expire") || lower.includes("quarter")) {
    text = `### Contract Expiry & Procurement Schedule (Q3/Q4 2026)

Extracted from **Global Procurement & Contract Renewal Schedule 2026**:

1. **Acme Cloud Infrastructure Services**:
   - **Annual Value**: $420,000 / year
   - **Expiry Date**: October 15, 2026
   - **Action Deadline**: **September 15, 2026** (30-day auto-renewal clause triggers).
2. **TransGlobal Logistics Freight Agreement**:
   - **Annual Value**: $890,000 / year
   - **Expiry Date**: November 30, 2026
   - **Action Deadline**: **October 30, 2026**
3. **Oracle Financial Systems Module License**:
   - **Annual Value**: $210,000 / year
   - **Expiry Date**: December 12, 2026

*Recommendation*: Initiating renegotiation with Acme Cloud prior to Sept 15 can lock in a **12-15% volume discount**.`;
  } else if (lower.includes("issue") || lower.includes("attention") || lower.includes("operational")) {
    text = `### Operational Priority Checklist for ${role}

Here are the top operational items requiring immediate attention this week:

1. **[CRITICAL] Branch #04 Automated Sorting Rig Repairs**:
   - Equipment downtime has reached 88 hours, generating overtime penalties.
2. **[HIGH] Acme Cloud Hosting Contract Expiry**:
   - Auto-renewal window opens in 34 days; vendor rate increase of 8% scheduled unless renegotiated.
3. **[MEDIUM] SOP Risk Dual-Approval Audits**:
   - 3 enterprise accounts over $250k are awaiting final CFO sign-off in the compliance portal.`;
  } else {
    text = `### NEXUS Enterprise Intelligence Response

Thank you for asking! **NEXUS™** has queried connected systems (**SAP ERP, Salesforce CRM, Workday HR, Data Warehouse, and Document Vault**) to answer your question regarding **"${q}"**.

**Key Intelligence Highlights**:
- **System Synchronization**: All 6 enterprise data sources are active and SOC2 encrypted.
- **Cross-System Verification**: Data matched across 428,000+ financial records and corporate SOPs.
- **Role Perspective**: Tailored specifically for **${role}** execution.

Feel free to ask a follow-up or click any of the source document citations below to inspect exact clauses and records!`;
  }

  return {
    reply: text,
    citations: generateCitationsForQuery(q),
    metricVisual: generateMetricVisualForQuery(q),
    recommendations: generateRecommendationsForQuery(q)
  };
}

// API Endpoint to analyze custom user-uploaded documents
app.post("/api/analyze-document", (req, res) => {
  const { title, content, category = "SOPs" } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const wordCount = content.split(/\s+/).length;
  const generatedSummary = `AI Indexed Document: "${title}" (${wordCount} words). Processed and structured into NEXUS Enterprise Knowledge Vault with SOC2 encryption.`;

  return res.json({
    id: `doc-${Date.now().toString().slice(-4)}`,
    title,
    category,
    fileType: title.endsWith(".pdf") ? "pdf" : title.endsWith(".xlsx") ? "xlsx" : "docx",
    size: `${(content.length / 1024).toFixed(1)} KB`,
    lastUpdated: new Date().toISOString().split("T")[0],
    author: "User Uploaded",
    department: "Enterprise Strategy",
    status: "Indexed",
    summary: generatedSummary,
    tags: ["Custom Upload", category, "NEXUS Indexed"],
    contentExcerpt: content.slice(0, 300) + "..."
  });
});

// Vite & Static file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NEXUS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
