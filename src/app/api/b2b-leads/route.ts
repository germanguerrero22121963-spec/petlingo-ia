import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isRequestAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Protección de acceso al directorio de contactos comerciales
    if (!isRequestAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Acceso no autorizado al directorio comercial' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const download = searchParams.get('download');

    if (download === 'csv') {
      const csvPath = path.join(process.cwd(), 'data', 'pet_shops_ecuador.csv');
      if (fs.existsSync(csvPath)) {
        const fileContent = fs.readFileSync(csvPath, 'utf-8');
        return new NextResponse(fileContent, {
          status: 200,
          headers: {
            'Content-Disposition': 'attachment; filename="directorio_veterinarias_ecuador_petlingo.csv"',
            'Content-Type': 'text/csv; charset=utf-8',
          },
        });
      }
    }

    const filePath = path.join(process.cwd(), 'data', 'pet_shops_ecuador.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const leads = JSON.parse(content);
      return NextResponse.json({ success: true, count: leads.length, leads });
    }
    return NextResponse.json({ success: true, count: 0, leads: [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
