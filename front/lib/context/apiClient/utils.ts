import dayjs from 'dayjs';
import * as E from 'fp-ts/Either';
import { flow, constant } from 'fp-ts/function';
import { isNotEmpty } from '../../../lib/utils/string';
import { jsonToAuth } from '../../apiModel/auth';
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
  E.fromNullable(new NullError()),
  E.filterOrElse(isNotEmpty, constant(new NullError())),
  E.chainW(jsonToAuth),
  E.filterOrElseW(
    (a) => dayjs(a.expire).isAfter(dayjs()),
    (a) => new ExpiredError(a.token)
  )
);
