import DOMPurify from 'isomorphic-dompurify';
import katex from 'katex';
import anchor from 'markdown-it-anchor';
import toc from 'markdown-it-table-of-contents';
import tm from 'markdown-it-texmath';
import markdownIt from 'markdown-it';
import { ampMathml } from './amp-mathml';
import type MarkdownIt from 'markdown-it';

const md = markdownIt({ html: true })
  .use(anchor)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  .use(tm, {
    engine: katex,
    delimiters: 'dollars',
    katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  .use(toc, {
    includeLevel: [1, 2, 3],
  });

const mdAmp = markdownIt({ html: true })
  .use(anchor)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  .use(tm, {
    engine: katex,
    delimiters: 'dollars',
    katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  .use(toc, {
    includeLevel: [1, 2, 3],
  })
  .use(ampMathml);

function sanitize(m: MarkdownIt): void {
  const render = m.render.bind(m);
  m.render = (code: string, env?: any): string => {
    return DOMPurify.sanitize(render(code, env), { ADD_TAGS: ['amp-mathml'], ADD_ATTR: ['layout', 'inline'] });
  };
}

sanitize(md);
sanitize(mdAmp);

export { md };
