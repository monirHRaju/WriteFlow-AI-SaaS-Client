'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Zap, User } from 'lucide-react';
import { Template } from '../services/templates.service';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();

  // Pick gradient visually depending on category
  const getGradientClass = (category: string) => {
    const cleanCategory = category.toLowerCase().trim();
    switch (cleanCategory) {
      case 'marketing':
        return 'from-pink-500/20 via-purple-500/10 to-transparent border-pink-500/30 text-pink-400';
      case 'writing':
      case 'content':
        return 'from-blue-500/20 via-indigo-500/10 to-transparent border-blue-500/30 text-blue-400';
      case 'development':
      case 'coding':
        return 'from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30 text-emerald-400';
      case 'seo':
        return 'from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/30 text-amber-400';
      case 'business':
        return 'from-violet-500/20 via-purple-500/10 to-transparent border-violet-500/30 text-violet-400';
      default:
        return 'from-slate-500/20 via-zinc-500/10 to-transparent border-slate-500/30 text-slate-400';
    }
  };

  const getBadgeStyle = (category: string) => {
    const cleanCategory = category.toLowerCase().trim();
    switch (cleanCategory) {
      case 'marketing':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'writing':
      case 'content':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'development':
      case 'coding':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'seo':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'business':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => router.push(`/templates/${template.slug}`)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card/65 backdrop-blur-sm cursor-pointer shadow-md transition-all hover:border-primary/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]"
    >
      {/* Top abstract graphic representation for Thumbnail */}
      <div className={`relative h-32 w-full overflow-hidden bg-gradient-to-br ${getGradientClass(template.category)} border-b border-border/50`}>
        {template.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={template.thumbnail}
            alt={template.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-radial-gradient">
            <Zap className="h-10 w-10 text-foreground/20 group-hover:text-foreground/35 transition-colors duration-300" />
          </div>
        )}
        <span className={`absolute bottom-3 left-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md uppercase tracking-wider ${getBadgeStyle(template.category)}`}>
          {template.category}
        </span>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {template.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {template.description}
        </p>

        {/* Footer Metrics Row */}
        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4 text-xs">
          {/* Star rating */}
          <div className="flex items-center gap-1.5" title={`Rated ${template.rating} out of 5`}>
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span className="font-semibold text-foreground">{template.rating.toFixed(1)}</span>
          </div>

          {/* Usage count */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="font-medium text-foreground">{template.usageCount.toLocaleString()}</span>
            <span>runs</span>
          </div>

          {/* Creator detail */}
          {template.createdBy?.name && (
            <div className="flex items-center gap-1.5 text-muted-foreground max-w-[100px] truncate">
              <User className="h-3 w-3" />
              <span className="truncate">{template.createdBy.name}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
export default TemplateCard;
