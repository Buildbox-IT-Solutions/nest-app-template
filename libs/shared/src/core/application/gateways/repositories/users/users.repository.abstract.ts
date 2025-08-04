import { UserRepositoryFailure } from '~shared/core/application/gateways/repositories/users/users.repository.errors';
import { UserEntity } from '~shared/core/domain/entities/user/user.entity';
import { Either } from 'effect/Either';

export abstract class AbstractUsersRepository {
  abstract create(
    user: UserEntity,
  ): Promise<Either<UserEntity, UserRepositoryFailure>>;
  abstract findAll(): Promise<Either<UserEntity[], UserRepositoryFailure>>;
  abstract findByEmail(
    email: string,
  ): Promise<Either<UserEntity | null, UserRepositoryFailure>>;
}
