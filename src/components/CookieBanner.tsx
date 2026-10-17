'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('petlingo_cookie_consent');
      if (!consent) {
        // Small delay so it animates in smoothly
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // LocalStorage access fallback
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('petlingo_cookie_consent', 'accepted');
    } catch (e) {}
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('petlingo_cookie_consent', 'essential');
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Aviso de Cookies y Privacidad"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-slideUp"
    >
      <div className="glass-card rounded-2xl p-5 border border-slate-700/80 shadow-2xl bg-petdark-950/95 backdrop-blur-xl space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Privacidad & Cookies
              </h3>
              <p className="text-[10px] text-slate-400">
                Conforme a la LOPDP de Ecuador y estándares GDPR
              </p>
            </div>
          </div>

          <button
            onClick={handleEssentialOnly}
            className="text-slate-500 hover:text-slate-300 p-1"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Utilizamos cookies esenciales para el correcto funcionamiento del portal, seguridad de sesión y análisis anónimo de navegación. No vendemos tus datos personales. Consulta nuestra{' '}
          <Link
            href="/privacidad"
            className="text-brand-cyan hover:underline font-semibold"
          >
            Política de Privacidad
          </Link>
          .
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-brand-violet to-brand-purple hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md glow-violet transition-all text-center"
          >
            Aceptar Todas
          </button>
          <button
            onClick={handleEssentialOnly}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors"
          >
            Solo Esenciales
          </button>
        </div>
      </div>
    </aside>
  );
}
