import dynamic from 'next/dynamic';
import Footer from './Footer';
import type { ReactNode } from 'react';

const Header = dynamic(async () => import('./Header'));
type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props): RenderReturnType {
  return (
    <div sx={{ height: '100vh', boxSizing: 'border-box' }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
