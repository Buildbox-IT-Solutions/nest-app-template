import { Logger } from '@nestjs/common';

export abstract class BaseRepository {
  protected readonly logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }

  protected handleError(error: any): never {
    this.logger.error(`Database error:`, error);

    if (error?.code) {
      throw new Error(`Database error: ${error.message}`);
    }

    throw new Error('Unexpected database error');
  }
}
