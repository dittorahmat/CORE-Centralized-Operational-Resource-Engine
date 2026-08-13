import { pgTable, text, timestamp, varchar, integer, vector, jsonb } from 'drizzle-orm/pg-core';

export const documents = pgTable('documents', {
  id: varchar('id', { length: 255 }).primaryKey(),
  title: text('title').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  fileType: varchar('file_type', { length: 50 }).notNull(),
  fileSize: varchar('file_size', { length: 50 }),
  fileUrl: text('file_url'),
  author: varchar('author', { length: 255 }),
  department: varchar('department', { length: 100 }),
  status: varchar('status', { length: 50 }).default('Indexed'),
  summary: text('summary'),
  tags: jsonb('tags').$type<string[]>(),
  contentExcerpt: text('content_excerpt'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const documentEmbeddings = pgTable('document_embeddings', {
  id: varchar('id', { length: 255 }).primaryKey(),
  documentId: varchar('document_id', { length: 255 }).references(() => documents.id, { onDelete: 'cascade' }),
  chunkIndex: integer('chunk_index').notNull(),
  chunkContent: text('chunk_content').notNull(),
  embedding: vector('embedding', { dimensions: 768 }),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
