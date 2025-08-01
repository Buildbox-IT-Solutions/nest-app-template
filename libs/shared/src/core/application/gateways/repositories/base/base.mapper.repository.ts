export abstract class BaseMapperRepository<Model, Entity> {
  abstract toEntity(model: Model): Entity;
  abstract toEntityArray(models: Model[]): Entity[];
  abstract toModel(entity: Entity): Model;
  abstract toModelArray(entities: Entity[]): Model[];
}
