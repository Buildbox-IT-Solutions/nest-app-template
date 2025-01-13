import { Injectable } from '@nestjs/common';

import { AbstractNotificationFacade } from '../../application/facade/notification.facade.abstract';
import { SendMessageUseCase } from '../../application/use-cases/send-message/send-message.use-case';

@Injectable()
export class NotificationFacade implements AbstractNotificationFacade {
  async sendMessage(input: string): Promise<string> {
    const sendMessageUseCase = new SendMessageUseCase();
    return sendMessageUseCase.execute(input);
  }
}
