import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { calculateLeadScore } from '@/lib/scoring';
import { Lead } from '@/types/database';

// Memoria volátil temporal en caso de que aún no se hayan pegado las claves de Supabase
let inMemoryLeads: Lead[] = [
  {
    id: 'demo-lead-1',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    full_name: 'Camila Andrade',
    email: 'camila.andrade@gmail.com',
    phone: '+593998123456',
    city: 'Ibarra',
    pet_type: 'Perro (Golden Retriever)',
    pet_name: 'Max',
    answers: {
      petType: 'perro',
      petName: 'Max',
      primaryGoal: 'ansiedad',
      urgency: 'inmediato',
      budgetRange: '90_140',
      city: 'ibarra',
    },
    score: 100,
    temperature: 'HOT',
    status: 'PENDIENTE',
    agent_notes: 'Interesada en la preventa exclusiva para Ibarra.',
  },
  {
    id: 'demo-lead-2',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    full_name: 'Santiago Morales',
    email: 'smorales.quito@hotmail.com',
    phone: '+593984567890',
    city: 'Quito',
    pet_type: 'Gato',
    pet_name: 'Luna',
    answers: {
      petType: 'gato',
      petName: 'Luna',
      primaryGoal: 'salud',
      urgency: '15_30_dias',
      budgetRange: '60_89',
      city: 'quito',
    },
    score: 60,
    temperature: 'WARM',
    status: 'CONTACTADO',
    agent_notes: 'Preguntó si el collar tiene sistema breakaway de seguridad para gatos.',
    contacted_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: 'demo-lead-3',
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    full_name: 'Valeria Cárdenas',
    email: 'valeria.c@outlook.com',
    phone: '+593991122334',
    city: 'Guayaquil',
    pet_type: 'Perro',
    answers: {
      petType: 'perro',
      primaryGoal: 'curiosidad',
      urgency: 'curioso',
      budgetRange: 'menos_50',
      city: 'guayaquil_cuenca',
    },
    score: 13,
    temperature: 'COLD',
    status: 'PENDIENTE',
  },
];

// Helper para ordenar leads: HOT primero, luego WARM, luego COLD; y por score descendente
function sortLeads(leads: Lead[]) {
  const tempWeight = { HOT: 3, WARM: 2, COLD: 1 };
  return [...leads].sort((a, b) => {
    if (tempWeight[a.temperature] !== tempWeight[b.temperature]) {
      return tempWeight[b.temperature] - tempWeight[a.temperature];
    }
    return b.score - a.score;
  });
}

// GET: Obtener lista de leads calificados
export async function GET() {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return NextResponse.json({
        leads: sortLeads(data),
        source: 'supabase',
      });
    }
  }

  return NextResponse.json({
    leads: sortLeads(inMemoryLeads),
    source: 'local_storage',
    notice: 'Usando datos locales hasta conectar credenciales de Supabase en .env',
  });
}

// POST: Registrar y calificar prospecto desde la Landing Page
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, city, pet_type, pet_name, answers } = body;

    if (!full_name || !phone || !answers) {
      return NextResponse.json(
        { error: 'Nombre, teléfono y respuestas de calificación son obligatorios' },
        { status: 400 }
      );
    }

    const { score, temperature } = calculateLeadScore(answers);

    const newLead: Lead = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead-${Date.now()}`,
      created_at: new Date().toISOString(),
      full_name,
      email: email || '',
      phone,
      city: city || answers.city || 'Ecuador',
      pet_type: pet_type || answers.petType || 'Mascota',
      pet_name: pet_name || answers.petName || '',
      answers,
      score,
      temperature,
      status: 'PENDIENTE',
    };

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('leads')
        .insert([newLead])
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, lead: data, source: 'supabase' });
      }
      console.warn('Supabase insert warning, falling back to local memory:', error?.message);
    }

    inMemoryLeads.unshift(newLead);
    return NextResponse.json({ success: true, lead: newLead, source: 'local_memory' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error procesando lead' }, { status: 500 });
  }
}

// PATCH: Actualizar estado de contacto (Contactado / No contactado) y notas
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, agent_notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID y estado son requeridos' }, { status: 400 });
    }

    const updateFields: Partial<Lead> = {
      status,
      ...(agent_notes !== undefined ? { agent_notes } : {}),
      ...(status === 'CONTACTADO' ? { contacted_at: new Date().toISOString() } : {}),
    };

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('leads')
        .update(updateFields)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, lead: data });
      }
    }

    // Actualizar en memoria
    const index = inMemoryLeads.findIndex((l) => l.id === id);
    if (index !== -1) {
      inMemoryLeads[index] = { ...inMemoryLeads[index], ...updateFields };
      return NextResponse.json({ success: true, lead: inMemoryLeads[index] });
    }

    return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error actualizando lead' }, { status: 500 });
  }
}
