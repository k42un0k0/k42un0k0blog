import dayjs from 'dayjs';
import * as E from 'fp-ts/Either';
import { flow } from 'fp-ts/function';
import { jsonToAuth } from '../../lib/model/auth';
import { isNotEmpty } from '../../lib/string';
import {
  ExpiredException,
  NullValueException,
  RequiredValidationException,
} from './../../lib/throwable/runtimeException';
import type { Auth } from '../../api/@types';
import type * as yup from 'yup';

type ValidateTokenError =
  | ExpiredException<string>
  | NullValueException
  | RequiredValidationException<string>
  | yup.ValidationError;

export const validateToken: (v: string | undefined) => E.Either<ValidateTokenError, Auth> = flow(
  E.fromNullable(new NullValueException('token')),
  E.filterOrElseW(isNotEmpty, (a) => new RequiredValidationException('token', a)),
  E.chainW(jsonToAuth),
  E.filterOrElseW(
    (a) => dayjs(a.expire).isAfter(dayjs()),
    (a) => new ExpiredException('token', a.token, a.expire)
  )
);
