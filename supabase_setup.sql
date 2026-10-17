-- ==============================================================================
-- SCRIPT DE INICIALIZACIÓN DE SUPABASE: PETLINGO IA
-- Copia y pega este contenido en el SQL Editor de tu proyecto en Supabase
-- ==============================================================================

-- 1. Tipos enumerados para Temperatura y Estado de Gestión Comercial
DO $$ BEGIN
    CREATE TYPE lead_temperature AS ENUM ('HOT', 'WARM', 'COLD');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM ('PENDIENTE', 'CONTACTADO', 'NO_CONTACTADO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Tabla de Leads Calificados
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Datos del Tutor y Mascota
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Ibarra',
    pet_type TEXT NOT NULL,
    pet_name TEXT,
    
    -- Scoring y Calificación con IA
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    score INTEGER NOT NULL DEFAULT 0,
    temperature lead_temperature NOT NULL DEFAULT 'COLD',
    
    -- Gestión Comercial del Vendedor
    status lead_status NOT NULL DEFAULT 'PENDIENTE',
    agent_notes TEXT,
    contacted_at TIMESTAMP WITH TIME ZONE
);

-- 3. Índices para acelerar la vista del Panel de Ventas (HOT arriba)
CREATE INDEX IF NOT EXISTS idx_leads_temperature_score 
ON public.leads (temperature, score DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_status 
ON public.leads (status);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Acceso:
-- Permitir inserción anónima desde el formulario de la Landing Page
CREATE POLICY "Permitir insercion publica desde landing" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Permitir lectura y actualización completa a usuarios autenticados (Vendedores) o mediante Service Role
CREATE POLICY "Permitir gestion completa a usuarios autenticados" 
ON public.leads 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Permitir acceso completo service_role" 
ON public.leads 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
