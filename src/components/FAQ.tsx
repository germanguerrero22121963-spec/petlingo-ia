'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cómo se realizan los envíos en Ecuador?',
      a: 'Tenemos entrega personal y express el mismo día en Ibarra y Otavalo. Para Quito, Guayaquil, Cuenca y el resto de provincias, despachamos vía Servientrega con entrega garantizada en 24 a 48 horas.',
    },
    {
      q: '¿El collar es seguro para gatos?',
      a: 'Sí, totalmente. El modelo felino incorpora un broche elástico de liberación rápida (breakaway) que se abre de inmediato ante cualquier tirón o enganche fortuito en ramas o cercas, garantizando el 100% de seguridad.',
    },
    {
      q: '¿Qué precisión tiene la Inteligencia Artificial al traducir emociones?',
      a: 'Nuestro modelo ha sido entrenado con patrones validados por etólogos internacionales, logrando más del 94% de precisión en la categorización de estados de estrés, tranquilidad, dolor agudo, juego y alerta.',
    },
    {
      q: '¿Tiene costo la aplicación móvil?',
      a: 'Los compradores del Lote Preventa Fundador reciben 1 año completo de suscripción Premium a la app sin costo adicional. Luego de este periodo, la suscripción de mantenimiento en la nube es opcional y de bajo costo mensual.',
    },
    {
      q: '¿Es resistente al agua y a mordeduras?',
      a: 'Cuenta con certificación IP68 (resistente al agua, barro, lluvia y chapuzones). Los materiales son polímeros de grado aeroespacial resistentes a la fricción y mordiscos.',
    },
  ];

  return (
    <section id="preguntas" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-violet uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Todo lo que necesitas saber sobre PETLINGO IA
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-cyan transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
