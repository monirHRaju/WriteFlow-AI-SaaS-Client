'use client';

import React from 'react';
import { Loader2, Bot } from 'lucide-react';
import { useAiLogs } from '@/features/analytics/hooks/useAnalytics';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const AGENT_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  REWRITE: 'Rewrite',
  CHAT: 'Chat',
  REVIEW_SUMMARY: 'Review',
};

export function AiLogsTable() {
  const { data: logs, isLoading, isError } = useAiLogs(10);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive py-4">Failed to load AI activity.</p>
    );
  }

  if (!logs?.length) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <Bot className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No AI activity yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/30 border-b border-border">
          <tr>
            <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">
              Agent
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">
              Tokens
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b border-border last:border-0 hover:bg-accent/20">
              <td className="px-4 py-2.5 font-medium">
                {AGENT_LABELS[log.agentType] ?? log.agentType}
              </td>
              <td className="px-4 py-2.5 text-muted-foreground">
                {log.tokensUsed.toLocaleString()}
              </td>
              <td className="px-4 py-2.5 text-muted-foreground hidden sm:table-cell">
                {formatDate(log.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
