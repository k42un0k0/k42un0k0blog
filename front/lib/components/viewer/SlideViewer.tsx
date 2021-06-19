/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useDebounce } from 'react-use';
import { useRef, useEffect } from 'react';
import * as yup from 'yup';

function useIntervalTimer(delay: number): { start: (a: () => void) => void; stop: () => void } {
  const timerRef = useRef(0);
  const stop = (): void => {
    clearInterval(timerRef.current);
  };
  const start = (fn: () => void): void => {
    stop();
    timerRef.current = setInterval(fn, delay) as any;
  };
  return { start, stop };
}

const postSchema = yup.object({
  connected: yup.bool(),
});
type Props = { value: string };
export default function Sample({ value }: Props): JSX.Element {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const timer = useIntervalTimer(100);
  const checkConnect = (): void => {
    iframeRef.current?.contentWindow?.postMessage({ value: null }, 'http://localhost:3000');
  };
  const postValue = (): void => {
    iframeRef.current?.contentWindow?.postMessage({ value }, 'http://localhost:3000');
  };
  const reloadAndCheckConnect = (): void => {
    iframeRef.current?.setAttribute('src', 'http://localhost:3000/_preview');
    timer.start(checkConnect);
  };
  const postValueWhenConnect = (event: any): void => {
    if (event.origin !== 'http://localhost:3000') return;
    const data = postSchema.validateSync(event.data);
    if (data.connected) {
      timer.stop();
      postValue();
    }
  };
  useDebounce(reloadAndCheckConnect, 1000, [value]);
  useEffect(() => {
    window.addEventListener('message', postValueWhenConnect);
    return (): void => {
      window.removeEventListener('message', postValueWhenConnect);
    };
  }, [value]);

  return <iframe ref={iframeRef} style={{ width: 500, height: 500 }}></iframe>;
}
