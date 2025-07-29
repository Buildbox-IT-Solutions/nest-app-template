export abstract class AbstractBaseRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | undefined>;
  abstract create(entity: T): Promise<void>;
  abstract update(updatedEntity: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
