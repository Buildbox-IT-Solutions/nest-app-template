import { UserEntity } from '~/core/domain/entities/user/user.entity';

export abstract class AbstractUsersRepository {
  abstract create(user: UserEntity): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
