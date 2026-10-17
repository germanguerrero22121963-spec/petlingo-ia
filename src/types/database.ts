export type LeadTemperature = 'HOT' | 'WARM' | 'COLD';
export type LeadStatus = 'PENDIENTE' | 'CONTACTADO' | 'NO_CONTACTADO';

export interface LeadAnswers {
  petType: 'perro' | 'gato' | 'ambos';
  petName?: string;
  primaryGoal: 'ansiedad' | 'salud' | 'comportamiento' | 'curiosidad';
  urgency: 'inmediato' | '15_30_dias' | 'curioso';
  budgetRange: '90_140' | '60_89' | 'menos_50';
  city: 'ibarra' | 'quito' | 'guayaquil_cuenca' | 'otra';
}

export interface Lead {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  pet_type: string;
  pet_name?: string;
  answers: LeadAnswers;
  score: number;
  temperature: LeadTemperature;
  status: LeadStatus;
  agent_notes?: string;
  contacted_at?: string;
}
