import fs from 'fs/promises';
import path from 'path';
import { IStorageProvider, StorageUploadResult } from './IStorageProvider';

export class LocalStorageProvider implements IStorageProvider {
  private uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    fs.mkdir(this.uploadDir, { recursive: true }).catch((err) => {
      console.error('Failed to create local uploads directory:', err);
    });
  }

  async uploadFile(fileName: string, buffer: Buffer, mimeType: string): Promise<StorageUploadResult> {
    const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-0._-]/g, '_')}`;
    const filePath = path.join(this.uploadDir, safeName);

    await fs.writeFile(filePath, buffer);

    return {
      fileUrl: `/uploads/${safeName}`,
      fileKey: safeName,
      storageProvider: 'local',
    };
  }

  async getFile(fileKey: string): Promise<Buffer> {
    const filePath = path.join(this.uploadDir, fileKey);
    return await fs.readFile(filePath);
  }

  async deleteFile(fileKey: string): Promise<boolean> {
    try {
      const filePath = path.join(this.uploadDir, fileKey);
      await fs.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
