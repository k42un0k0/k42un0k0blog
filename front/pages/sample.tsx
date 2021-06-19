/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useDebounce } from 'react-use';
import { useRef, useState, useEffect } from 'react';
import { flex } from '../lib/styles/utils';

export default function Sample(): JSX.Element {
  const [value, setValue] = useState(`
  ## Slide 1
  A paragraph with some text and a [link](http://hakim.se).
  ---
  ## Slide 2
  ---
  ## Slide 3
  \`\`\`js [1-2|3|4]
  let a = 1;
  let b = 2;
  let c = x => 1 + 2 + x;
  c(3);
  \`\`\`
  `);
  const ref = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef(0);
  useDebounce(
    () => {
      ref.current?.setAttribute('src', 'http://localhost:3000/_preview');
      clearInterval(timerRef.current);
      // 疎通確認
      timerRef.current = setInterval(() => {
        ref.current?.contentWindow?.postMessage({ ready: true }, 'http://localhost:3000');
      }, 100) as any;
    },
    1000,
    [value]
  );
  useEffect(() => {
    // 疎通確認への返信があれば値を送信する
    const onMessage = (event: any): void => {
      if (event.origin !== 'http://localhost:3000') return;
      if (event.data.isReady) {
        clearInterval(timerRef.current);
        ref.current?.contentWindow?.postMessage(value, 'http://localhost:3000');
      }
    };
    window.addEventListener('message', onMessage);
    return (): void => {
      window.removeEventListener('message', onMessage);
    };
  }, [value]);

  return (
    <div sx={{ ...flex.center }}>
      <textarea
        value={value}
        onChange={(e): void => {
          setValue(e.target.value);
        }}
      ></textarea>
      <iframe ref={ref} src="/_preview" style={{ width: 500, height: 500 }}></iframe>
    </div>
  );
}
