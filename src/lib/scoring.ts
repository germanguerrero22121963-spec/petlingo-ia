import { LeadAnswers, LeadTemperature } from '@/types/database';

export function calculateLeadScore(answers: LeadAnswers): {
  score: number;
  temperature: LeadTemperature;
} {
  let score = 0;

  // 1. Urgencia de compra (Max 35)
  if (answers.urgency === 'inmediato') {
    score += 35;
  } else if (answers.urgency === '15_30_dias') {
    score += 15;
  }

  // 2. Disposición de presupuesto (Max 30)
  if (answers.budgetRange === '90_140') {
    score += 30;
  } else if (answers.budgetRange === '60_89') {
    score += 15;
  }

  // 3. Nivel de dolor / problema (Max 25)
  if (answers.primaryGoal === 'ansiedad') {
    score += 25;
  } else if (answers.primaryGoal === 'salud') {
    score += 20;
  } else if (answers.primaryGoal === 'comportamiento') {
    score += 15;
  } else if (answers.primaryGoal === 'curiosidad') {
    score += 5;
  }

  // 4. Ubicación estratégica en Ecuador (Max 10)
  if (answers.city === 'ibarra' || answers.city === 'quito') {
    score += 10;
  } else if (answers.city === 'guayaquil_cuenca') {
    score += 8;
  } else {
    score += 5;
  }

  // Asignar temperatura
  let temperature: LeadTemperature = 'COLD';
  if (score >= 75) {
    temperature = 'HOT';
  } else if (score >= 45) {
    temperature = 'WARM';
  }

  return { score, temperature };
}
