import { renderToString } from 'katex';
export function katex(src: string): string {
  return src.replace(/\${1,2}([^$\n]+?)\${1,2}/g, (m, katexstr: string) => renderToString(katexstr));
}
