'use client';

import React from 'react';
import { Sparkles, HeartPulse, Activity, ShieldCheck, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-violet/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-brand-cyan/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & High-Impact Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-brand-cyan/40 text-xs font-semibold text-brand-cyan">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
              <span>Innovación Ecuatoriana • Desde Ibarra para todo el país</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight">
              ¿Y si pudieras{' '}
              <span className="bg-gradient-to-r from-brand-cyan via-teal-300 to-brand-violet bg-clip-text text-transparent">
                entender con Inteligencia Artificial
              </span>{' '}
              lo que tu mascota siente?
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              <strong className="text-white font-semibold">PETLINGO IA</strong> es el collar de última generación que traduce los movimientos, posturas y sonidos de tu perro o gato en estados emocionales y alertas de salud en tiempo real directamente en tu teléfono.
            </p>

            {/* Micro value points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-4 text-xs text-slate-300">
              <div className="flex items-center space-x-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>Traductor de emociones</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>Detector de ansiedad y dolor</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>GPS y salud preventiva</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#calificar"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan via-sky-400 to-brand-violet text-slate-950 font-bold text-base shadow-xl glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Calificar para Lote Preventa</span>
                <ChevronRight className="w-5 h-5" />
              </a>

              <a
                href="#como-funciona"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-petdark-850 hover:bg-petdark-800 text-slate-200 font-semibold text-base border border-slate-700/60 transition-colors"
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Ver cómo decodifica</span>
              </a>
            </div>

            {/* Trust footer */}
            <p className="text-xs text-slate-500 pt-2">
              ⭐ Cupos limitados para el primer lote en Ecuador • Asesoría personalizada por llamada o WhatsApp
            </p>
          </div>

          {/* Right Column: Interactive Tech Mockup Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md relative">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-cyan via-brand-violet to-pink-500 rounded-3xl blur-lg opacity-40 animate-pulse" />

              {/* Main Card */}
              <div className="relative glass-card rounded-2xl p-6 sm:p-7 shadow-2xl border border-white/10 space-y-6">
                
                {/* Header device status */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-slate-400">PETLINGO SENSOR • ONLINE</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                    Batería 94%
                  </span>
                </div>

                {/* Simulated Pet Profile */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-700 flex items-center justify-center text-3xl shadow-inner">
                    🐕
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Max (Golden Retriever)</h3>
                    <p className="text-xs text-slate-400">Collar Inteligente IA Mod. Alpha 1</p>
                    <span className="inline-block mt-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                      En casa • Ibarra, Ec.
                    </span>
                  </div>
                </div>

                {/* AI Emotion Decoder Widget */}
                <div className="p-4 rounded-xl bg-petdark-900/90 border border-brand-violet/30 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-brand-violet" />
                      Diagnóstico Emocional IA:
                    </span>
                    <span className="text-emerald-400 font-bold">96% Certeza</span>
                  </div>

                  <div className="p-3 rounded-lg bg-petdark-950/90 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Estado detectado</div>
                      <div className="text-base font-extrabold text-white flex items-center gap-1.5">
                        <span>🥰 Feliz y esperando paseo</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500">Nivel de estrés</div>
                      <div className="text-xs font-bold text-emerald-400">Bajo (12%)</div>
                    </div>
                  </div>

                  {/* Biometric Bars */}
                  <div className="space-y-2 pt-1 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                        <span>Ritmo Cardíaco & Respiratorio</span>
                        <span className="text-white font-mono">76 lpm (Óptimo)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-brand-cyan h-full w-[78%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                        <span>Actividad Física Diaria</span>
                        <span className="text-white font-mono">3.4 km / Meta 4.0 km</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-violet to-purple-400 h-full w-[85%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real-time alert preview */}
                <div className="p-3 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center space-x-3 text-xs text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 flex items-center justify-center shrink-0">
                    <HeartPulse className="w-4 h-4 text-brand-cyan" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Notificación preventiva:</span>
                    <p className="text-[11px] text-slate-300">Max durmió plácidamente 8 horas continuas. Comportamiento 100% estable.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
