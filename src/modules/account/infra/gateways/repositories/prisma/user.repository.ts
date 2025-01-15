import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/core/infra/gateways/repositories/prisma/connection/prisma.service';
import { AbstractUserRepository } from '~/modules/account/application/gateways/repositories/user.repository';
import { UserEntity } from '~/modules/account/domain/entities/user/user.entity';
import { UserMapper } from '~/modules/account/domain/mappers/user.mapper';

@Injectable()
export class UserRepository implements AbstractUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) return;
      return UserMapper.toEntity(user);
    } catch (error) {
      throw new Error(error.meta.cause);
    }
  }

  async findByCpf(cpf: string): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          cpf: cpf,
        },
      });
      if (!user) return;
      return UserMapper.toEntity(user);
    } catch (error) {
      throw new Error(error.meta.cause);
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) return;
      return UserMapper.toEntity(user);
    } catch (error) {
      throw new Error(error.meta.cause);
    }
  }

  async findAll(): Promise<UserEntity[] | undefined> {
    try {
      const users = await this.prisma.user.findMany({});
      return users?.map((user) => UserMapper.toEntity(user));
    } catch (error) {
      throw new Error(error.meta.cause);
    }
  }

  async create(input: UserEntity): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          cpf: input.cpf,
          active: input.active,
        },
      });
    } catch (error) {
      throw new Error(error.meta.cause);
    }
  }

  async update(input: UserEntity): Promise<void> {
    try {
      await this.prisma.user.update({
        data: {
          name: input.name,
          cpf: input.cpf,
          active: input.active,
        },
        where: {
          id: input.id.value,
        },
      });
    } catch (error) {
      throw new Error(error.meta.cause);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(error.meta.cause);
    }
  }
}
