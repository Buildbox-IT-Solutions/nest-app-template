export abstract class BaseViewMapper<Entity, DTO> {
  abstract fromDto(dto: DTO): Entity;
  abstract fromEntity(entity: Entity): DTO;
}
