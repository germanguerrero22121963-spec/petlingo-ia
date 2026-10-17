import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle2, Mail, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidad | PETLINGO IA',
  description: 'Política de Privacidad y Tratamiento de Datos Personales de Petlingo IA conforme a la LOPDP de Ecuador.',
};

export default function PrivacidadPage() {
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
            <ShieldCheck className="w-5 h-5 text-brand-cyan" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Cumplimiento LOPDP Ecuador
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* Title Section */}
        <div className="space-y-3 pb-8 border-b border-slate-800">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-xs font-bold text-brand-cyan">
            <Lock className="w-3.5 h-3.5" />
            <span>Transparencia & Seguridad Jurídica</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Política de Privacidad y Tratamiento de Datos Personales
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            En estricto cumplimiento de la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de la República del Ecuador (Registro Oficial Suplemento 459 del 26 de mayo de 2021) y estándares internacionales de privacidad.
          </p>
          <div className="text-xs text-slate-500 pt-1">
            Última actualización: <strong>Octubre de 2026</strong> • Versión 1.2
          </div>
        </div>

        {/* Section 1 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">1</span>
            Identidad y Datos del Responsable del Tratamiento
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            El responsable del tratamiento de los datos personales recopilados a través de este sitio web es el equipo de desarrollo y comercialización de <strong>PETLINGO IA</strong>, con domicilio principal en la ciudad de <strong>Ibarra, Provincia de Imbabura, República del Ecuador</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-400">
            <div className="flex items-center space-x-2 bg-petdark-900/60 p-3 rounded-xl border border-slate-800">
              <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>Sede Central: Ibarra, Imbabura, Ecuador</span>
            </div>
            <div className="flex items-center space-x-2 bg-petdark-900/60 p-3 rounded-xl border border-slate-800">
              <Mail className="w-4 h-4 text-brand-violet shrink-0" />
              <span>Canal de Privacidad: privacidad@petlingo.ia</span>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">2</span>
            Datos Personales que Recopilamos
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A través de nuestro formulario interactivo de calificación y reserva de preventa del Lote Fundador, recopilamos únicamente los datos necesarios y pertinentes:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
            <li className="flex items-start gap-2 bg-petdark-900/40 p-2.5 rounded-lg border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Datos de Contacto:</strong> Nombre y apellidos, número de teléfono/WhatsApp y correo electrónico.</span>
            </li>
            <li className="flex items-start gap-2 bg-petdark-900/40 p-2.5 rounded-lg border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Datos Geográficos:</strong> Ciudad o provincia de residencia en Ecuador para cálculo logístico de envío.</span>
            </li>
            <li className="flex items-start gap-2 bg-petdark-900/40 p-2.5 rounded-lg border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Datos de la Mascota:</strong> Nombre de la mascota, especie (perro/gato) y dolores conductuales observados.</span>
            </li>
            <li className="flex items-start gap-2 bg-petdark-900/40 p-2.5 rounded-lg border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Calificación Comercial:</strong> Nivel de urgencia, rango de presupuesto dispuesto y scoring asignado.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">3</span>
            Finalidad y Base Jurídica del Tratamiento
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            De conformidad con el <strong>Artículo 12 y 14 de la LOPDP</strong>, el tratamiento de sus datos se fundamenta en su <strong>consentimiento previo, explícito, informado e inequívoco</strong>, con las siguientes finalidades exclusivas:
          </p>
          <div className="space-y-2 text-xs text-slate-300">
            <p className="bg-petdark-900/50 p-3 rounded-xl border border-slate-800">
              <strong>A. Evaluación de Compatibilidad:</strong> Analizar las necesidades del tutor y de la mascota para determinar si la tecnología de Petlingo IA es idónea para su caso.
            </p>
            <p className="bg-petdark-900/50 p-3 rounded-xl border border-slate-800">
              <strong>B. Gestión de la Preventa y Reserva:</strong> Asignar turnos prioritarios de preventa para el Lote Fundador y coordinar entregas locales o envíos nacionales mediante Servientrega.
            </p>
            <p className="bg-petdark-900/50 p-3 rounded-xl border border-slate-800">
              <strong>C. Comunicación Directa Vía WhatsApp o Llamada:</strong> Contactar al tutor con un asesor comercial autorizado para aclarar dudas sobre especificaciones y garantías.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">4</span>
            Seguridad Técnica, Almacenamiento y Cifrado
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Aplicamos medidas de seguridad técnicas, organizativas y jurídicas del más alto estándar para proteger su información contra pérdida, alteración o acceso no autorizado:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-petdark-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-brand-cyan block">Cifrado SSL / TLS 1.3</span>
              <span className="text-slate-400">Todas las transmisiones entre su navegador y nuestros servidores están cifradas con certificados de 256 bits.</span>
            </div>
            <div className="bg-petdark-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-brand-violet block">Base de Datos Segura</span>
              <span className="text-slate-400">Alojada en Supabase (PostgreSQL Enterprise) con políticas RLS (Row Level Security) y cifrado en reposo.</span>
            </div>
            <div className="bg-petdark-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 block">Acceso Restringido</span>
              <span className="text-slate-400">Solo personal comercial debidamente autenticado bajo contraseña administrativa puede revisar los prospectos calificados.</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">5</span>
            Garantía de No Comercialización (Cero Spam)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>PETLINGO IA NO vende, no alquila, no cede ni comparte</strong> sus datos personales con terceras partes ajenas al proceso de preventa, producción y entrega. No compartimos sus datos con redes publicitarias de terceros para fines de spam masivo.
          </p>
        </section>

        {/* Section 6 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">6</span>
            Ejercicio de Derechos del Titular (Derechos ARCO)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            De acuerdo con los <strong>Artículos 21 al 27 de la LOPDP</strong>, usted tiene derecho a ejercer en cualquier momento sus facultades de:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
            <div className="bg-petdark-900/60 p-2.5 rounded-lg border border-slate-800 text-center">
              <span className="font-bold text-white block">Acceso</span>
              <span className="text-[11px] text-slate-400">Conocer qué datos suyos conservamos.</span>
            </div>
            <div className="bg-petdark-900/60 p-2.5 rounded-lg border border-slate-800 text-center">
              <span className="font-bold text-white block">Rectificación</span>
              <span className="text-[11px] text-slate-400">Actualizar datos inexactos o incompletos.</span>
            </div>
            <div className="bg-petdark-900/60 p-2.5 rounded-lg border border-slate-800 text-center">
              <span className="font-bold text-white block">Eliminación</span>
              <span className="text-[11px] text-slate-400">Solicitar la supresión total de su registro.</span>
            </div>
            <div className="bg-petdark-900/60 p-2.5 rounded-lg border border-slate-800 text-center">
              <span className="font-bold text-white block">Oposición</span>
              <span className="text-[11px] text-slate-400">Revocar el consentimiento para ser contactado.</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 pt-2">
            Para ejercer cualquiera de estos derechos, basta con enviar un mensaje de WhatsApp a nuestra línea oficial o un correo a <strong>privacidad@petlingo.ia</strong> indicando su nombre y teléfono. Su solicitud será tramitada en un plazo máximo de <strong>48 horas laborables</strong> sin costo alguno.
          </p>
        </section>

        {/* Section 7 */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs">7</span>
            Autoridad de Control
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Si considera que el tratamiento de sus datos personales infringe la normativa vigente, tiene derecho a presentar un reclamo ante la <strong>Superintendencia de Protección de Datos Personales (SPDP)</strong> de la República del Ecuador.
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
