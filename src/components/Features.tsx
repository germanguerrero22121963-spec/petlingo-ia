'use client';

import React from 'react';
import { 
  HeartHandshake, 
  BatteryCharging, 
  Navigation, 
  ShieldAlert, 
  Stethoscope, 
  Users,
  Check
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Decodificador Emocional Multimodal',
      desc: 'Distingue entre aburrimiento, estrés por separación, euforia y tranquilidad basándose en más de 20,000 horas de entrenamiento conductual animal.',
      icon: HeartHandshake,
      badge: 'Exclusivo IA',
    },
    {
      title: 'Monitor Preventivo Veterinario',
      desc: 'Detecta sutiles cambios en el patrón de sueño, marcha o rascado excesivo antes de que se conviertan en una emergencia costosa.',
      icon: Stethoscope,
      badge: 'Salud 24/7',
    },
    {
      title: 'Localización GPS Nacional',
      desc: 'Cobertura celular en todo el territorio ecuatoriano con geovallas inteligentes. Recibe una alerta inmediata si tu mascota sale de casa.',
      icon: Navigation,
      badge: 'Anti-Extravío',
    },
    {
      title: 'Batería de Larga Duración (15 Días)',
      desc: 'Carga magnética rápida en 45 minutos. Olvídate de recargar el dispositivo todos los días.',
      icon: BatteryCharging,
      badge: 'Optimizado',
    },
    {
      title: 'Alerta Inmediata de Ansiedad',
      desc: 'Si te vas a trabajar y tu perro aúlla o destruye cosas, sabrás el momento exacto y la intensidad del episodio para intervenir.',
      icon: ShieldAlert,
      badge: 'Bienestar',
    },
    {
      title: 'Modo Familia Compartida',
      desc: 'Mamá, papá e hijos pueden tener la app sincronizada para saber quién lo paseó, cuándo comió y cómo se siente.',
      icon: Users,
      badge: 'Colaborativo',
    },
  ];

  return (
    <section id="beneficios" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-cyan text-xs font-bold tracking-widest uppercase">
            Características de Grado Tecnológico
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Más que un collar, el ángel guardián inteligente de tu mascota
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Combinamos sensores biométricos de última generación con modelos de lenguaje y visión adaptados a la etología canina y felina.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-7 hover:border-brand-cyan/40 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-petdark-800 border border-slate-700 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 py-0.5 rounded-full">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                  <Check className="w-4 h-4 text-emerald-400 mr-1.5" />
                  <span>Compatible con Android e iOS</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
