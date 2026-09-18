import type { StorageProvider } from './types';
import { createCloudinaryProvider } from './providers/cloudinary';
import { createLocalProvider } from './providers/local';

type ProviderType = 'cloudinary' | 'local';

let providerInstance: StorageProvider | null = null;

export function getStorageProvider(): StorageProvider {
  if (providerInstance) return providerInstance;

  const provider = (process.env.STORAGE_PROVIDER || 'cloudinary') as ProviderType;

  switch (provider) {
    case 'cloudinary': {
      providerInstance = createCloudinaryProvider();
      break;
    }
    case 'local': {
      providerInstance = createLocalProvider();
      break;
    }
    default:
      throw new Error(`Unknown storage provider: ${provider}. Use "cloudinary" or "local".`);
  }

  return providerInstance;
}
