'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Dra. Andrea Villar',
      role: 'Médica Veterinaria (Ibarra)',
      comment:
        'Como veterinaria, el mayor reto es que los dueños llegan cuando la enfermedad ya está avanzada. Un collar que detecta alteraciones en el ritmo de descanso y niveles de dolor tempranos es un cambio total de paradigma.',
      avatar: '🩺',
      tag: 'Validación Veterinaria',
    },
    {
      name: 'Carlos & "Apolo"',
      role: 'Tutor de Husky Siberiano (Quito)',
      comment:
        'Apolo aullaba cuando me iba a la oficina y los vecinos se quejaban. Con Petlingo IA pude ver que su pico de ansiedad ocurría a los 20 minutos de mi salida. Pudimos aplicar pautas y ahora monitoreo que descansa tranquilo.',
      avatar: '🐕',
      tag: 'Caso de Éxito',
    },
    {
      name: 'Sofía & "Mishi"',
      role: 'Tutora de Gata Rescatada (Ibarra)',
      comment:
        'Los gatos ocultan el dolor por instinto. El collar me avisó de una disminución drástica en su actividad y resultó ser una infección urinaria en etapa inicial. Literalmente le salvó la vida.',
      avatar: '🐱',
      tag: 'Detección Temprana',
    },
  ];

  return (
    <section id="testimonios" className="py-24 bg-petdark-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-cyan uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-brand-cyan text-brand-cyan" />
            <span>Confianza y Respaldo Comunitario</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Lo que dicen tutores y profesionales en Ecuador
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-7 relative flex flex-col justify-between hover:border-slate-600 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.tag}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <Quote className="w-6 h-6 text-brand-violet/40 mb-3" />

                <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-petdark-800 border border-slate-700 flex items-center justify-center text-xl">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
