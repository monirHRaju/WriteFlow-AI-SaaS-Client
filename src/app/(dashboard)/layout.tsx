'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { DashboardLayout } from '@/components/shared/DashboardLayout';

export default function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
