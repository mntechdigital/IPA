import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export const ensureUploadDir = (subfolder?: string) => {
  const dir = subfolder ? path.join(uploadDir, subfolder) : uploadDir;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

export const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = ensureUploadDir();
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    cb(null, name);
  },
});

export const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

export async function saveUploadedFile(file: File, subfolder?: string): Promise<string> {
  const dir = ensureUploadDir(subfolder);
  const ext = path.extname(file.name) || '.jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
  const filePath = path.join(dir, filename);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filePath, buffer);
  const urlPath = subfolder ? `/uploads/${subfolder}/${filename}` : `/uploads/${filename}`;
  return urlPath;
}
