import { BaseInMemoryRepository } from '~/core/infra/gateways/repositories/in-memory/in-memory.repository.base';
import { AbstractUserRepository } from '~/modules/account/application/gateways/repositories/user.repository';
import { UserEntity } from '~/modules/account/domain/entities/user/user.entity';

export class UserInMemoryRepository
  extends BaseInMemoryRepository<UserEntity>
  implements AbstractUserRepository
{
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.entities.find((entity) => entity.email === email);
  }

  async findByCpf(cpf: string): Promise<UserEntity | undefined> {
    return this.entities.find((entity) => entity.cpf === cpf);
  }

  clear() {
    this.entities = [];
  }
}
