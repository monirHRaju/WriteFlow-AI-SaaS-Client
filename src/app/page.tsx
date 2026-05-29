import React from 'react';
import { Sparkles, Bot, ArrowRight, Zap, FileText } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col justify-center items-center px-4 py-16">
      {/* 1. Glassmorphic Radial Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 2. Premium Animated Hook Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/10 bg-primary/5 text-primary text-sm font-medium mb-8 z-10 backdrop-blur-sm">
        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
        <span className="tracking-wide uppercase text-xs text-muted-foreground font-semibold">
          Collaborative Agent Ecosystem
        </span>
      </div>

      {/* 3. Sleek Typography Header */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-center max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/40 mb-6 leading-[1.1] z-10">
        WriteFlow AI
      </h1>

      {/* 4. Description Subtitle */}
      <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-12 leading-relaxed z-10">
        A premium multi-role SaaS content workspace powered by cooperative AI agents. Structure blog outliners, compose drafts, optimize SEO performance, and manage editorial reviews instantly.
      </p>

      {/* 5. Dynamic Interactive Call to Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-20 z-10">
        <button className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-foreground/5">
          <span>Enter Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-border bg-accent/10 font-semibold hover:bg-accent/25 active:scale-[0.98] transition-all duration-200 cursor-pointer backdrop-blur-sm">
          <span>Explore Agent Templates</span>
        </button>
      </div>

      {/* 6. Feature Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full z-10">
        {/* Outline Card */}
        <div className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md hover:border-primary/15 hover:bg-card/75 transition-all duration-300 group cursor-default">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 group-hover:bg-blue-500/15 transition-all duration-300">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">
            Agentic Outlining
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Collaborate with structured prompt engines to draft blueprints, headings, and semantic outlines automatically.
          </p>
        </div>

        {/* Rewrite Card */}
        <div className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md hover:border-primary/15 hover:bg-card/75 transition-all duration-300 group cursor-default">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 group-hover:bg-purple-500/15 transition-all duration-300">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">
            Intelligent Rewriter
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Optimize tone, readability levels, keyword density, and flow layout in a single click with custom agency instructions.
          </p>
        </div>

        {/* Analytics Card */}
        <div className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md hover:border-primary/15 hover:bg-card/75 transition-all duration-300 group cursor-default">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 group-hover:bg-emerald-500/15 transition-all duration-300">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">
            Unified Analytics
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Track token expenditures, active team subscriptions, custom templates, and user approval ratings on real-time dashboards.
          </p>
        </div>
      </div>
    </main>
  );
}
