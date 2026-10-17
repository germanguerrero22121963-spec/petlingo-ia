/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Oculta 'X-Powered-By: Next.js' para no revelar la tecnología a atacantes
  productionBrowserSourceMaps: false, // Evita la descarga de código fuente TypeScript en el navegador

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Protección Anti-Clickjacking (bloquea que alguien clone tu web en un iframe)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Previene ataques de suplantación de tipo MIME
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Protege datos de referencia
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Bloquea hardware no requerido
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Protección adicional contra inyección de scripts
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload', // Encriptación obligatoria HTTPS
          },
        ],
      },
    ];
  },
};

export default nextConfig;
