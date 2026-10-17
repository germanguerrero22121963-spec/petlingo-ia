'use client';

import React from 'react';
import { Cpu, Smartphone, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Colócale el collar ergonómico',
      description:
        'Diseñado para perros y gatos de todos los tamaños. Resistente al agua (IP68), ultraligero e hipoalergénico.',
      icon: Activity,
      color: 'from-blue-500 to-cyan-400',
    },
    {
      step: '02',
      title: 'La IA analiza micro-movimientos y biometría',
      description:
        'Algoritmos de Machine Learning interpretan patrones de postura, rascado, respiración y ladridos o maullidos continuos.',
      icon: Cpu,
      color: 'from-brand-violet to-purple-400',
    },
    {
      step: '03',
      title: 'Traducción directa en tu celular',
      description:
        'Abre tu app de Petlingo IA y conoce con certeza si tu mascota está triste, ansiosa, con dolor o feliz de verte regresar.',
      icon: Smartphone,
      color: 'from-pink-500 to-rose-400',
    },
  ];

  return (
    <section id="como-funciona" className="py-24 relative bg-petdark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-xs font-semibold text-brand-violet">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Ciencia de Datos Aplicada a Mascotas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Cómo traduce la Inteligencia Artificial el lenguaje de tu mascota?
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Nuestros perros y gatos no pueden hablar con palabras, pero su cuerpo y sonidos comunican todo. Petlingo IA es el puente que faltaba.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative glass-card rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 group hover:-translate-y-1.5"
              >
                {/* Step number badge */}
                <span className="text-5xl font-black text-slate-800 group-hover:text-slate-700 transition-colors">
                  {item.step}
                </span>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 mt-4 mb-6 shadow-lg`}
                >
                  <div className="w-full h-full bg-petdark-950 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Callout box */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 border border-white/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">¿Quieres probar la tecnología antes de que se agote el primer lote?</h4>
            <p className="text-xs text-slate-300">Prioridad para residentes de Ibarra, Quito, Guayaquil y Cuenca.</p>
          </div>
          <a
            href="#calificar"
            className="px-6 py-3 rounded-xl bg-brand-cyan text-slate-950 font-bold text-sm hover:bg-cyan-300 transition-colors shrink-0"
          >
            Calificar mi Mascota Ahora
          </a>
        </div>

      </div>
    </section>
  );
}
