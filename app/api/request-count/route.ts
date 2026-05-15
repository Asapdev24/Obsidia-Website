import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'requests.json');

function readCount(): number {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')).count ?? 0;
  } catch {
    return 0;
  }
}

function writeCount(n: number): void {
  try {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    fs.writeFileSync(DATA_PATH, JSON.stringify({ count: n }));
  } catch { /* silently ignore write errors */ }
}

export async function GET() {
  return NextResponse.json({ count: readCount() });
}

export async function POST() {
  const count = readCount() + 1;
  writeCount(count);
  return NextResponse.json({ count });
}
