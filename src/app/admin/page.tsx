'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  Snowflake, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Lock, 
  Unlock, 
  ArrowLeft, 
  RefreshCw,
  Search,
  Filter,
  Save,
  MapPin,
  Heart
} from 'lucide-react';
import { Lead, LeadStatus, LeadTemperature } from '@/types/database';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterTemp, setFilterTemp] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'B2C' | 'B2B'>('B2C');
  const [b2bLeads, setB2bLeads] = useState<any[]>([]);
  const [b2bSearch, setB2bSearch] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<{ [id: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  // Clave de acceso administrativa (configurable en producción)
  const ADMIN_PASS = 'petlingo2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASS || passwordInput.trim() === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      fetchLeads();
    } else {
      setAuthError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const [resB2c, resB2b] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/b2b-leads')
      ]);
      const dataB2c = await resB2c.json();
      if (dataB2c.leads) {
        setLeads(dataB2c.leads);
      }
      const dataB2b = await resB2b.json();
      if (dataB2b.leads) {
        setB2bLeads(dataB2b.leads);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    setSavingId(id);
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setSavingId(id);
    try {
      const notes = tempNotes[id] ?? '';
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: leads.find((l) => l.id === id)?.status || 'PENDIENTE', agent_notes: notes }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, agent_notes: notes } : l))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error('Error saving notes:', err);
    } finally {
      setSavingId(null);
    }
  };

  // Filtrado reactivo
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.pet_name && lead.pet_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTemp = filterTemp === 'ALL' || lead.temperature === filterTemp;
    const matchesStatus = filterStatus === 'ALL' || lead.status === filterStatus;

    return matchesSearch && matchesTemp && matchesStatus;
  });

  // Métricas
  const hotCount = leads.filter((l) => l.temperature === 'HOT').length;
  const warmCount = leads.filter((l) => l.temperature === 'WARM').length;
  const coldCount = leads.filter((l) => l.temperature === 'COLD').length;
  const pendingCount = leads.filter((l) => l.status === 'PENDIENTE').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-petdark-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-violet to-brand-cyan mx-auto flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-petdark-950 rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-brand-cyan" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-white">Panel Comercial</h2>
            <p className="text-xs text-slate-400">
              PETLINGO IA • Acceso exclusivo para Agentes de Ventas
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Contraseña de Acceso
              </label>
              <input
                type="password"
                required
                placeholder="Ingresa la contraseña..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-petdark-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Contraseña predeterminada: <code className="text-brand-cyan">petlingo2026</code>
              </p>
            </div>

            {authError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-violet to-brand-purple hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg glow-violet transition-all"
            >
              Ingresar al Panel
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Landing Page</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-petdark-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black text-white">PETLINGO IA</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                PANEL COMERCIAL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Priorización de llamadas por scoring de temperatura (Ibarra & Cobertura Nacional)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 text-xs bg-petdark-850 hover:bg-petdark-800 text-slate-300 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-brand-cyan' : ''}`} />
            <span>Actualizar</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-slate-400 hover:text-rose-400 px-3 py-2 rounded-xl border border-slate-800 hover:border-rose-900/50 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Tab Switcher: B2C Leads vs B2B Partners */}
      <div className="max-w-7xl mx-auto pt-6 flex items-center space-x-3">
        <button
          onClick={() => setActiveTab('B2C')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'B2C'
              ? 'bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-lg glow-violet'
              : 'bg-petdark-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Flame className="w-4 h-4 text-rose-400" />
          <span>Leads B2C Calificados ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('B2B')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'B2B'
              ? 'bg-gradient-to-r from-brand-cyan to-teal-500 text-slate-950 shadow-lg glow-cyan'
              : 'bg-petdark-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-brand-cyan" />
          <span>Veterinarias & Pet Shops B2B ({b2bLeads.length})</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 font-bold ml-1 text-brand-cyan">Apify</span>
        </button>
      </div>

      {activeTab === 'B2B' ? (
        <div className="max-w-7xl mx-auto space-y-4 pt-6">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Directorio B2B Extraído con Apify (Google Maps)</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                  {b2bLeads.length} Establecimientos
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Clínicas veterinarias y pet shops en Ibarra y Quito para acuerdos de distribución, preventa y puntos de exhibición de Petlingo IA.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar veterinaria, ciudad..."
                value={b2bSearch}
                onChange={(e) => setB2bSearch(e.target.value)}
                className="w-full bg-petdark-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {b2bLeads
              .filter((item) =>
                item.name.toLowerCase().includes(b2bSearch.toLowerCase()) ||
                item.address.toLowerCase().includes(b2bSearch.toLowerCase()) ||
                item.city.toLowerCase().includes(b2bSearch.toLowerCase())
              )
              .map((place) => {
                const cleanPhone = place.phone ? place.phone.replace(/[^0-9]/g, '') : '';
                const waNumber = cleanPhone.startsWith('0')
                  ? '593' + cleanPhone.substring(1)
                  : cleanPhone.startsWith('593')
                  ? cleanPhone
                  : '593' + cleanPhone;

                const waPitch = encodeURIComponent(
                  `Hola equipo de ${place.name}, les saludamos desde Ibarra del proyecto Petlingo IA. Desarrollamos el primer collar inteligente con IA para traducir emociones y monitorear la salud de mascotas. Nos encantaría presentarles una alianza para que sus clientes puedan conocer la tecnología en su establecimiento. ¿Tienen 2 minutos para coordinar?`
                );

                return (
                  <div
                    key={place.id}
                    className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-brand-cyan/40 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {place.category}
                        </span>
                        {place.rating && (
                          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                            ⭐ {place.rating} ({place.reviewsCount})
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white leading-snug">{place.name}</h4>

                      <p className="text-xs text-slate-400 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                        <span>{place.address}</span>
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                        <span>Teléfono:</span>
                        <span className="font-bold text-brand-cyan">{place.phone}</span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        {place.phone !== 'No disponible' ? (
                          <a
                            href={`https://wa.me/${waNumber}?text=${waPitch}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Alianza</span>
                          </a>
                        ) : null}

                        {place.googleMapsUrl && (
                          <a
                            href={place.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
                            title="Ver en Google Maps"
                          >
                            📍
                          </a>
                        )}

                        {place.website && (
                          <a
                            href={place.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-cyan text-xs border border-slate-700"
                            title="Visitar Sitio Web"
                          >
                            🌐
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <>
          {/* Metrics Bar */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
        <div className="glass-card rounded-2xl p-4 border border-rose-500/20 bg-rose-950/10">
          <div className="flex items-center justify-between text-xs text-rose-300 mb-1">
            <span className="font-bold flex items-center gap-1">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              HOT (Calientes)
            </span>
            <span className="text-[10px] uppercase font-mono">Prioridad 1</span>
          </div>
          <div className="text-3xl font-black text-white">{hotCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Llamar en menos de 15 min</p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-amber-500/20 bg-amber-950/10">
          <div className="flex items-center justify-between text-xs text-amber-300 mb-1">
            <span className="font-bold flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              WARM (Tibios)
            </span>
            <span className="text-[10px] uppercase font-mono">Prioridad 2</span>
          </div>
          <div className="text-3xl font-black text-white">{warmCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Contacto en &lt; 4 horas</p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-cyan-500/20 bg-cyan-950/10">
          <div className="flex items-center justify-between text-xs text-cyan-300 mb-1">
            <span className="font-bold flex items-center gap-1">
              <Snowflake className="w-4 h-4 text-cyan-400" />
              COLD (Fríos)
            </span>
            <span className="text-[10px] uppercase font-mono">Informativo</span>
          </div>
          <div className="text-3xl font-black text-white">{coldCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Seguimiento secundario</p>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-700 bg-slate-900/40">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span className="font-bold flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-400" />
              Pendientes
            </span>
            <span className="text-[10px] uppercase font-mono">Por atender</span>
          </div>
          <div className="text-3xl font-black text-white">{pendingCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Total sin contactar</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto glass-card rounded-2xl p-4 mb-6 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono, ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-petdark-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Filter Temperature */}
          <div className="flex items-center space-x-1 bg-petdark-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterTemp('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterTemp === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterTemp('HOT')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors ${
                filterTemp === 'HOT' ? 'bg-rose-500/20 text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🔥 Calientes
            </button>
            <button
              onClick={() => setFilterTemp('WARM')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors ${
                filterTemp === 'WARM' ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ Tibios
            </button>
          </div>

          {/* Filter Status */}
          <div className="flex items-center space-x-1 bg-petdark-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterStatus === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Estado: Todos
            </button>
            <button
              onClick={() => setFilterStatus('PENDIENTE')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterStatus === 'PENDIENTE' ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilterStatus('CONTACTADO')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterStatus === 'CONTACTADO' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Contactados
            </button>
          </div>
        </div>
      </div>

      {/* Leads Table / Feed */}
      <div className="max-w-7xl mx-auto space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No se encontraron prospectos con los filtros actuales.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const isHot = lead.temperature === 'HOT';
            const isWarm = lead.temperature === 'WARM';

            // Limpiar teléfono para WhatsApp (formato Ecuador)
            const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
            const waNumber = cleanPhone.startsWith('0')
              ? '593' + cleanPhone.substring(1)
              : cleanPhone.startsWith('593')
              ? cleanPhone
              : '593' + cleanPhone;

            const waText = encodeURIComponent(
              `Hola ${lead.full_name}, te saludamos de Petlingo IA desde Ibarra. Vimos tu solicitud de preventa para ${
                lead.pet_name ? `tu mascota ${lead.pet_name}` : 'tu mascota'
              }. ¿Tienes 2 minutos para contarte sobre los cupos disponibles?`
            );

            return (
              <div
                key={lead.id}
                className={`glass-card rounded-2xl p-5 border transition-all duration-200 ${
                  isHot
                    ? 'border-rose-500/40 bg-gradient-to-r from-rose-950/20 via-petdark-900/60 to-petdark-900/40 glow-hot'
                    : isWarm
                    ? 'border-amber-500/30 bg-gradient-to-r from-amber-950/15 via-petdark-900/60 to-petdark-900/40'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  
                  {/* Lead Info & Temperature */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Temperature Badge */}
                      <span
                        className={`text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          isHot
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                            : isWarm
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        }`}
                      >
                        {isHot && <Flame className="w-3.5 h-3.5 fill-rose-400" />}
                        {isWarm && <Zap className="w-3.5 h-3.5 fill-amber-400" />}
                        {!isHot && !isWarm && <Snowflake className="w-3.5 h-3.5" />}
                        {lead.temperature} • {lead.score} pts
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          lead.status === 'CONTACTADO'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : lead.status === 'NO_CONTACTADO'
                            ? 'bg-slate-700/50 text-slate-400 border border-slate-600'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}
                      >
                        {lead.status}
                      </span>

                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(lead.created_at).toLocaleTimeString('es-EC', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                    </div>

                    {/* Name & Contact Details */}
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {lead.full_name}
                        {lead.pet_name && (
                          <span className="text-xs font-normal text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-md border border-brand-cyan/20">
                            🐾 Mascota: {lead.pet_name} ({lead.pet_type})
                          </span>
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1 text-slate-300 font-mono">
                          <Phone className="w-3 h-3 text-brand-cyan" />
                          {lead.phone}
                        </span>
                        {lead.email && <span>{lead.email}</span>}
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-brand-violet" />
                          {lead.city.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Qualification Breakdown */}
                    {lead.answers && (
                      <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                        <span className="bg-petdark-950/80 px-2 py-0.5 rounded text-slate-300 border border-slate-800">
                          🎯 Objetivo: <strong className="text-white">{lead.answers.primaryGoal}</strong>
                        </span>
                        <span className="bg-petdark-950/80 px-2 py-0.5 rounded text-slate-300 border border-slate-800">
                          ⏱️ Urgencia: <strong className="text-white">{lead.answers.urgency}</strong>
                        </span>
                        <span className="bg-petdark-950/80 px-2 py-0.5 rounded text-slate-300 border border-slate-800">
                          💰 Presupuesto: <strong className="text-white">${lead.answers.budgetRange} USD</strong>
                        </span>
                      </div>
                    )}

                    {/* Notes Display */}
                    {lead.agent_notes && editingNotesId !== lead.id && (
                      <div className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                        <span>📝 <em className="text-slate-400">{lead.agent_notes}</em></span>
                        <button
                          onClick={() => {
                            setEditingNotesId(lead.id);
                            setTempNotes({ ...tempNotes, [lead.id]: lead.agent_notes || '' });
                          }}
                          className="text-[10px] text-brand-cyan hover:underline ml-2"
                        >
                          Editar nota
                        </button>
                      </div>
                    )}

                    {/* Notes Editor */}
                    {editingNotesId === lead.id && (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Escribe una nota interna para este prospecto..."
                          value={tempNotes[lead.id] ?? ''}
                          onChange={(e) => setTempNotes({ ...tempNotes, [lead.id]: e.target.value })}
                          className="bg-petdark-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white flex-1 focus:outline-none focus:border-brand-cyan"
                        />
                        <button
                          onClick={() => handleSaveNotes(lead.id)}
                          disabled={savingId === lead.id}
                          className="px-3 py-1.5 rounded-lg bg-brand-cyan text-slate-950 font-bold text-xs flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" />
                          <span>Guardar</span>
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="text-xs text-slate-400 hover:text-white px-2"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions Column: Call, WhatsApp, Toggle Status */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                    
                    {/* Direct Contact Buttons */}
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${waNumber}?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${lead.phone}`}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-cyan" />
                        <span>Llamar</span>
                      </a>
                    </div>

                    {/* Status Toggles */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(lead.id, 'CONTACTADO')}
                        disabled={savingId === lead.id}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                          lead.status === 'CONTACTADO'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                            : 'bg-slate-900 hover:bg-emerald-950/40 text-slate-400 hover:text-emerald-300 border border-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Contactado</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(lead.id, 'NO_CONTACTADO')}
                        disabled={savingId === lead.id}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
                          lead.status === 'NO_CONTACTADO'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 cursor-default'
                            : 'bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>No contactado</span>
                      </button>
                    </div>

                    {/* Add note toggle if no notes yet */}
                    {!lead.agent_notes && editingNotesId !== lead.id && (
                      <button
                        onClick={() => {
                          setEditingNotesId(lead.id);
                          setTempNotes({ ...tempNotes, [lead.id]: '' });
                        }}
                        className="text-[11px] text-slate-500 hover:text-brand-cyan text-right"
                      >
                        + Agregar nota comercial
                      </button>
                    )}

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>
        </>
      )}
    </div>
  );
}
