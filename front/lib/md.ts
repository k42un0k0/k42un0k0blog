/* eslint-disable */
import DOMPurify from 'isomorphic-dompurify';
import katex from 'katex';
import tm from 'markdown-it-texmath';
import markdownIt from 'markdown-it';

const md = markdownIt({ html: true, highlight: DOMPurify.sanitize }).use(tm, {
  engine: katex,
  delimiters: 'dollars',
  katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
});

// const str = "Euler's identity $e^{i\\pi}+1=0$ is a beautiful formula in $\\RR^2$.";
const render = md.render.bind(md);
md.render = (code: string, env?: any) => {
  return DOMPurify.sanitize(render(code, env));
};
export { md };
