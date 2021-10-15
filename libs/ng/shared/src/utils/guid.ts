/* eslint-disable @typescript-eslint/no-magic-numbers */
export class Guid {
  public static validator: RegExp = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');

  public static empty: string = '00000000-0000-0000-0000-000000000000';

  private _value: string;

  constructor(guid: string) {
    this._value = guid;
  }

  public static create(): Guid {
    return new Guid([Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join('-'));
  }

  public static createEmpty(): Guid {
    return new Guid('emptyguid');
  }

  public static parse(guid: string): Guid {
    return new Guid(guid);
  }

  public static raw(): string {
    return [Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join('-');
  }

  private static gen(count: number): string {
    let out: string = '';
    for (let i: number = 0; i < count; i++) {
      out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return out;
  }

  public isEmpty(): boolean {
    return this._value === Guid.empty;
  }

  public toString(): string {
    return this._value;
  }

  public toJSON(): { [key: string]: string } {
    return {
      value: this._value
    };
  }
}
