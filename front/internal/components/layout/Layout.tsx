import Footer from './Footer';
import Header from './Header';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props): JSX.Element {
  return (
    <div style={{ height: '100vh', boxSizing: 'border-box' }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
