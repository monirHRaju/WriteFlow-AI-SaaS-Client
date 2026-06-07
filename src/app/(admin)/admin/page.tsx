'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAnalytics } from '@/features/admin/hooks/useAdminData';
import { AnalyticsCards } from '@/features/admin/components/AnalyticsCards';

// Distinct colour palette for pie slices
const PIE_COLORS = ['#6366f1', '#22d3ee', '#a78bfa', '#34d399'];

const AGENT_LABELS: Record<string, string> = {
  DRAFT:          'Draft',
  REWRITE:        'Rewrite',
  CHAT:           'Chat',
  REVIEW_SUMMARY: 'Review',
};

export default function AdminOverviewPage() {
  const { data: analytics, isLoading, isError } = useAdminAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !analytics) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Failed to load admin analytics. Make sure you have ADMIN privileges.
      </div>
    );
  }

  const pieData = analytics.aiUsageByAgent.map((item) => ({
    name:  AGENT_LABELS[item.agentType] ?? item.agentType,
    value: item.totalRequests,
  }));

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Platform-wide stats and AI usage breakdown.
        </p>
      </div>

      {/* KPI cards */}
      <AnalyticsCards analytics={analytics} />

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Daily signups — BarChart spanning 2 cols */}
        <Card className="xl:col-span-2 border-border/60 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Daily Signups (last 30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.dailySignups.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No sign-up data in the last 30 days.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={analytics.dailySignups} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(v) => {
                      const d = new Date(v);
                      return `${d.getMonth() + 1}/${d.getDate()}`;
                    }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border:     '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    labelFormatter={(v) => `Date: ${v}`}
                    formatter={(val) => [val ?? 0, 'New users'] as [number, string]}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* AI usage by agent — PieChart */}
        <Card className="border-border/60 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base font-semibold">AI Usage by Agent</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No AI activity recorded yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background:   'hsl(var(--card))',
                      border:       '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize:     '12px',
                    }}
                    formatter={(val) => [val ?? 0, 'Requests'] as [number, string]}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Token usage table */}
      {analytics.aiUsageByAgent.length > 0 && (
        <Card className="border-border/60 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Token Consumption by Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    {['Agent', 'Requests', 'Total Tokens'].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {analytics.aiUsageByAgent.map((item) => (
                    <tr key={item.agentType} className="border-b border-border last:border-0 hover:bg-accent/20">
                      <td className="px-4 py-2.5 font-medium">
                        {AGENT_LABELS[item.agentType] ?? item.agentType}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {item.totalRequests.toLocaleString()}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {item.totalTokens.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
