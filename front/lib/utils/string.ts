import dayjs from 'dayjs';
import { flow } from 'fp-ts/lib/function';

export function filterInt(value: string): number {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return NaN;
  }
}

export function filterIntAndFloat(value: string): number {
  if (/^[-+]?(\d+(\.\d*)?|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return NaN;
  }
}

export function isEmpty(v: string): boolean {
  return v === '';
}

export function isNotEmpty(v: string): boolean {
  return !isEmpty(v);
}

export const formatFromISO = (f: string): ((date: string) => string) => flow(dayjs, () => f);
