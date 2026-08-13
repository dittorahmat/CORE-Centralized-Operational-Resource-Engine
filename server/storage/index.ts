import { IStorageProvider } from './IStorageProvider';
import { LocalStorageProvider } from './LocalStorageProvider';
import { R2StorageProvider } from './R2StorageProvider';

export function detectDeploymentEnvironment(): 'cloudflare' | 'on-premise' {
  if (typeof globalThis !== 'undefined' && 'WebSocketPair' in globalThis) {
    return 'cloudflare';
  }
  if (process.env.DEPLOYMENT_MODE === 'cloudflare') {
    return 'cloudflare';
  }
  return 'on-premise';
}

let activeProvider: IStorageProvider | null = null;

export function getStorageProvider(r2Binding?: any): IStorageProvider {
  if (!activeProvider) {
    const envMode = detectDeploymentEnvironment();
    if (envMode === 'cloudflare' || r2Binding) {
      console.log('☁️ Active Storage Provider: Cloudflare R2 Storage');
      activeProvider = new R2StorageProvider(r2Binding);
    } else {
      console.log('🖥️ Active Storage Provider: Local Server Disk Storage (/uploads)');
      activeProvider = new LocalStorageProvider();
    }
  }
  return activeProvider;
}
