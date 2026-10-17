import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PETLINGO IA | El Primer Collar Inteligente que Traduce a tu Mascota',
  description:
    'Collar inteligente con Inteligencia Artificial que decodifica movimientos, vocalizaciones y biometría para que sepas en tiempo real cómo se siente tu mascota. Diseñado en Ibarra para todo Ecuador.',
  keywords: [
    'collar inteligente mascotas',
    'collar IA perros gatos',
    'petlingo ia',
    'tecnologia mascotas ecuador',
    'ibarra mascotas',
    'traductor emociones perro',
  ],
  openGraph: {
    title: 'PETLINGO IA | Entiende lo que tu mascota siente',
    description:
      'Tecnología de Inteligencia Artificial que traduce las emociones y monitorea la salud de tu perro o gato.',
    url: 'https://petlingo.ia',
    siteName: 'Petlingo IA',
    locale: 'es_EC',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased selection:bg-brand-violet selection:text-white">
        {children}
      </body>
    </html>
  );
}
