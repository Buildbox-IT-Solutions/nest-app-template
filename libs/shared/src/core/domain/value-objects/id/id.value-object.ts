import { v7 as uuidV7 } from 'uuid';
import { z } from 'zod';

const UUID_V7_PATTERN =
  /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export abstract class BasePrimaryKey {
  abstract get value(): string;
}

export class Id implements BasePrimaryKey {
  private _id: string;

  private static schema = z.string().refine(
    (id) => {
      if (!UUID_V7_PATTERN.test(id)) {
        return false;
      }

      const timestamp = parseInt(id.slice(0, 8), 16);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      return timestamp <= currentTimestamp;
    },
    { message: 'Invalid UUIDv7 format' },
  );

  constructor(id?: string) {
    this._id = id ? Id.schema.parse(id) : uuidV7();
  }

  get value(): string {
    return this._id;
  }
}
