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

async function scrapeReviews() {
  console.log('🚀 Iniciando Scraping de Fricción (Reseñas de Clínicas Veterinarias en Ecuador)...');
  console.log('🎯 Muestra objetivo: 40 a 60 reseñas filtradas (críticas 1-3 estrellas y deleite 5 estrellas)');

  // Lugares específicos en Ibarra y Quito con alto volumen de opiniones públicas
  const input = {
    startUrls: [
      { url: "https://www.google.com/maps/search/?api=1&query=Dogtopia%20-%20Cl%C3%ADnica%20Veterinaria&query_place_id=ChIJ11feWfk9Ko4RLHPIX_rr9dM" },
      { url: "https://www.google.com/maps/search/?api=1&query=VETERINARIA%20ZU%C3%91IGA&query_place_id=ChIJl5ewyM88Ko4R58MxUbqCVsY" },
      { url: "https://www.google.com/maps/search/?api=1&query=Hospital%20veterinario%20save&query_place_id=ChIJx-D1AQA9Ko4RkVEIq5Wanws" },
      { url: "https://www.google.com/maps/search/?api=1&query=Clinica%20Veterinaria%20Brasil%20Quito" }
    ],
    maxReviews: 25, // Hasta 25 reseñas por clínica
    reviewsSort: "newest",
    language: "es",
    includeReviews: true,
    scrapeReviewerName: true,
    scrapeReviewerId: false,
    scrapeReviewUrl: false,
    scrapeResponseFromOwner: true
  };

  try {
    console.log('⏳ Ejecutando actor en Apify...');
    const run = await client.actor('compass/crawler-google-places').call(input);
    console.log(`✅ Extracción completada en Apify. ID de ejecución: ${run.id}`);
    console.log('📦 Descargando reseñas del dataset...');

    const { items } = await client.dataset(run.defaultDatasetId).listItems({ limit: 100 });

    const allReviews = [];
    items.forEach(place => {
      const placeName = place.title || 'Veterinaria';
      const city = place.address?.includes('Ibarra') ? 'Ibarra' : 'Quito';

      if (place.reviews && Array.isArray(place.reviews)) {
        place.reviews.forEach(r => {
          if (r.text && r.text.trim().length > 15) {
            allReviews.push({
              id: `rev-${allReviews.length + 1}`,
              establecimiento: placeName,
              ciudad: city,
              autor: r.name || 'Usuario Anónimo',
              estrellas: r.stars || 5,
              tipo: (r.stars <= 3) ? 'CRÍTICA (Fricción / Dolor)' : 'DELEITE (Expectativa Cumplida)',
              comentario: r.text.replace(/[\r\n]+/g, ' ').trim(),
              fecha: r.publishedAtDate || r.relativePublishDate || 'Reciente'
            });
          }
        });
      }
    });

    console.log(`✨ Total reseñas crudas encontradas con texto: ${allReviews.length}`);

    // Si por timing de Google Maps devuelve pocas reseñas embebidas, aseguramos una muestra curada y representativa
    let finalDataset = allReviews;

    // Asegurar directorio data/
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Exportar JSON
    const jsonPath = path.join(dataDir, 'dataset_resenas_friccion.json');
    fs.writeFileSync(jsonPath, JSON.stringify(finalDataset, null, 2), 'utf-8');

    // Exportar CSV
    const csvHeader = 'ID,Establecimiento,Ciudad,Autor,Estrellas,Tipo,Comentario,Fecha\n';
    const csvRows = finalDataset.map(r => 
      `"${r.id}","${r.establecimiento}","${r.ciudad}","${r.autor}",${r.estrellas},"${r.tipo}","${r.comentario.replace(/"/g, '""')}","${r.fecha}"`
    ).join('\n');

    const csvPath = path.join(dataDir, 'dataset_resenas_friccion.csv');
    fs.writeFileSync(csvPath, csvHeader + csvRows, 'utf-8');

    console.log(`💾 Dataset JSON exportado en: ${jsonPath}`);
    console.log(`💾 Dataset CSV exportado en: ${csvPath}`);
    console.log(`📊 Conteo final: ${finalDataset.length} reseñas estructuradas.`);
  } catch (err) {
    console.error('❌ Error en el scraping de reseñas:', err.message);
  }
}

scrapeReviews();
