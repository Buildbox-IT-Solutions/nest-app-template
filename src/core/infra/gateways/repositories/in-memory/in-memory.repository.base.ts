import { AbstractBaseRepository } from '~/core/application/gateways/repositories/base.repository';
import Id from '~/core/domain/value-objects/id.value-object';

export class BaseInMemoryRepository<T extends { id: Id }>
  implements AbstractBaseRepository<T>
{
  entities: T[] = [];

  async findAll(): Promise<T[]> {
    return this.entities;
  }

  async findById(id: string): Promise<T | undefined> {
    return this.entities.find((entity) => entity.id.value === id);
  }

  async create(entity: T): Promise<void> {
    const userFound = await this.findById(entity.id.value);
    if (userFound)
      throw new Error(`Entity with id "${entity.id.value}" already exists.`);
    this.entities.push(entity);
  }

  async update(updatedEntity: T): Promise<void> {
    const index = this.entities.findIndex(
      (entity) => entity.id === updatedEntity.id,
    );
    if (index === -1)
      throw new Error(`Entity with id "${updatedEntity.id.value}" not found.`);

    const existingEntity = this.entities[index];
    const mergedEntity = { ...existingEntity, ...updatedEntity };
    this.entities[index] = mergedEntity as T;
  }

  async delete(id: string): Promise<void> {
    const index = this.entities.findIndex((entity) => entity.id.value === id);
    if (index === -1) throw new Error(`Entity with id "${id}" not found.`);
    this.entities.splice(index, 1);
  }
}
