import { useAmp } from 'next/amp';
import { md, mdAmp } from './markdownIt';

export function useMd2Html(value: string): string {
  const isAmp = useAmp();
  return isAmp ? mdAmp.render(value) : md.render(value);
}
