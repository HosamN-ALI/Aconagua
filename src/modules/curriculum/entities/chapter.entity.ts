import { BaseEntity } from '@shared/entities/base.entity';

/**
 * Chapter Entity
 * Represents a chapter within a grade's curriculum
 */
export class Chapter extends BaseEntity {
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  order: number; // Sequential order within the grade
  gradeId: string;

  constructor(
    id: string,
    title: string,
    titleAr: string,
    order: number,
    gradeId: string,
  ) {
    super(id);
    this.title = title;
    this.titleAr = titleAr;
    this.order = order;
    this.gradeId = gradeId;
  }
}
