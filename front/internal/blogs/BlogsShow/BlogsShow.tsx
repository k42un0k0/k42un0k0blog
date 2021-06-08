import 'easymde/dist/easymde.min.css';
import 'highlightjs';
import DOMPurify from 'isomorphic-dompurify';
import marked from 'marked';
import 'highlightjs/styles/docco.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Editor = dynamic(async (): Promise<any> => import('react-simplemde-editor'), { ssr: false });

export default function BlogsShow(): JSX.Element {
  const [markdown, setMarkdown] = useState('');

  return (
    <div>
      <Editor
        onChange={(e: string): void => {
          setMarkdown(e);
        }}
      />
      <div id="body">
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked(markdown)),
          }}
        />
      </div>
    </div>
  );
}
