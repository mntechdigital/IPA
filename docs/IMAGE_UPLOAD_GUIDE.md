# IPA Media Research — Image Upload & Storage Guide

## Overview

All image uploads in the IPA Media Research CMS go through a single centralized abstraction:

```
CMS Editors → useImageUpload hook → POST /api/upload → uploadImage()
                                                       ↓
                                                getStorageProvider()
                                                ├── CloudinaryProvider
                                                └── LocalProvider
```

The active storage provider is controlled by one environment variable:

- `STORAGE_PROVIDER=cloudinary` → uploads to Cloudinary
- `STORAGE_PROVIDER=local` → uploads to `public/uploads/` on disk

Only `src/lib/image/` knows about the provider. CMS components, API routes, and database fields are all provider-agnostic.

---

## Current Status

| Item | Value |
|------|-------|
| Active provider | `cloudinary` |
| Cloud name | `dksks0apn` |
| API key | `9513****19626` |
| API secret | `US7Y****Js` |
| Credential status | **VALID** — Verified on 2026-09-17, `ping` returned `status: ok` |
| Folder prefix | `ipa/{folder}` (e.g. `ipa/cms`, `ipa/team`, `ipa/research`) |
| Database | Stores only the returned image URL string + optional `publicId` |

> Credentials were verified against live Cloudinary API. If you rotate keys, re-run the connectivity check in this guide.

---

## Required Environment Variables

Add these to `.env` (root of the project):

```bash
# Storage provider selection
STORAGE_PROVIDER="cloudinary"

# Cloudinary credentials — get from https://console.cloudinary.com/settings/account
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Optional: local provider fallback (no extra vars needed)
# STORAGE_PROVIDER="local"
```

Also update `.env.example` with the same keys for other developers.

---

## Verifying Cloudinary Credentials

### 1. Quick connectivity check

```bash
node -e "
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
cloudinary.api.ping((err, res) => {
  if (err) { console.error('FAIL:', err.message); process.exit(1); }
  console.log('OK:', res);
});
"
```

Expected success output:

```json
{
  "status": "ok",
  "resource_type": "image"
}
```

If you see `401 cloud_name mismatch` or `403 forbidden`:
- Double-check `CLOUDINARY_CLOUD_NAME` matches the **exact** cloud name in your Cloudinary dashboard URL: `https://console.cloudinary.com/<cloud_name>/settings/account`
- Regenerate the API key/secret pair from **Settings → API Keys → Upload Presets** and update `.env`

### 2. Upload test from the CMS

1. Run `npm run dev`
2. Open `/cms`
3. Navigate to any section with an image upload (e.g. **Home → Hero Background Image**)
4. Upload a small image (< 5 MB)
5. If the preview appears and no error toast shows, the upload worked
6. Check Cloudinary dashboard → **Media Library** to confirm the file arrived under the `ipa/` folder

---

## Uploading Images Through the CMS

All CMS editors now use the same standardized upload UI:

| Component | Image fields |
|-----------|--------------|
| **SectionFormEditor** | Home hero, public interest banner, What We Do card icons/images, investigation cards, quote background, About hero, Who We Are main photo, mission pillar image, Research hero, Contact hero, Focus Area cards, Header logo, Footer logo |
| **ResearchManagerView** | Research beat cover image (`image` / `imageBn`) |
| **TeamsDirectoryView** | Team member profile photo, Team hero banner |

### Upload UI behavior

- **Loading state**: Spinner + "Uploading..." text during upload; file input is disabled
- **Preview**: Thumbnail shown after upload
- **Remove**: Trash button clears the URL from form state (does not delete from storage yet)
- **Error**: Red error message shown below the upload button
- **Fallback**: All display components still fall back to Unsplash URLs if the CMS field is empty

### Folder structure in storage

Images are organized by upload context:

| Folder | Source |
|--------|--------|
| `cms/` | SectionFormEditor uploads |
| `research/` | Research beat covers |
| `team/` | Team member photos |
| `team/hero/` | Team hero banner |
| `ipa/` | Root fallback (if no folder specified) |

You can change the folder prefix in each hook call if needed.

---

## Switching Storage Providers

### Option A: Switch to local disk (no Cloudinary)

1. Update `.env`:

   ```bash
   STORAGE_PROVIDER="local"
   ```

2. Restart the dev server:

   ```bash
   npm run dev
   ```

3. Uploads will now write to `public/uploads/{folder}/{filename}` and return `/uploads/{folder}/{filename}` URLs.

