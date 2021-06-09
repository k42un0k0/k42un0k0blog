import 'easymde/dist/easymde.min.css';
import { useState } from 'react';
import { md } from '../../../lib/md';
import { useHighlight } from '../../hooks/useHighlight';

export default function BlogsShow(): JSX.Element {
  const [markdown] = useState(`
  # hello
  im markdown text
  \`\`\`ts
  + const a = 1;
  const a = 1;
  \`\`\`
  <button>click</button>
  `);

  const ref = useHighlight([markdown]);
  return (
    <div>
      <span
        ref={ref}
        dangerouslySetInnerHTML={{
          __html: md.render(markdown),
        }}
      />
    </div>
  );
}
