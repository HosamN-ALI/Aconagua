/**
 * Base Entity
 * Abstract base class for all domain entities
 */
export abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  protected constructor(id: string) {
    this.id = id;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Updates the entity timestamp
   */
  protected touch(): void {
    this.updatedAt = new Date();
  }
}
