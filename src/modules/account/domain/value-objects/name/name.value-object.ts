export class Name {
  private _value: string;

  constructor(name: string) {
    if (!this.isValidName(name)) throw new Error('Invalid name');
    this._value = name;
  }

  private isValidName(name: string) {
    return name.match(/[a-zA-Z] [a-zA-Z]+/);
  }

  get value() {
    return this._value;
  }
}
