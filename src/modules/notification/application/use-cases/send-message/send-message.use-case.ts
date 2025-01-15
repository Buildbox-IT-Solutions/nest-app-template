import AbstractUseCase from '~/core/application/use-cases/use-case.abstract';

export class SendMessageUseCase implements AbstractUseCase {
  async execute(message: string): Promise<string> {
    return message;
  }
}
