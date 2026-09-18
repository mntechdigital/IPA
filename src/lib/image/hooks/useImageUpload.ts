'use client';

import { useState, useCallback } from 'react';

interface UseImageUploadOptions {
  folder?: string;
  onUploadComplete?: (result: { url: string; publicId: string; filename: string }) => void;
  onUploadError?: (error: Error) => void;
}

interface UseImageUploadReturn {
  upload: (file: File) => Promise<{ url: string; publicId: string; filename: string } | null>;
  isUploading: boolean;
  error: string | null;
  reset: () => void;
}

export function useImageUpload(options: UseImageUploadOptions = {}): UseImageUploadReturn {
  const { folder, onUploadComplete, onUploadError } = options;
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<{ url: string; publicId: string; filename: string } | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (folder) formData.append('folder', folder);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Upload failed: ${res.status}`);
      }

      const result = await res.json();
      onUploadComplete?.(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      onUploadError?.(err instanceof Error ? err : new Error(message));
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [folder, onUploadComplete, onUploadError]);

  const reset = useCallback(() => {
    setError(null);
    setIsUploading(false);
  }, []);

  return { upload, isUploading, error, reset };
}
