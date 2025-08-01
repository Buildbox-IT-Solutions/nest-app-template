import { UserRepositoryFailure } from '~/core/application/gateways/repositories/users/users.repository.errors';
import { UserEntity } from '~/core/domain/entities/user/user.entity';
import { Either } from 'fp-ts/lib/Either';

export abstract class AbstractUsersRepository {
  abstract create(
    user: UserEntity,
  ): Promise<Either<UserRepositoryFailure, UserEntity>>;
  abstract findAll(): Promise<Either<UserRepositoryFailure, UserEntity[]>>;
  abstract findByEmail(
    email: string,
  ): Promise<Either<UserRepositoryFailure, UserEntity | null>>;
}
