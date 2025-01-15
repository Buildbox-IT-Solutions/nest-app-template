import { BadRequestException } from '@nestjs/common';
import { AbstractI18nProvider } from '~/core/application/gateways/providers/i18n/i18n.provider.abstract';
import { UserEntity } from '~/modules/account/domain/entities/user/user.entity';
import { UserInMemoryRepository } from '~/modules/account/infra/gateways/repositories/in-memory/user/user.in-memory.repository';
import { AbstractNotificationFacade } from '~/modules/notification/application/facade/notification.facade.abstract';
import { vi, it, describe } from 'vitest';

import { AbstractUserRepository } from '../../gateways/repositories/user.repository';
import { UpdateUserUseCase } from './update-user.use-case';

const baseUserData = {
  name: 'Random Name',
  email: 'email@gmail.com',
  cpf: '582.353.470-16',
  password: '12345',
};

describe('Updare User UseCase', () => {
  let i18nProviderTMock = vi.fn();
  let sendMessageMock = vi.fn();
  let userRepository: AbstractUserRepository;
  let i18nProvider: AbstractI18nProvider;
  let updateUserUseCase: UpdateUserUseCase;
  let notificationFacade: AbstractNotificationFacade;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    i18nProvider = { t: i18nProviderTMock };
    notificationFacade = { sendMessage: sendMessageMock };
    updateUserUseCase = new UpdateUserUseCase(
      userRepository,
      i18nProvider,
      notificationFacade,
    );
  });

  it('should throw a error when user is not found', async () => {
    await expect(() =>
      updateUserUseCase.execute({ id: 'random', name: 'Random Name' }),
    ).rejects.toThrow(new BadRequestException());

    expect(i18nProvider.t).toHaveBeenCalledWith('general.ERROR.USER_NOT_FOUND');
  });

  it('should update user correctly', async () => {
    const user = new UserEntity(baseUserData);
    await userRepository.create(user);
    const newName = 'New Name';
    await updateUserUseCase.execute({ id: user.id.value, name: newName });
    expect(user.name).toEqual(newName);
    expect(notificationFacade.sendMessage).toHaveBeenCalledTimes(1);
  });
});
