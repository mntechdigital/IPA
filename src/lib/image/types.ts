export interface UploadOptions {
  folder?: string;
  filename?: string;
  allowedTypes?: string[];
  maxSizeBytes?: number;
}

export interface UploadResult {
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export interface DeleteOptions {
  publicId: string;
}

export interface StorageProvider {
  readonly name: string;
  upload(file: File, options?: UploadOptions): Promise<UploadResult>;
  delete(options: DeleteOptions): Promise<void>;
  getUrl(publicId: string): string;
}
