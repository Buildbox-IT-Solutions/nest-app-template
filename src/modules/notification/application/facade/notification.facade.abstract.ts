export abstract class AbstractNotificationFacade {
  abstract sendMessage(message: string): Promise<string>;
}
