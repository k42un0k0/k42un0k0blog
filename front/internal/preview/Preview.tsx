/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useRef, useState, useEffect } from 'react';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/moon.css';
import * as yup from 'yup';

const postSchema = yup.object({
  value: yup.string().nullable(),
  print: yup.bool(),
});

export default function Preview(): JSX.Element {
  const deck = useRef<any>(null);
  const [value, setValue] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.origin !== 'http://localhost:3000') return;
        const data = postSchema.validateSync(event.data);
        if (data.print == true) {
          window.print();
        }
        if (data.value != null) {
          setValue(data.value);
        } else {
          //@ts-expect-error postmessageは関数です
          event.source?.postMessage({ connected: true }, event.origin);
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    if (value === '') return;
    if (process.browser && typeof window !== 'undefined') {
      document.documentElement.classList.add('print-pdf');
      const { default: Reveal } = require('reveal.js');
      const HighLight = require('reveal.js/plugin/highlight/highlight.js');
      const Markdown = require('reveal.js/plugin/markdown/markdown.js');
      deck.current = new Reveal({
        plugins: [Markdown, HighLight],
      });
      deck.current.initialize();
    }
  }, [value]);

  return (
    <div className="reveal reveal-viewport" ref={ref}>
      <div className="slides">
        <section data-markdown="">
          <textarea
            data-template
            value={value}
            onChange={(): void => {
              void 0;
            }}
          ></textarea>
        </section>
      </div>
    </div>
  );
}
