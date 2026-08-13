export interface StorageUploadResult {
  fileUrl: string;
  fileKey: string;
  storageProvider: 'r2' | 'local';
}

export interface IStorageProvider {
  uploadFile(fileName: string, buffer: Buffer, mimeType: string): Promise<StorageUploadResult>;
  getFile(fileKey: string): Promise<Buffer>;
  deleteFile(fileKey: string): Promise<boolean>;
}
