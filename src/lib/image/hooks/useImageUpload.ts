'use client';

import { useState, useCallback } from 'react';
import { uploadImage, type UploadOptions, type UploadResult } from '../index';

interface UseImageUploadOptions extends UploadOptions {
  onUploadComplete?: (result: UploadResult) => void;
  onUploadError?: (error: Error) => void;
}

interface UseImageUploadReturn {
  upload: (file: File) => Promise<UploadResult | null>;
  isUploading: boolean;
  error: string | null;
  reset: () => void;
}

export function useImageUpload(options?: UseImageUploadOptions): UseImageUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<UploadResult | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const result = await uploadImage(file, options);
      options?.onUploadComplete?.(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      options?.onUploadError?.(err instanceof Error ? err : new Error(message));
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [options?.folder, options?.onUploadComplete, options?.onUploadError]);

  const reset = useCallback(() => {
    setError(null);
    setIsUploading(false);
  }, []);

  return { upload, isUploading, error, reset };
}
