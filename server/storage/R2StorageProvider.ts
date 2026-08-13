import { IStorageProvider, StorageUploadResult } from './IStorageProvider';

export class R2StorageProvider implements IStorageProvider {
  private r2Bucket: any;
  private publicDomain: string;

  constructor(r2Bucket: any, publicDomain: string = 'https://pub-r2.core-ai.internal') {
    this.r2Bucket = r2Bucket;
    this.publicDomain = publicDomain;
  }

  async uploadFile(fileName: string, buffer: Buffer, mimeType: string): Promise<StorageUploadResult> {
    const safeName = `docs/${Date.now()}-${fileName.replace(/[^a-zA-Z0-0._-]/g, '_')}`;

    if (this.r2Bucket && typeof this.r2Bucket.put === 'function') {
      await this.r2Bucket.put(safeName, buffer, {
        httpMetadata: { contentType: mimeType }
      });
    }

    return {
      fileUrl: `${this.publicDomain}/${safeName}`,
      fileKey: safeName,
      storageProvider: 'r2',
    };
  }

  async getFile(fileKey: string): Promise<Buffer> {
    if (this.r2Bucket && typeof this.r2Bucket.get === 'function') {
      const obj = await this.r2Bucket.get(fileKey);
      const arrayBuffer = await obj.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }
    throw new Error('R2 Bucket binding not available');
  }

  async deleteFile(fileKey: string): Promise<boolean> {
    try {
      if (this.r2Bucket && typeof this.r2Bucket.delete === 'function') {
        await this.r2Bucket.delete(fileKey);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}
