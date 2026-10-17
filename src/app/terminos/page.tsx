import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, ShieldCheck, AlertTriangle, Truck, RefreshCw, FileText } from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones | PETLINGO IA',
  description: 'Términos y condiciones de uso, reserva de preventa y garantías de Petlingo IA en Ecuador.',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-petdark-950 text-slate-200">
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-petdark-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-brand-cyan" />
            <span>Volver a Petlingo IA</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-brand-cyan" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Términos Legales & Preventa
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* Title Section */}
        <div className="space-y-3 pb-8 border-b border-slate-800">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-xs font-bold text-brand-cyan">
            <Scale className="w-3.5 h-3.5" />
            <span>Marco Contractual Transparente</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Términos y Condiciones de Uso y Preventa
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Reglas de uso del sitio web, proceso de calificación de prospectos, condiciones de reserva del Lote Fundador y políticas de garantía en Ecuador.
          </p>
          <div className="text-xs text-slate-500 pt-1">
            Última actualización: <strong>Octubre de 2026</strong> • Versión 1.2
          </div>
        </div>

        {/* Section 1 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">1</span>
            Objeto y Aceptación
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            El presente documento regula el acceso, navegación y uso del portal web de <strong>PETLINGO IA</strong>, así como el proceso voluntario de registro, calificación de necesidades y reserva de unidades de preventa correspondientes al Lote Fundador en el territorio de la República del Ecuador.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            El envío de sus datos mediante el formulario de calificación implica la lectura, comprensión y aceptación integral de estos términos.
          </p>
        </section>

        {/* Section 2: Medical / Vet Disclaimer (CRITICAL FOR LIABILITY) */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-amber-500/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h2 className="text-lg font-bold text-white">
              2. Descargo de Responsabilidad Médica Veterinaria
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            El collar <strong>PETLINGO IA</strong> y su aplicación móvil complementaria son herramientas tecnológicas diseñadas para el <strong>monitoreo conductual, biometría preventiva y estimación de patrones emocionales</strong> en perros y gatos.
          </p>
          <div className="bg-petdark-950/80 p-4 rounded-xl border border-amber-500/20 text-xs text-amber-200 leading-relaxed space-y-1.5">
            <p>
              ⚠️ <strong>AVISO IMPORTANTE:</strong> Petlingo IA <strong>NO ES UN DISPOSITIVO DE DIAGNÓSTICO MÉDICO NI SUSTITUYE EL JUICIO DE UN MÉDICO VETERINARIO PROFESIONAL</strong>. 
            </p>
            <p>
              Ante cualquier signo de enfermedad aguda, dolor severo, sangrado, letargia extrema o emergencia, el tutor debe acudir inmediatamente a una clínica u hospital veterinario presencial.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">3</span>
            Programa de Calificación y Preventa (Lote Fundador)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            El registro en el formulario de la página web no constituye un cobro inmediato en tarjeta ni una compra obligatoria. Funciona como un <strong>sistema de calificación y reserva de cupo preferencial</strong>:
          </p>
          <ul className="space-y-2 text-xs text-slate-300 pt-1">
            <li className="flex items-start gap-2 bg-petdark-900/40 p-2.5 rounded-lg border border-slate-800">
              <span className="text-brand-cyan font-bold">•</span>
              <span><strong>Prioridad por Temperatura (Scoring):</strong> Los prospectos de alta urgencia y compromiso reciben asignación prioritaria en las primeras 50 unidades de manufactura.</span>
            </li>
            <li className="flex items-start gap-2 bg-petdark-900/40 p-2.5 rounded-lg border border-slate-800">
              <span className="text-brand-cyan font-bold">•</span>
              <span><strong>Confirmación Humana:</strong> Todo pedido es validado individualmente por un asesor autorizado de Petlingo IA en Ibarra vía WhatsApp o llamada telefónica antes de solicitar cualquier anticipo o despacho.</span>
            </li>
            <li className="flex items-start gap-2 bg-petdark-900/40 p-2.5 rounded-lg border border-slate-800">
              <span className="text-brand-cyan font-bold">•</span>
              <span><strong>Precios y Moneda:</strong> Todos los valores informados en el sitio están expresados en <strong>Dólares de los Estados Unidos de América (USD)</strong>, moneda de curso legal en la República del Ecuador.</span>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand-cyan shrink-0" />
            4. Envíos y Tiempos de Entrega en Ecuador
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Las entregas en la ciudad de <strong>Ibarra y Otavalo</strong> se coordinan con entrega personal y asistencia de configuración inicial. Para las demás provincias (Quito, Guayaquil, Cuenca, etc.), los envíos se efectúan a través de <strong>Servientrega</strong> con guía rastreable y seguro de transporte.
          </p>
        </section>

        {/* Section 5 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-400 shrink-0" />
            5. Garantía de Hardware y Política de Devoluciones
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            De acuerdo con la <strong>Ley Orgánica de Defensa del Consumidor del Ecuador</strong>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
            <div className="bg-petdark-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Garantía Técnica de 1 Año</span>
              <span className="text-slate-400">Cubre defectos de fabricación en componentes electrónicos, sensores y microprocesador del collar. No cubre daños por mordeduras o sumersión indebida sin sellado.</span>
            </div>
            <div className="bg-petdark-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Derecho de Retracto (30 días)</span>
              <span className="text-slate-400">Si el collar no se adapta al cuello de su mascota o no cumple sus expectativas técnicas, el tutor tiene derecho a la devolución del importe conforme a la ley.</span>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">6</span>
            Propiedad Intelectual
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            La marca <strong>PETLINGO IA</strong>, logotipos, interfaces gráficas, código fuente, algoritmos de puntuación y modelos de traducción emocional son propiedad intelectual exclusiva debidamente protegida bajo la legislación ecuatoriana (Código Orgánico de la Economía Social de los Conocimientos, Creatividad e Innovación - Código Ingenios) y tratados internacionales administrados por la OMPI.
          </p>
        </section>

        {/* Section 7 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">7</span>
            Legislación Aplicable y Fuero Judicial
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Estos términos se rigen por las leyes vigentes de la <strong>República del Ecuador</strong>. Para la resolución de cualquier controversia derivada del uso de este portal o de la adquisición de productos, las partes se someten a la jurisdicción de los tribunales competentes del cantón <strong>Ibarra, Provincia de Imbabura</strong>.
          </p>
        </section>

        {/* Back Button */}
        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-violet to-brand-purple hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg glow-violet transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Regresar a la Página Principal</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
