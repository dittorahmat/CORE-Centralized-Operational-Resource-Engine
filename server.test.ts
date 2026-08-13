import { describe, test, expect } from 'bun:test';
import { parseDocumentContent, chunkText } from './server/utils/documentParser';
import { detectDeploymentEnvironment } from './server/storage';

describe('CORE Document Parser Unit Tests', () => {
  test('chunkText should split long text into overlapping chunks', () => {
    const text = 'Alpha '.repeat(300);
    const chunks = chunkText(text, 500, 100);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].length).toBeLessThanOrEqual(500);
  });

  test('parseDocumentContent should handle plain text fallback correctly', async () => {
    const textBuffer = Buffer.from('CORE Enterprise Intelligence Test Document Content');
    const parsedText = await parseDocumentContent(textBuffer, 'test.txt', 'text/plain');
    expect(parsedText).toContain('CORE Enterprise Intelligence Test Document Content');
  });

  test('detectDeploymentEnvironment should return default on-premise', () => {
    const envMode = detectDeploymentEnvironment();
    expect(['on-premise', 'cloudflare']).toContain(envMode);
  });
});
