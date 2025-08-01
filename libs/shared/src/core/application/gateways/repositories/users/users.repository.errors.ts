export class UserCreationError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}

export class UserRepositoryError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}

export type UserRepositoryFailure = UserCreationError | UserNotFoundError;
