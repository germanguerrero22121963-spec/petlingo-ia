'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Heart, 
  MapPin, 
  Clock, 
  DollarSign, 
  User, 
  Phone, 
  Mail,
  Loader2
} from 'lucide-react';
import { LeadAnswers } from '@/types/database';

export default function ScoringForm() {
  const [formData, setFormData] = useState<{
    fullName: string;
    phone: string;
    email: string;
    petType: 'perro' | 'gato' | 'ambos';
    petName: string;
    primaryGoal: 'ansiedad' | 'salud' | 'comportamiento' | 'curiosidad';
    urgency: 'inmediato' | '15_30_dias' | 'curioso';
    budgetRange: '90_140' | '60_89' | 'menos_50';
    city: 'ibarra' | 'quito' | 'guayaquil_cuenca' | 'otra';
  }>({
    fullName: '',
    phone: '',
    email: '',
    petType: 'perro',
    petName: '',
    primaryGoal: 'ansiedad',
    urgency: 'inmediato',
    budgetRange: '90_140',
    city: 'ibarra',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [leadResult, setLeadResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Por favor completa tu nombre y número de WhatsApp.');
      return;
    }

    if (!acceptedTerms) {
      setErrorMsg('Debes aceptar la Política de Privacidad y el tratamiento de datos conforme a la LOPDP para continuar.');
      return;
    }

    setLoading(true);

    try {
      const answers: LeadAnswers = {
        petType: formData.petType,
        petName: formData.petName,
        primaryGoal: formData.primaryGoal,
        urgency: formData.urgency,
        budgetRange: formData.budgetRange,
        city: formData.city,
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          pet_type: formData.petType,
          pet_name: formData.petName,
          answers,
          honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }

      setLeadResult(data.lead);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calificar" className="py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-violet/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-xs font-semibold text-brand-cyan">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Calificación para Lote Fundador • Ecuador</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Descubre si PETLINGO IA es ideal para tu mascota
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Completa esta breve evaluación de 1 minuto. Nuestro algoritmo de scoring te asignará prioridad para recibir una demo y asegurar tu descuento de preventa.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 relative">
          
          {submitted ? (
            /* Success State */
            <div className="text-center py-10 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-cyan">
                  ¡Calificación Completada!
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  ¡Genial, {formData.fullName}! Has sido registrado para el lote prioritario.
                </h3>
                <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
                  Hemos evaluado el perfil de <strong className="text-white">{formData.petName || 'tu mascota'}</strong>. 
                  Un asesor comercial de Petlingo IA en Ibarra te contactará en breve al <strong>{formData.phone}</strong> para coordinar tu beneficio de preventa.
                </p>
              </div>

              {leadResult && (
                <div className="inline-flex items-center space-x-3 bg-petdark-900 border border-slate-700 px-5 py-3 rounded-2xl text-xs text-slate-300">
                  <span>Prioridad asignada:</span>
                  <span
                    className={`font-black px-2.5 py-0.5 rounded-full ${
                      leadResult.temperature === 'HOT'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : leadResult.temperature === 'WARM'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}
                  >
                    {leadResult.temperature === 'HOT'
                      ? '🔥 ALTA PRIORIDAD'
                      : leadResult.temperature === 'WARM'
                      ? '⚡ PRIORIDAD MEDIA'
                      : '❄️ LISTA DE ESPERA'}
                  </span>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      petType: 'perro',
                      petName: '',
                      primaryGoal: 'ansiedad',
                      urgency: 'inmediato',
                      budgetRange: '90_140',
                      city: 'ibarra',
                    });
                  }}
                  className="text-xs text-slate-400 underline hover:text-white"
                >
                  Registrar otra mascota o consultar otro perfil
                </button>
              </div>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Trampa Honeypot invisible para humanos, trampa para bots */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Bloque 1: Perfil de la Mascota */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-2">
                  <Heart className="w-4 h-4 text-brand-cyan" />
                  1. Datos de tu Mascota
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      ¿Qué tipo de mascota tienes?
                    </label>
                    <select
                      value={formData.petType}
                      onChange={(e) => setFormData({ ...formData, petType: e.target.value as any })}
                      className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan"
                    >
                      <option value="perro">🐶 Perro</option>
                      <option value="gato">🐱 Gato</option>
                      <option value="ambos">🐕🐈 Tengo ambos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Nombre de tu mascota (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Max, Luna, Toby..."
                      value={formData.petName}
                      onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                </div>
              </div>

              {/* Bloque 2: Preguntas de Scoring y Calificación */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-violet flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-violet" />
                  2. Calificación de Necesidad & Urgencia
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pregunta A: Dolor / Objetivo */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      ¿Qué es lo más importante que buscas saber?
                    </label>
                    <select
                      value={formData.primaryGoal}
                      onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value as any })}
                      className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet"
                    >
                      <option value="ansiedad">Si sufre ansiedad cuando se queda solo (25 pts)</option>
                      <option value="salud">Detectar dolores o monitorear salud preventiva (20 pts)</option>
                      <option value="comportamiento">Corregir comportamientos y estrés (15 pts)</option>
                      <option value="curiosidad">Simple curiosidad por la tecnología (5 pts)</option>
                    </select>
                  </div>

                  {/* Pregunta B: Urgencia */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      ¿Cuándo te gustaría recibir Petlingo IA?
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                      className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet"
                    >
                      <option value="inmediato">De inmediato / Reservar primer lote (35 pts)</option>
                      <option value="15_30_dias">En las próximas semanas (15 pts)</option>
                      <option value="curioso">Aún no estoy seguro, solo me informo (0 pts)</option>
                    </select>
                  </div>

                  {/* Pregunta C: Presupuesto */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Rango de inversión dispuesto para collar + app:
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value as any })}
                      className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet"
                    >
                      <option value="90_140">$90 a $140 USD (Gama Alta / Edición Fundador) (30 pts)</option>
                      <option value="60_89">$60 a $89 USD (Edición Estándar) (15 pts)</option>
                      <option value="menos_50">Menos de $50 USD (0 pts)</option>
                    </select>
                  </div>

                  {/* Pregunta D: Ciudad */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      ¿En qué ciudad te encuentras?
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value as any })}
                      className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet"
                    >
                      <option value="ibarra">📍 Ibarra / Otavalo (Imbabura - Entrega Inmediata)</option>
                      <option value="quito">📍 Quito / Valles (Pichincha)</option>
                      <option value="guayaquil_cuenca">📍 Guayaquil / Cuenca</option>
                      <option value="otra">📍 Otra provincia (Envío Servientrega)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bloque 3: Datos de Contacto del Tutor */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  3. ¿Dónde te enviamos la confirmación?
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Tu Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Lenin Castillo"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 0991234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Correo Electrónico (Opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Bloque 4: Consentimiento Informado LOPDP */}
              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-start space-x-3 text-xs text-slate-300 cursor-pointer select-none bg-petdark-900/40 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-petdark-950 text-brand-cyan focus:ring-brand-cyan focus:ring-offset-petdark-950 accent-cyan-500 shrink-0 cursor-pointer"
                  />
                  <span className="leading-relaxed">
                    He leído y acepto la{' '}
                    <Link href="/privacidad" target="_blank" className="text-brand-cyan hover:underline font-bold">
                      Política de Privacidad
                    </Link>{' '}
                    y los{' '}
                    <Link href="/terminos" target="_blank" className="text-brand-cyan hover:underline font-bold">
                      Términos de Preventa
                    </Link>
                    . Autorizo el tratamiento de mis datos personales para ser contactado sobre mi cupo en Petlingo IA de conformidad con la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de Ecuador.
                  </span>
                </label>
              </div>

              {/* Mensaje de error si falla validación */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Botón de Enviar */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-brand-cyan via-teal-400 to-brand-violet text-slate-950 font-extrabold text-base shadow-xl glow-cyan hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Evaluando perfil y scoring...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Calificar y Reservar Mi Cupo de Preventa</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  🔒 Tus datos están protegidos. Sin spam. Solo te contactaremos para confirmar tu beneficio exclusivo.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
