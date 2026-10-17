import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
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
