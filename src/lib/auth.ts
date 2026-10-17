import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'petlingo_admin_session';
const SECRET = process.env.ADMIN_SESSION_SECRET || 'petlingo_fallback_secure_secret_key_2026';
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 horas

/**
 * Genera un token de sesión firmado criptográficamente
 */
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(timestamp)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Valida un token de sesión
 */
export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestampStr, providedSignature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Verificar expiración (12 horas)
  const now = Date.now();
  if (now - timestamp > MAX_AGE_SECONDS * 1000 || timestamp > now + 60000) {
    return false;
  }

  // Verificar firma HMAC en tiempo constante (previene ataques de temporización)
  const expectedSignature = crypto
    .createHmac('sha256', SECRET)
    .update(timestampStr)
    .digest('hex');

  try {
    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const providedBuffer = Buffer.from(providedSignature, 'utf8');
    if (expectedBuffer.length !== providedBuffer.length) return false;
    return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
  } catch (err) {
    return false;
  }
}

/**
 * Verifica si la petición actual proviene de un administrador autenticado
 */
export function isRequestAuthenticated(request: Request): boolean {
  // 1. Revisar cookie HTTP-only
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  const cookieToken = match ? match[1] : null;

  if (cookieToken && verifySessionToken(cookieToken)) {
    return true;
  }

  // 2. Revisar Authorization Bearer header (útil para APIs)
  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const bearerToken = authHeader.substring(7);
    if (verifySessionToken(bearerToken)) {
      return true;
    }
  }

  return false;
}

export { SESSION_COOKIE_NAME, MAX_AGE_SECONDS };
