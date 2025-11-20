import { BaseEntity } from '@shared/entities/base.entity';

/**
 * Grade Entity
 * Represents a grade level (e.g., Grade 1, Grade 2, etc.)
 */
export class Grade extends BaseEntity {
  level: number; // 1-12
  name: string; // "Grade 1", "Grade 2", etc.
  nameAr: string; // "الصف الأول", "الصف الثاني", etc.
  subjectId: string;

  constructor(id: string, level: number, name: string, nameAr: string, subjectId: string) {
    super(id);
    this.level = level;
    this.name = name;
    this.nameAr = nameAr;
    this.subjectId = subjectId;
  }
}
