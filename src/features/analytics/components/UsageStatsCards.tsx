'use client';

import React from 'react';
import { FileText, Coins, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStats } from '@/features/analytics/hooks/useAnalytics';

export function UsageStatsCards() {
  const { data: stats, isLoading, isError } = useUserStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-24" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load usage stats.
      </div>
    );
  }

  const cards = [
    {
      title: 'Total documents',
      value: stats.totalDocuments.toLocaleString(),
      icon: FileText,
      sub: 'Active documents',
    },
    {
      title: 'Total tokens used',
      value: stats.totalTokens.toLocaleString(),
      icon: Coins,
      sub: `of ${stats.planTokenLimit.toLocaleString()} ${stats.plan} limit`,
    },
    {
      title: 'Plan usage',
      value: `${stats.planUsagePercent}%`,
      icon: Gauge,
      sub: `${stats.plan} plan`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ title, value, icon: Icon, sub }) => (
        <Card key={title} className="border-border/60 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            {title === 'Plan usage' && (
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min(100, stats.planUsagePercent)}%` }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
