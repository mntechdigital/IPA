import path from 'path';
import fs from 'fs';

export const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export function ensureUploadDir(subfolder?: string): string {
  const dir = subfolder ? path.join(uploadDir, subfolder) : uploadDir;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}
