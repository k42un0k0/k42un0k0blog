import { compareAsc } from 'date-fns';
import * as E from 'fp-ts/Either';
import { flow, constant } from 'fp-ts/function';
import { jsonToAuth } from '../../../apiModel/auth';
import { isNotEmpty } from '../../../lib/string';
import type { Auth } from '../../../api/@types';
import type { ValidationError } from 'yup';

export class NullError extends Error {
  message = 'token is null';
}

export class ExpiredError extends Error {
  message = 'token is expired';

  constructor(private readonly expiredToken: string) {
    super();
  }

  get ExpiredToken(): string {
    return this.expiredToken;
  }
}

type ValidateTokenError = ExpiredError | NullError | ValidationError;

export const validateToken: (v: string | undefined) => E.Either<ValidateTokenError, Auth> = flow(
  E.fromNullable<ValidateTokenError>(new NullError()),
  E.filterOrElse(isNotEmpty, constant(new NullError())),
  E.chain<ValidateTokenError, string, Auth>(jsonToAuth),
  E.filterOrElse<ValidateTokenError, Auth>(
    (a) => compareAsc(new Date(a.expire), Date.now()) < 0,
    (a) => new ExpiredError(a.token)
  )
);
