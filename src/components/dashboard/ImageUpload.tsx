'use client';

import React, { useRef } from 'react';
import { Upload, Trash2, Loader2, ImageIcon } from 'lucide-react';
import { useImageUpload } from '../../lib/image/hooks/useImageUpload';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onDelete?: (publicId: string) => void;
  folder?: string;
  label?: string;
  className?: string;
  previewClassName?: string;
  placeholder?: string;
  disabled?: boolean;
}

interface UploadResult {
  url: string;
  publicId: string;
  filename: string;
}

export function ImageUpload({
  value,
  onChange,
  onDelete,
  folder = 'cms',
  label,
  className = '',
  previewClassName = 'w-full h-32 object-cover rounded-xl',
  placeholder,
  disabled = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { upload, isUploading, error } = useImageUpload({
    folder,
    onUploadComplete: (result: UploadResult) => onChange(result.url),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await upload(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="flex items-center gap-3">
        <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#6E56CF] hover:border-[#6E56CF] text-xs font-bold cursor-pointer transition-colors shrink-0 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isUploading ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#6E56CF]" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{isUploading ? 'Uploading...' : 'Choose Image'}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading || disabled}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {value ? (
        <img src={value} alt="Preview" className={previewClassName} />
      ) : placeholder ? (
        <div className="flex items-center justify-center bg-slate-100 rounded-xl border border-dashed border-slate-300">
          <div className="text-center py-8">
            <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400">{placeholder}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
