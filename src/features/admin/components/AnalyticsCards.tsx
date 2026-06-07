'use client';

import React from 'react';
import { Users, FileText, Coins, LayoutTemplate } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminAnalytics } from '../types/admin.types';

type Props = {
  analytics: AdminAnalytics;
};

export function AnalyticsCards({ analytics }: Props) {
  const cards = [
    {
      title: 'Total Users',
      value: analytics.totalUsers.toLocaleString(),
      icon:  Users,
      desc:  'Registered accounts',
    },
    {
      title: 'Total Documents',
      value: analytics.totalDocuments.toLocaleString(),
      icon:  FileText,
      desc:  'All user documents',
    },
    {
      title: 'Tokens Used',
      value: analytics.totalTokensUsed.toLocaleString(),
      icon:  Coins,
      desc:  'Across all AI calls',
    },
    {
      title: 'Templates',
      value: analytics.totalTemplates.toLocaleString(),
      icon:  LayoutTemplate,
      desc:  'Published + drafts',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ title, value, icon: Icon, desc }) => (
        <Card key={title} className="border-border/60 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
