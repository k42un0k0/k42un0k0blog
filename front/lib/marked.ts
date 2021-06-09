import DOMPurify from 'isomorphic-dompurify';
import marked, { use } from 'marked';

const renderer = {
  code(code: string, infostring: string): string {
    // TODO: infostringに合わせてクラス名を変更する
    return `
<div>${infostring}</div>
<pre class="language-diff-ts language-ts diff-highlight line-numbers"><code>${code}</code></pre>`;
  },
};

use({ renderer, sanitizer: DOMPurify.sanitize.bind({}) });

export { marked };
