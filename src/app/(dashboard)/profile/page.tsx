'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Save, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store';
import { useUserStats, useUpdateProfile } from '@/features/analytics/hooks/useAnalytics';

const PLAN_FEATURES: Record<string, string[]> = {
  FREE: ['10,000 tokens/month', 'Unlimited drafts', 'Basic AI rewrite'],
  PRO: ['100,000 tokens/month', 'Priority AI queue', 'Advanced templates'],
  TEAM: ['500,000 tokens/month', 'Team collaboration', 'Admin controls'],
};

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: stats } = useUserStats();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState(user?.name ?? '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar ?? null);
  const [avatarData, setAvatarData] = useState<string | undefined>(undefined);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatarPreview(user.avatar ?? null);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500_000) {
      alert('Image must be under 500KB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      setAvatarData(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaved(false);
    const payload: { name?: string; avatar?: string } = {};
    if (name.trim() !== user?.name) payload.name = name.trim();
    if (avatarData !== undefined) payload.avatar = avatarData;

    if (Object.keys(payload).length === 0) return;

    await updateProfile.mutateAsync(payload);
    setAvatarData(undefined);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const plan = stats?.plan ?? user?.plan ?? 'FREE';

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account settings.</p>
      </div>

      <Card className="border-border/60 bg-card/50">
        <CardHeader>
          <CardTitle>Personal info</CardTitle>
          <CardDescription>Update your display name and avatar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <UserIcon className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <span className="inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent transition-colors">
                  Upload avatar
                </span>
              </Label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <p className="text-xs text-muted-foreground mt-1">Max 500KB. JPG, PNG, or GIF.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-name">Display name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" value={user?.email ?? ''} disabled className="opacity-60" />
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={updateProfile.isPending}>
              {updateProfile.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save changes
            </Button>
            {saved && <span className="text-sm text-emerald-400">Saved!</span>}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/50">
        <CardHeader>
          <CardTitle>Plan — {plan}</CardTitle>
          <CardDescription>
            {stats
              ? `${stats.planUsagePercent}% of ${stats.planTokenLimit.toLocaleString()} tokens used`
              : 'Your current subscription tier.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {(PLAN_FEATURES[plan] ?? PLAN_FEATURES.FREE).map((feature) => (
              <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
