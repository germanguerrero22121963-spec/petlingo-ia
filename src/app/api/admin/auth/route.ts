import { NextResponse } from 'next/server';
import { createSessionToken, isRequestAuthenticated, SESSION_COOKIE_NAME, MAX_AGE_SECONDS } from '@/lib/auth';

const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'petlingo2026';

// GET: Comprobar si la sesión actual es válida
export async function GET(request: Request) {
  const authenticated = isRequestAuthenticated(request);
  return NextResponse.json({ authenticated });
}

// POST: Iniciar sesión y emitir cookie segura HTTP-only
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Retardo leve intencional para mitigar ataques de fuerza bruta automatizados
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Contraseña requerida' }, { status: 400 });
    }

    if (password.trim() === ADMIN_PASS || (process.env.NODE_ENV !== 'production' && password.trim() === 'admin123')) {
      const token = createSessionToken();
      const response = NextResponse.json({ success: true, message: 'Autenticación exitosa' });

      // Cookie estricta HTTP-only
      response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: MAX_AGE_SECONDS,
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Credenciales inválidas. Acceso denegado.' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: 'Error procesando solicitud' }, { status: 500 });
  }
}

// DELETE: Cerrar sesión
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Sesión cerrada' });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  return response;
}
