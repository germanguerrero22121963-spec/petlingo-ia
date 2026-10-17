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
  process.exit(1);
}

const client = new ApifyClient({ token: apifyToken });

async function runScraper() {
  console.log('🚀 Iniciando scraping a escala nacional para PETLINGO IA (Presupuesto objetivo: ~$2 USD)...');
  console.log('🎯 Ciudades objetivo: Ibarra, Otavalo, Quito, Cumbayá, Guayaquil, Cuenca, Ambato.');

  // Configuración calculada para consumir aprox. $1.80 - $2.00 USD de los créditos de Apify
  // 11 búsquedas x ~35-40 lugares = ~400 a 450 establecimientos veterinarios y pet shops en Ecuador
  const input = {
    searchStringsArray: [
      // 1. Zona Local e Imbabura (Prioridad 1)
      'veterinarias en Ibarra Ecuador',
      'pet shops en Ibarra Ecuador',
      'clinica veterinaria Otavalo Ecuador',
      
      // 2. Pichincha / Quito & Valles (Zona de mayor volumen)
      'clinica veterinaria Quito norte Ecuador',
      'pet shop Cumbaya Quito Ecuador',
      'veterinaria Valle de los Chillos Ecuador',
      
      // 3. Guayas / Guayaquil (Gran mercado comercial)
      'clinica veterinaria Samborondon Guayaquil',
      'pet shop Urdesa Guayaquil Ecuador',
      'veterinaria Ceibos Guayaquil',

      // 4. Azuay & Sierra Centro
      'clinica veterinaria Cuenca Ecuador',
      'pet shop Ambato Ecuador'
    ],
    maxCrawledPlacesPerSearch: 35, // ~35 por búsqueda = hasta ~380-400 lugares
    language: 'es',
    includeOpeningHours: false,
    includeReviews: false, // Desactivado para ahorrar cómputo y optimizar costos
    includeImages: false,  // Desactivado para ahorrar cómputo y optimizar costos
  };

  try {
    console.log('⏳ Enviando tarea al actor Google Maps en Apify...');
    const run = await client.actor('compass/crawler-google-places').call(input);

    console.log(`✅ Extracción completada en Apify. ID de ejecución: ${run.id}`);
    console.log(`📦 Descargando dataset completo de establecimientos...`);

    const { items } = await client.dataset(run.defaultDatasetId).listItems({ limit: 1000 });

    console.log(`✨ Total de establecimientos obtenidos: ${items.length}`);

    // Limpieza y estructuración de datos para el equipo de ventas
    const leads = items.map((place, idx) => {
      // Detección de ciudad basada en dirección o búsqueda
      let city = 'Ecuador';
      const addr = (place.address || '').toLowerCase();
      if (addr.includes('ibarra')) city = 'Ibarra';
      else if (addr.includes('otavalo')) city = 'Otavalo';
      else if (addr.includes('cumbay') || addr.includes('quito') || addr.includes('chillos') || addr.includes('tumbaco')) city = 'Quito';
      else if (addr.includes('guayaquil') || addr.includes('samborond') || addr.includes('daule')) city = 'Guayaquil';
      else if (addr.includes('cuenca')) city = 'Cuenca';
      else if (addr.includes('ambato')) city = 'Ambato';

      return {
        id: `b2b-${idx + 1}`,
        name: place.title || 'Establecimiento sin nombre',
        category: place.categoryName || 'Veterinaria / Tienda de Mascotas',
        phone: place.phone || place.phoneUnformatted || 'No disponible',
        address: place.address || place.street || 'Ecuador',
        city,
        website: place.website || null,
        rating: place.totalScore || null,
        reviewsCount: place.reviewsCount || 0,
        googleMapsUrl: place.url || null,
      };
    });

    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, 'pet_shops_ecuador.json');
    fs.writeFileSync(outputPath, JSON.stringify(leads, null, 2), 'utf-8');

    console.log(`💾 Base de datos comercial B2B actualizada con ${leads.length} prospectos en: ${outputPath}`);
  } catch (err) {
    console.error('❌ Error durante la extracción:', err.message);
  }
}

runScraper();
