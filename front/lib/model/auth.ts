import * as yup from 'yup';
import { jsonTo } from '../schema';
import type { Auth } from '../../api/@types';

export const authSchema = yup.object({
  code: yup.number().required(),
  expire: yup.string().required(),
  token: yup.string().required(),
});

export const jsonToAuth = jsonTo<Auth>(authSchema);
