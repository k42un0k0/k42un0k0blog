/** @jsxImportSource react */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { extractCritical } from '../lib/emotion';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const emo = extractCritical(page.html);
    const styles = (
      <>
        {initialProps.styles}
        <style key="custom" data-emotion-css={emo.ids.join(' ')} dangerouslySetInnerHTML={{ __html: emo.css }} />
      </>
    );
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
