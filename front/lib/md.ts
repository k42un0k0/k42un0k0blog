/* eslint-disable */
import DOMPurify from 'isomorphic-dompurify';
import katex from 'katex';
import tm from 'markdown-it-texmath';
import markdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';

const md = markdownIt({ html: true })
  .use(anchor)
  .use(tm, {
    engine: katex,
    delimiters: 'dollars',
    katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
  })
  .use(require('markdown-it-table-of-contents'), {
    includeLevel: [1, 2, 3],
  });
// const str = "Euler's identity $e^{i\\pi}+1=0$ is a beautiful formula in $\\RR^2$.";
const render = md.render.bind(md);
md.render = (code: string, env?: any) => {
  return DOMPurify.sanitize(render(code, env));
};
export { md };
