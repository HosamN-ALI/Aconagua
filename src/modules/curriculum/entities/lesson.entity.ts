import { BaseEntity } from '@shared/entities/base.entity';

/**
 * Lesson Entity
 * Represents a lesson within a chapter
 */
export class Lesson extends BaseEntity {
  title: string;
  titleAr: string;
  content?: string; // Lesson content in markdown or HTML
  contentAr?: string;
  objectives?: string[]; // Learning objectives
  objectivesAr?: string[];
  order: number;
  chapterId: string;
  embeddings?: number[]; // Vector embeddings for RAG

  constructor(
    id: string,
    title: string,
    titleAr: string,
    order: number,
    chapterId: string,
  ) {
    super(id);
    this.title = title;
    this.titleAr = titleAr;
    this.order = order;
    this.chapterId = chapterId;
  }
}
