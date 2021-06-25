import { useAmp } from 'next/amp';
import { md, mdAmp } from '../utils/md';

export function useMD2HTML(value: string): string {
  const isAmp = useAmp();
  return isAmp ? mdAmp.render(value) : md.render(value);
}
