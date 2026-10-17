'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MessageCircle, MapPin, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-petdark-950/90 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-petdark-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                </div>
              </div>
              <span className="text-lg font-extrabold text-white tracking-wider">
                PETLINGO <span className="text-brand-cyan">IA</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Biometría y decodificación emocional animal con Inteligencia Artificial. Desde Ibarra, Imbabura, para todo el Ecuador.
            </p>
            <div className="flex items-center space-x-2 text-slate-300 text-xs">
              <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>Ibarra, Ecuador • Envíos Servientrega</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2">
              <li><a href="#como-funciona" className="hover:text-brand-cyan transition-colors">¿Cómo Funciona?</a></li>
              <li><a href="#beneficios" className="hover:text-brand-cyan transition-colors">Tecnología & Sensores</a></li>
              <li><a href="#calificar" className="hover:text-brand-cyan transition-colors">Calificar Mi Mascota</a></li>
              <li><a href="#preguntas" className="hover:text-brand-cyan transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Legal & Compliance (LOPDP Ecuador) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal & Privacidad</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacidad" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>Política de Privacidad</span>
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-brand-cyan transition-colors text-slate-300">
                  <span>Términos y Condiciones</span>
                </Link>
              </li>
              <li className="pt-1">
                <span className="text-[10px] inline-block px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-semibold">
                  Cumple con LOPDP Ecuador
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contacto & Equipo</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://wa.me/593999999999?text=Hola,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Petlingo%20IA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp de Atención</span>
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-violet" />
                  <span>Panel Comercial (Agentes)</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-4">
          <p>© {new Date().getFullYear()} PETLINGO IA. Todos los derechos reservados. Ibarra, Ecuador.</p>
          <div className="flex items-center space-x-4 text-slate-400">
            <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad LOPDP</Link>
            <span>•</span>
            <Link href="/terminos" className="hover:text-white transition-colors">Términos de Preventa</Link>
            <span>•</span>
            <a href="#calificar" className="hover:text-white transition-colors">Lote Fundador</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
