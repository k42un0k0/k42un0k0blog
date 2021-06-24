/** @jsxImportSource react */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { extractCritical } from '../lib/emotion';
// @ts-expect-error aaa
// eslint-disable-next-line import/no-unresolved
import draculaCss from '!!raw-loader!../styles/dracula.css';
// @ts-expect-error aaa
// eslint-disable-next-line import/no-unresolved
import css from '!!raw-loader!../styles/globals.css';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const emo = extractCritical(page.html);
    const styles = [
      //@ts-expect-error aaa
      ...initialProps.styles,
      <style
        key="custom"
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          __html: `${css}\n${draculaCss}`,
        }}
      />,
      <style key="custom" data-emotion-css={emo.ids.join(' ')} dangerouslySetInnerHTML={{ __html: emo.css }} />,
    ];
    return { ...initialProps, styles };
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
