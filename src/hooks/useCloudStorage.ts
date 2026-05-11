import { useState, useCallback } from 'react';

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

interface UseCloudStorageOptions {
  maxFileSize?: number;
  acceptedTypes?: string[];
}

export function useCloudStorage(options: UseCloudStorageOptions = {}) {
  const {
    maxFileSize = 10 * 1024 * 1024,
    acceptedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'application/pdf']
  } = options;

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File): Promise<UploadedFile | null> => {
    setUploading(true);
    setProgress(0);
    setError(null);

    if (file.size > maxFileSize) {
      setError(`File size exceeds ${maxFileSize / 1024 / 1024}MB limit`);
      setUploading(false);
      return null;
    }

    if (!acceptedTypes.includes(file.type)) {
      setError(`File type ${file.type} is not accepted`);
      setUploading(false);
      return null;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(percentComplete);
        }
      });

      const response = await new Promise<UploadedFile>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            if (data.success) {
              resolve(data.data);
            } else {
              reject(new Error(data.error));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error('Network error'));
        };

        xhr.open('POST', '/api/files/upload');
        xhr.send(formData);
      });

      setUploading(false);
      setProgress(100);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
      return null;
    }
  }, [maxFileSize, acceptedTypes]);

  const deleteFile = useCallback(async (fileId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      return data.success;
    } catch (err) {
      setError('Failed to delete file');
      return false;
    }
  }, []);

  const getFile = useCallback(async (fileId: string): Promise<UploadedFile | null> => {
    try {
      const response = await fetch(`/api/files/${fileId}`);
      const data = await response.json();

      if (data.success) {
        return data.data;
      } else {
        setError(data.error);
        return null;
      }
    } catch (err) {
      setError('Failed to get file');
      return null;
    }
  }, []);

  const getAllFiles = useCallback(async (): Promise<UploadedFile[]> => {
    try {
      const response = await fetch('/api/files');
      const data = await response.json();

      if (data.success) {
        return data.data;
      } else {
        setError(data.error);
        return [];
      }
    } catch (err) {
      setError('Failed to get files');
      return [];
    }
  }, []);

  return {
    uploadFile,
    deleteFile,
    getFile,
    getAllFiles,
    uploading,
    progress,
    error
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function isImageFile(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}
