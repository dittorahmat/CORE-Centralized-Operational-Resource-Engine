import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  BarChart3, 
  ArrowUpRight, 
  PieChart as PieIcon,
  AlertTriangle
} from 'lucide-react';

const PROFITABILITY_DATA = [
  { name: 'Apex Global', revenue: 14.8, profit: 6.10, margin: 41.2 },
  { name: 'Vanguard Tech', revenue: 9.4, profit: 3.95, margin: 42.0 },
  { name: 'Starlight Log.', revenue: 7.2, profit: 2.52, margin: 35.0 },
  { name: 'CORE Fin.', revenue: 6.8, profit: 3.26, margin: 48.0 },
];

const PRODUCT_MARGIN_DATA = [
  { product: 'CORE Cloud Pro', margin: 68.4, target: 65.0 },
  { product: 'Compliance Suite', margin: 64.1, target: 60.0 },
  { product: 'Predictive ERP', margin: 59.8, target: 55.0 },
  { product: 'Legacy Support', margin: 18.1, target: 35.0 },
];

const BRANCH_VARIANCE_DATA = [
  { branch: 'Branch #01 HQ', actual: 8.4, target: 8.0, variance: '+5.0%' },
  { branch: 'Branch #02 West', actual: 6.2, target: 6.0, variance: '+3.3%' },
  { branch: 'Branch #03 North', actual: 5.1, target: 5.0, variance: '+2.0%' },
  { branch: 'Branch #04 SE', actual: 3.8, target: 4.4, variance: '-13.6%' },
  { branch: 'Branch #09 Midwest', actual: 2.9, target: 3.2, variance: '-9.3%' },
];

export const InsightsView: React.FC = () => {
  return (
    <div className="flex-1 bg-[#FDFCFB] text-[#1A1A1A] p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-black text-[#1A1A1A]">Executive Business Insights</h1>
          <p className="text-[#1A1A1A]/70 text-xs font-serif italic mt-1">
            Real-time analytical trends synthesized automatically from connected ERP, CRM, and financial reports.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#E5E3DF] border border-[#1A1A1A] p-1.5 text-xs font-sans font-bold uppercase tracking-wider">
          <span className="px-3 py-1 bg-[#1A1A1A] text-[#FDFCFB]">Q3 FY2026</span>
          <span className="px-3 py-1 text-[#1A1A1A]">YTD Aggregate</span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A]/60">Top Tier Net Profit</span>
            <div className="p-2 bg-[#1A1A1A] text-[#FDFCFB]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">$15.83M</div>
          <div className="text-xs font-sans font-bold text-[#1A1A1A] flex items-center gap-1 uppercase tracking-wider">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% YoY Growth
          </div>
        </div>

        <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A]/60">Average Product Margin</span>
            <div className="p-2 bg-[#1A1A1A] text-[#FDFCFB]">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">52.6%</div>
          <div className="text-xs font-sans font-bold text-[#1A1A1A] flex items-center gap-1 uppercase tracking-wider">
            <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% Above Benchmark
          </div>
        </div>

        <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A]/60">Hours Saved / Month</span>
            <div className="p-2 bg-[#1A1A1A] text-[#FDFCFB]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">1,840 Hrs</div>
          <div className="text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-wider">
            Across 1,200 employees
          </div>
        </div>

        <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A]/60">Underperforming Units</span>
            <div className="p-2 bg-[#1A1A1A] text-[#FDFCFB]">
              <AlertTriangle className="w-4 h-4 text-[#FDFCFB]" />
            </div>
          </div>
          <div className="text-3xl font-serif font-black text-[#1A1A1A]">2 Branches</div>
          <div className="text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-wider">
            Branch #04 ($600k opportunity)
          </div>
        </div>
      </div>

      {/* Chart Section 1: Customer Profitability & Margin Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Customer Profitability */}
        <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#1A1A1A]" />
                Customer Profitability ($M Revenue vs Net Profit)
              </h3>
              <p className="text-[10px] font-sans uppercase tracking-wider text-[#1A1A1A]/60">Source: SAP S/4HANA & Salesforce CRM</p>
            </div>
            <span className="text-[10px] font-sans font-bold text-[#FDFCFB] bg-[#1A1A1A] px-2.5 py-1 uppercase tracking-widest">
              Top 4 Accounts
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROFITABILITY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                <XAxis dataKey="name" stroke="#1a1a1a" tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} />
                <YAxis stroke="#1a1a1a" tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', color: '#fdfcfb', borderColor: '#1a1a1a', borderRadius: '0px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'Plus Jakarta Sans' }} />
                <Bar dataKey="revenue" fill="#1a1a1a" radius={[0, 0, 0, 0]} name="Gross Revenue ($M)" />
                <Bar dataKey="profit" fill="#888888" radius={[0, 0, 0, 0]} name="Net Profit ($M)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Gross Margin % */}
        <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-[#1A1A1A]" />
                Product Line Margin % vs Target Benchmark
              </h3>
              <p className="text-[10px] font-sans uppercase tracking-wider text-[#1A1A1A]/60">Source: Q3 Financial Performance Report</p>
            </div>
            <span className="text-[10px] font-sans font-bold text-[#FDFCFB] bg-[#1A1A1A] px-2.5 py-1 uppercase tracking-widest">
              CORE Cloud #1
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRODUCT_MARGIN_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                <XAxis type="number" stroke="#1a1a1a" tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} unit="%" />
                <YAxis dataKey="product" type="category" stroke="#1a1a1a" tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} width={110} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', color: '#fdfcfb', borderColor: '#1a1a1a', borderRadius: '0px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'Plus Jakarta Sans' }} />
                <Bar dataKey="margin" fill="#1a1a1a" radius={[0, 0, 0, 0]} name="Actual Margin %" />
                <Bar dataKey="target" fill="#888888" radius={[0, 0, 0, 0]} name="Target Benchmark %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Branch Variance Table */}
      <div className="p-6 bg-[#E5E3DF] border border-[#1A1A1A] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Regional Hub Performance Audits</h3>
            <p className="text-[10px] font-sans uppercase tracking-wider text-[#1A1A1A]/60 mt-0.5">Comparing actual Q2/Q3 revenue against baseline operational targets.</p>
          </div>
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/70">5 Hubs Tracked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans text-left text-[#1A1A1A]">
            <thead className="bg-[#1A1A1A] text-[#FDFCFB] uppercase text-[9px] tracking-widest">
              <tr>
                <th className="p-3">Branch Location</th>
                <th className="p-3">Actual Output</th>
                <th className="p-3">Target Output</th>
                <th className="p-3">Variance</th>
                <th className="p-3">Status / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/20">
              {BRANCH_VARIANCE_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FDFCFB] transition-colors">
                  <td className="p-3 font-serif font-bold text-sm text-[#1A1A1A]">{row.branch}</td>
                  <td className="p-3 font-bold text-[#1A1A1A]">${row.actual}M</td>
                  <td className="p-3 text-[#1A1A1A]/70">${row.target}M</td>
                  <td className="p-3 font-bold text-[#1A1A1A]">
                    {row.variance}
                  </td>
                  <td className="p-3">
                    {row.variance.startsWith('+') ? (
                      <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[9px] font-bold uppercase tracking-wider">
                        Meeting Goal
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#FDFCFB] text-[#1A1A1A] text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3 text-[#1A1A1A]" /> Equipment Issue
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

