import { AbstractBaseRepository } from '~/core/application/gateways/repositories/base.repository';
import { UserEntity } from '~/modules/account/domain/entities/user/user.entity';

export abstract class AbstractUserRepository extends AbstractBaseRepository<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | undefined>;
  abstract findByCpf(cpf: string): Promise<UserEntity | undefined>;
}
