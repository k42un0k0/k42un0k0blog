/**
 * undefinedかnullが見つかった時のException
 * @param  {string} name nullかundefinedの変数の名前
 */
export class NullValueException extends Error {
  constructor(name: string) {
    const message = `${name} is null value`;
    super(message);
  }
}

/**
 * バリデーションエラー
 */
export class ValidationException<T> extends Error {
  readonly value: T;

  constructor(message: string, value: T) {
    super(message);
    this.value = value;
  }
}

/**
 * required用のバリデーションエラー
 */
export class RequiredValidationException<T> extends ValidationException<T> {
  constructor(name: string, value: T) {
    const message = `${name} was not required but got ${JSON.stringify(value)}`;
    super(message, value);
  }
}

export class ExpiredException<T> extends Error {
  value: T;

  expire: string;

  constructor(name: string, value: T, expire: string) {
    const message = `${name} is expired`;
    super(message);
    this.value = value;
    this.expire = expire;
  }
}
