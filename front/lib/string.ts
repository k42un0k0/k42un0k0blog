import dayjs from 'dayjs';

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

export const formatFromISO =
  (f: string): ((date: string) => string) =>
  (d): string =>
    dayjs(d).format(f);
