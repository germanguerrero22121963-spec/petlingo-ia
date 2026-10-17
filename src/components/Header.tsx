'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Activity, ShieldCheck, UserCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-petdark-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-cyan" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-brand-cyan bg-clip-text text-transparent">
              PETLINGO <span className="text-brand-cyan text-sm font-black px-1.5 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/30 ml-1">IA</span>
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
              Ibarra • Ecuador
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#como-funciona" className="hover:text-brand-cyan transition-colors">
            ¿Cómo Funciona?
          </a>
          <a href="#beneficios" className="hover:text-brand-cyan transition-colors">
            Tecnología IA
          </a>
          <a href="#testimonios" className="hover:text-brand-cyan transition-colors">
            Comunidad
          </a>
          <a href="#preguntas" className="hover:text-brand-cyan transition-colors">
            FAQ
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Panel Ventas</span>
          </Link>

          <a
            href="#calificar"
            className="inline-flex items-center space-x-2 text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-violet to-brand-purple hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg glow-violet hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            <span>Acceder a Preventa</span>
          </a>
        </div>
      </div>
    </header>
  );
}
