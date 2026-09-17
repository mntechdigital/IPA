import type { StorageProvider } from './types';

type ProviderType = 'cloudinary' | 'local';

let providerInstance: StorageProvider | null = null;

export function getStorageProvider(): StorageProvider {
  if (providerInstance) return providerInstance;

  const provider = (process.env.STORAGE_PROVIDER || 'cloudinary') as ProviderType;

  switch (provider) {
    case 'cloudinary': {
      const { createCloudinaryProvider } = require('./providers/cloudinary');
      providerInstance = createCloudinaryProvider();
      break;
    }
    case 'local': {
      const { createLocalProvider } = require('./providers/local');
      providerInstance = createLocalProvider();
      break;
    }
    default:
      throw new Error(`Unknown storage provider: ${provider}. Use "cloudinary" or "local".`);
  }

  return providerInstance;
}
