import { describe, it } from 'vitest';

import { SendMessageUseCase } from './send-message.use-case';

describe('Receive Message UseCase', () => {
  let sendMessageUseCase: SendMessageUseCase;

  beforeEach(() => {
    sendMessageUseCase = new SendMessageUseCase();
  });

  it('should return a message', async () => {
    const message = 'message';
    const success = await sendMessageUseCase.execute(message);
    expect(success).toEqual(message);
  });
});
