import { v2 as cloudinary } from 'cloudinary';
import type { StorageProvider, UploadOptions, UploadResult, DeleteOptions } from '../types';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function createCloudinaryProvider(): StorageProvider {
  return {
    name: 'cloudinary',

    async upload(file: File, options?: UploadOptions): Promise<UploadResult> {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const dataUrl = `data:${file.type};base64,${base64}`;

      const folder = options?.folder ? `ipa/${options.folder}` : 'ipa';

      const result = await cloudinary.uploader.upload(dataUrl, {
        folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      };
    },

    async delete(options: DeleteOptions): Promise<void> {
      await cloudinary.uploader.destroy(options.publicId);
    },

    getUrl(publicId: string): string {
      return cloudinary.url(publicId, { secure: true });
    },
  };
}
