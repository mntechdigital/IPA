import { getStorageProvider } from './config';
import type { UploadOptions, UploadResult } from './types';

export type { UploadOptions, UploadResult, DeleteOptions, StorageProvider } from './types';

let providerInstance: ReturnType<typeof getStorageProvider> | null = null;

function getProvider() {
  if (!providerInstance) providerInstance = getStorageProvider();
  return providerInstance;
}

export async function uploadImage(file: File, options?: UploadOptions): Promise<UploadResult> {
  const provider = getProvider();
  const allowedTypes = options?.allowedTypes || ['image/*'];
  const maxSize = options?.maxSizeBytes || 5 * 1024 * 1024;

  if (!allowedTypes.some(t => t === 'image/*' || file.type.startsWith(t.replace(/\*$/, '')))) {
    throw new Error(`Invalid file type: ${file.type}`);
  }
  if (file.size > maxSize) {
    throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB (max: ${maxSize / 1024 / 1024}MB)`);
  }

  return provider.upload(file, options);
}

export async function deleteImage(publicId: string): Promise<void> {
  const provider = getProvider();
  await provider.delete({ publicId });
}

export function getImageUrl(publicId: string): string {
  return getProvider().getUrl(publicId);
}

export function getStorageProviderName(): string {
  return getProvider().name;
}
