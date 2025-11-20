import { BaseEntity } from '@shared/entities/base.entity';

/**
 * Subject Entity
 * Represents a subject in the curriculum (e.g., Mathematics)
 */
export class Subject extends BaseEntity {
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;

  constructor(id: string, name: string, nameAr: string) {
    super(id);
    this.name = name;
    this.nameAr = nameAr;
  }
}
