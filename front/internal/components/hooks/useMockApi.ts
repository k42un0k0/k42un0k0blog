import { useEffect, useState } from 'react';

type Options = {
  duration: number;
};

type MockResult<T> = { data?: T };

/**
 * １秒遅れで渡された値が返り値のdataに入る
 * @param  {S} mockValue
 * @param  {Options|undefined} options オプション
 * @returns {MockResult} ちょっとだけreact-queryのResultを真似た
 */
export const useMockApi = <T>(mockValue: T, options?: Options): MockResult<T> => {
  const { duration } = options ?? { duration: 1000 };
  const [state, setState] = useState<T | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setState(mockValue);
    }, duration);
  }, []);
  return { data: state };
};
