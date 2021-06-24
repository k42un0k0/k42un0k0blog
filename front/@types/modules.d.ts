declare module 'markdown-it-texmath' {
  const d: any;
  export default d;
}

declare module 'reveal.js' {
  type Reveal = new (arg: any) => { initialize: () => void };
  const d: Reveal;
  export default d;
}

declare module 'reveal.js/plugin/markdown/markdown.esm.js' {
  const d: any;
  export default d;
}