No other code changes are required.

### Option B: Switch to a custom provider (e.g. S3, VPS object storage)

1. Create a new provider file:

   ```bash
   src/lib/image/providers/s3.ts
   ```

   Example skeleton:

   ```typescript
   import type { StorageProvider, UploadOptions, UploadResult, DeleteOptions } from '../types';

   export function createS3Provider(): StorageProvider {
     return {
       name: 's3',
       async upload(file: File, options?: UploadOptions): Promise<UploadResult> {
         // 1. Upload file to S3
         // 2. Return { url, publicId, width, height, format, bytes }
       },
       async delete(options: DeleteOptions): Promise<void> {
         // Delete object from S3
       },
       getUrl(publicId: string): string {
         // Return public S3 URL
       },
     };
   }
   ```

2. Register it in `src/lib/image/config.ts`:

   ```typescript
   case 's3': {
     const { createS3Provider } = require('./providers/s3');
     providerInstance = createS3Provider();
     break;
   }
   ```

3. Add provider-specific env vars to `.env`:

   ```bash
   STORAGE_PROVIDER="s3"
   S3_BUCKET="your-bucket"
   S3_REGION="us-east-1"
   S3_ACCESS_KEY=""
   S3_SECRET_KEY=""
   ```

4. Restart the dev server.

No CMS component, hook, or API route changes are needed.

---

## Deleting / Replacing Images

### Current behavior

- **Remove button in CMS**: Sets the image URL field to `''` in the database
- **Storage cleanup**: The actual file remains in Cloudinary / disk until explicitly deleted

### To add automatic deletion on remove

Use the existing delete API route:

```typescript
POST /api/upload/delete
Body: { publicId: "ipa/cms/1737123456789-abc123.jpg" }
```

In `SectionFormEditor.tsx`, enhance the remove handler:

```typescript
const handleRemove = async (publicId?: string) => {
  if (publicId) {
    await fetch('/api/upload/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });
  }
  onChange('');
};
```

Store `publicId` alongside `url` in the CMS form state to enable this.

---

## Troubleshooting

### `401 cloud_name mismatch`

- `CLOUDINARY_CLOUD_NAME` does not match the account owning the API key/secret
- Fix: open https://console.cloudinary.com/<your-cloud-name>/settings/account and copy the **exact** cloud name into `.env`
- Regenerate API key/secret from **Settings → API Keys** if you recently switched accounts

### `403 forbidden`

- Check that the API key has **Admin** or **Upload** permissions
- Verify the API secret matches the key

### Upload succeeds but image doesn’t appear on public site

- Check the CMS database field contains the full Cloudinary URL (e.g. `https://res.cloudinary.com/ipa-media-research/image/upload/...`)
- Verify `next.config.ts` `images.remotePatterns` includes `res.cloudinary.com`
- Clear `.next` cache: `npm run clean`

### Upload fails with `File too large`

- Current limit is **5 MB** per file
- Adjust `maxSizeBytes` in `src/lib/image/index.ts` if needed

### Base64 images still appearing in database

- TeamsDirectoryView was the last base64 holdout; it has been migrated to server upload
- If you see `data:image/...` strings in the database, re-upload those images through the CMS

---

## Architecture Reference

### File map

| Path | Purpose |
|------|---------|
| `src/lib/image/types.ts` | `StorageProvider` interface + shared types |
| `src/lib/image/config.ts` | Provider factory, reads `STORAGE_PROVIDER` env |
| `src/lib/image/providers/cloudinary.ts` | Cloudinary implementation |
| `src/lib/image/providers/local.ts` | Local disk implementation |
| `src/lib/image/providers/index.ts` | Provider exports |
| `src/lib/image/index.ts` | Public API: `uploadImage()`, `deleteImage()`, `getImageUrl()` |
| `src/lib/image/hooks/useImageUpload.ts` | React hook for upload UI state |
| `src/components/dashboard/ImageUpload.tsx` | Reusable upload UI component |
| `src/app/api/upload/route.ts` | Upload endpoint |
| `src/app/api/upload/delete/route.ts` | Delete endpoint |

### Provider interface

```typescript
interface StorageProvider {
  readonly name: string;
  upload(file: File, options?: UploadOptions): Promise<UploadResult>;
  delete(options: DeleteOptions): Promise<void>;
  getUrl(publicId: string): string;
}
```

Any storage backend that implements this interface can be plugged in with no changes to the rest of the application.
