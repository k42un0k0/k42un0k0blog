import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token';
export function ampMathml(md: MarkdownIt): void {
  md.renderer.rules.math_inline_double = (tokens: Token[], idx: number): string =>
    `<amp-mathml inline layout="container" data-fomula="${
      tokens[idx].markup + tokens[idx].content + tokens[idx].markup
    }"></amp-mathml>`;
  md.renderer.rules.math_inline = (tokens: Token[], idx: number): string =>
    `<amp-mathml inline layout="container" data-fomula="${
      tokens[idx].markup + tokens[idx].content + tokens[idx].markup
    }"></amp-mathml>`;

  md.renderer.rules.math_block_eqno = (tokens: Token[], idx: number): string =>
    `<amp-mathml layout="container" data-fomula="${
      tokens[idx].markup + tokens[idx].content + tokens[idx].markup
    }"></amp-mathml>`;
  md.renderer.rules.math_block = (tokens: Token[], idx: number): string =>
    `<amp-mathml layout="container" data-fomula="${
      tokens[idx].markup + tokens[idx].content + tokens[idx].markup
    }"></amp-mathml>`;
}
