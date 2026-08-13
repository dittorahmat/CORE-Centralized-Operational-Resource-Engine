import * as pdfParseModule from 'pdf-parse';
import mammoth from 'mammoth';
import * as xlsx from 'xlsx';

const pdfParse = typeof pdfParseModule === 'function' ? pdfParseModule : (pdfParseModule as any).default || pdfParseModule;

export async function parseDocumentContent(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
  const ext = fileName.toLowerCase().split('.').pop() || '';

  try {
    if (ext === 'pdf' || mimeType.includes('pdf')) {
      const data = await pdfParse(fileBuffer);
      return data.text || '';
    }

    if (ext === 'docx' || mimeType.includes('officedocument.wordprocessingml')) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value || '';
    }

    if (ext === 'xlsx' || ext === 'xls' || ext === 'csv' || mimeType.includes('spreadsheet') || mimeType.includes('excel')) {
      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      let fullText = '';
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        fullText += `--- Sheet: ${sheetName} ---\n` + xlsx.utils.sheet_to_csv(sheet) + '\n\n';
      });
      return fullText;
    }

    // Default plain text / markdown / json
    return fileBuffer.toString('utf-8');
  } catch (err) {
    console.error(`Error parsing file ${fileName}:`, err);
    return fileBuffer.toString('utf-8');
  }
}

export function chunkText(text: string, chunkSize: number = 800, overlap: number = 150): string[] {
  const cleanText = text.replace(/\r\n/g, '\n').trim();
  if (!cleanText) return [];
  if (cleanText.length <= chunkSize) return [cleanText];

  const chunks: string[] = [];
  let start = 0;

  while (start < cleanText.length) {
    let end = start + chunkSize;
    if (end < cleanText.length) {
      // Find space boundary
      const lastSpace = cleanText.lastIndexOf(' ', end);
      if (lastSpace > start + chunkSize / 2) {
        end = lastSpace;
      }
    }
    chunks.push(cleanText.slice(start, end).trim());
    start = end - overlap;
  }

  return chunks.filter((c) => c.length > 20);
}
