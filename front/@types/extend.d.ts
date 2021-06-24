declare namespace JSX {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'amp-img': any;
  }
}

declare namespace JSX {
  interface AmpImg {
    alt?: string;
    src?: string;
    width?: string;
    height?: string;
    layout?: string;
  }
  interface IntrinsicElements {
    'amp-img': AmpImg;
  }
}
