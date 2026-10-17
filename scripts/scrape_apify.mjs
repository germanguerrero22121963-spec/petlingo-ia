import { ApifyClient } from 'apify-client';
import fs from 'fs';
import path from 'path';

// Cargar variables desde .env
const envPath = path.resolve(process.cwd(), '.env');
let apifyToken = process.env.APIFY_API_TOKEN;

if (!apifyToken && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/APIFY_API_TOKEN=(.*)/);
  if (match && match[1]) {
    apifyToken = match[1].trim();
  }
}

if (!apifyToken) {
  console.error('❌ ERROR: No se encontró APIFY_API_TOKEN en el archivo .env');
  console.log('👉 Por favor copia tu token de https://console.apify.com/account/integrations y pégalo en .env');
  process.exit(1);
}

const client = new ApifyClient({ token: apifyToken });

async function runScraper() {
  console.log('🚀 Iniciando scraping optimizado para PLAN GRATUITO de Apify...');
  console.log('🎯 Objetivos: Veterinarias y Pet Shops en Ibarra y Quito (Ecuador)');

  // Parámetros de búsqueda con LÍMITES ESTRICTOS para cuidar tu saldo gratis ($5 USD)
  // 30 resultados consumen aproximadamente $0.15 a $0.25 USD del crédito gratuito.
  const input = {
    searchStringsArray: [
      'veterinarias en Ibarra Ecuador',
      'pet shop en Ibarra Ecuador',
      'veterinarias en Quito Ecuador'
    ],
    maxCrawledPlacesPerSearch: 10, // Máximo 10 por búsqueda = 30 resultados en total
    language: 'es',
    includeOpeningHours: false,
    includeReviews: false, // Desactivar para ahorrar procesamiento y costo
    includeImages: false,  // Desactivar para ahorrar procesamiento y costo
  };

  try {
    // Usamos el actor oficial de Google Maps en Apify
    const run = await client.actor('compass/crawler-google-places').call(input);

    console.log(`✅ Extracción completada en Apify. ID de ejecución: ${run.id}`);
    console.log(`📦 Descargando dataset...`);

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    console.log(`✨ Se obtuvieron ${items.length} prospectos comerciales.`);

    // Estructurar los datos relevantes para el equipo comercial de Petlingo IA
    const leads = items.map((place, idx) => ({
      id: `scraped-${idx + 1}`,
      name: place.title || 'Sin nombre',
      category: place.categoryName || 'Veterinaria / Pet Shop',
      phone: place.phone || place.phoneUnformatted || 'No disponible',
      address: place.address || place.street || 'Ibarra / Ecuador',
      city: place.city || (place.address?.includes('Ibarra') ? 'Ibarra' : 'Quito'),
      website: place.website || null,
      rating: place.totalScore || null,
      reviewsCount: place.reviewsCount || 0,
      googleMapsUrl: place.url || null,
    }));

    // Asegurar directorio data/
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, 'pet_shops_ecuador.json');
    fs.writeFileSync(outputPath, JSON.stringify(leads, null, 2), 'utf-8');

    console.log(`💾 Prospectos guardados exitosamente en: ${outputPath}`);
    console.table(leads.slice(0, 5).map(l => ({ Nombre: l.name, Ciudad: l.city, Teléfono: l.phone })));
  } catch (err) {
    console.error('❌ Error durante la ejecución de Apify:', err.message);
  }
}

runScraper();
