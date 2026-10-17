import { ApifyClient } from 'apify-client';
import fs from 'fs';
import path from 'path';

// Cargar token desde .env
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

async function runDeepScraper() {
  console.log('🚀 Iniciando Scraping Profundo a Nivel Nacional para PETLINGO IA...');
  console.log('💰 Presupuesto calibrado: ~$2.50 a $3.00 USD de los créditos gratuitos de Apify.');
  console.log('🗺️ Cobertura: Imbabura, Pichincha, Guayas, Azuay, Manabí, Tungurahua, El Oro, Loja y Santo Domingo.');

  // Configuración de búsqueda profunda en 18 nodos estratégicos del Ecuador
  const input = {
    searchStringsArray: [
      // 1. Epicentro Imbabura
      'veterinarias en Ibarra Ecuador',
      'pet shops en Ibarra Ecuador',
      'clinica veterinaria Otavalo Ecuador',

      // 2. Pichincha (Quito y Valles)
      'hospital veterinario 24 horas Quito Ecuador',
      'clinica veterinaria Quito norte Ecuador',
      'pet shop Cumbaya Tumbaco Ecuador',
      'veterinaria Valle de los Chillos Quito Ecuador',

      // 3. Guayas (Guayaquil y Samborondón)
      'hospital veterinario Guayaquil Ecuador',
      'clinica veterinaria Samborondon Ecuador',
      'pet shop Urdesa Ceibos Guayaquil Ecuador',

      // 4. Azuay (Cuenca)
      'clinica veterinaria Cuenca Ecuador',
      'pet shop tienda mascotas Cuenca Ecuador',

      // 5. Manabí (Manta y Portoviejo)
      'veterinaria Manta Manabi Ecuador',
      'pet shop Portoviejo Ecuador',

      // 6. Sierra Centro & Sur (Ambato, Machala, Loja, Santo Domingo)
      'clinica veterinaria Ambato Tungurahua Ecuador',
      'veterinaria Santo Domingo de los Tsachilas Ecuador',
      'clinica veterinaria Machala El Oro Ecuador',
      'veterinaria Loja Ecuador'
    ],
    maxCrawledPlacesPerSearch: 40, // ~40 lugares por búsqueda x 18 = hasta 700+ establecimientos
    language: 'es',
    includeOpeningHours: true,
    includeReviews: false, // Desactivado para maximizar el número de lugares sin gastar en texto redundante
    includeImages: false,
  };

  try {
    console.log('⏳ Lanzando ejecución profunda en Apify (Google Places Crawler)...');
    const run = await client.actor('compass/crawler-google-places').call(input);

    console.log(`✅ Extracción profunda finalizada. Run ID: ${run.id}`);
    console.log('📦 Descargando el dataset completo...');

    const { items } = await client.dataset(run.defaultDatasetId).listItems({ limit: 1500 });
    console.log(`✨ Total crudo de establecimientos descargados: ${items.length}`);

    // Filtrar duplicados por URL o Nombre exacto
    const seen = new Set();
    const uniquePlaces = [];

    for (const place of items) {
      const key = (place.title || '').trim().toLowerCase() + '|' + (place.address || '').trim().toLowerCase();
      if (!seen.has(key) && place.title) {
        seen.add(key);

        // Detección inteligente de ciudad
        let city = 'Ecuador';
        const addr = (place.address || '').toLowerCase();
        const title = (place.title || '').toLowerCase();

        if (addr.includes('ibarra') || title.includes('ibarra')) city = 'Ibarra';
        else if (addr.includes('otavalo') || title.includes('otavalo')) city = 'Otavalo';
        else if (addr.includes('cumbay') || addr.includes('quito') || addr.includes('chillos') || addr.includes('tumbaco') || addr.includes('pichincha')) city = 'Quito';
        else if (addr.includes('guayaquil') || addr.includes('samborond') || addr.includes('daule') || addr.includes('guayas')) city = 'Guayaquil';
        else if (addr.includes('cuenca') || addr.includes('azuay')) city = 'Cuenca';
        else if (addr.includes('manta')) city = 'Manta';
        else if (addr.includes('portoviejo')) city = 'Portoviejo';
        else if (addr.includes('ambato')) city = 'Ambato';
        else if (addr.includes('santo domingo')) city = 'Santo Domingo';
        else if (addr.includes('machala')) city = 'Machala';
        else if (addr.includes('loja')) city = 'Loja';

        // Categorización comercial
        let category = 'Clínica Veterinaria';
        if (title.includes('pet shop') || title.includes('tienda') || title.includes('petshop') || (place.categoryName || '').toLowerCase().includes('pet store')) {
          category = 'Pet Shop / Tienda de Mascotas';
        } else if (title.includes('hospital') || (place.categoryName || '').toLowerCase().includes('hospital')) {
          category = 'Hospital Veterinario 24h';
        } else if (title.includes('spa') || title.includes('peluqueria') || title.includes('grooming')) {
          category = 'Peluquería & Spa Canino';
        }

        uniquePlaces.push({
          id: `b2b-${uniquePlaces.length + 1}`,
          name: place.title || 'Establecimiento sin nombre',
          category,
          phone: place.phone || place.phoneUnformatted || 'No disponible',
          address: place.address || place.street || 'Ecuador',
          city,
          website: place.website || null,
          rating: place.totalScore || null,
          reviewsCount: place.reviewsCount || 0,
          googleMapsUrl: place.url || null,
        });
      }
    }

    console.log(`💎 Total de establecimientos únicos y limpios: ${uniquePlaces.length}`);

    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Guardar dataset JSON
    const outputPath = path.join(dataDir, 'pet_shops_ecuador.json');
    fs.writeFileSync(outputPath, JSON.stringify(uniquePlaces, null, 2), 'utf-8');

    // Guardar dataset CSV complementario
    const csvHeader = 'ID,Nombre,Categoria,Ciudad,Telefono,Direccion,Rating,Reviews,Web,GoogleMaps\n';
    const csvRows = uniquePlaces.map(p => 
      `"${p.id}","${p.name.replace(/"/g, '""')}","${p.category}","${p.city}","${p.phone}","${p.address.replace(/"/g, '""')}",${p.rating || ''},${p.reviewsCount || 0},"${p.website || ''}","${p.googleMapsUrl || ''}"`
    ).join('\n');
    const csvPath = path.join(dataDir, 'pet_shops_ecuador.csv');
    fs.writeFileSync(csvPath, csvHeader + csvRows, 'utf-8');

    console.log(`💾 Base de datos B2B nacional guardada en: ${outputPath}`);
    console.log(`💾 Base de datos CSV guardada en: ${csvPath}`);

    // Conteo por ciudad
    const cityCounts = {};
    uniquePlaces.forEach(p => cityCounts[p.city] = (cityCounts[p.city] || 0) + 1);
    console.log('📊 Distribución Nacional por Ciudad:');
    console.table(cityCounts);

  } catch (err) {
    console.error('❌ Error en el scraping profundo:', err.message);
  }
}

runDeepScraper();
