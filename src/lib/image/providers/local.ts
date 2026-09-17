import type { StorageProvider, UploadOptions, UploadResult, DeleteOptions } from '../types';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function createLocalProvider(): StorageProvider {
  return {
    name: 'local',

    async upload(file: File, options?: UploadOptions): Promise<UploadResult> {
      const folder = options?.folder || '';
      const dir = folder ? path.join(UPLOAD_DIR, folder) : UPLOAD_DIR;
      ensureDir(dir);

      const ext = path.extname(file.name) || '.jpg';
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
      const filePath = path.join(dir, filename);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);

      const urlPath = folder ? `/uploads/${folder}/${filename}` : `/uploads/${filename}`;

      return {
        url: urlPath,
        publicId: folder ? `${folder}/${filename}` : filename,
        bytes: buffer.length,
      };
    },

    async delete(options: DeleteOptions): Promise<void> {
      const filePath = path.join(UPLOAD_DIR, options.publicId);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    },

    getUrl(publicId: string): string {
      return `/uploads/${publicId}`;
    },
  };
}
