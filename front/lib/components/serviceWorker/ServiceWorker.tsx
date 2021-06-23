import { useEffect } from 'react';

export default function ServiceWorker(): JSX.Element {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          console.log('service worker registration successful');
        })
        .catch((err: Error) => {
          console.warn('service worker registration failed', err.message);
        });
    }
  });
  return <></>;
}
