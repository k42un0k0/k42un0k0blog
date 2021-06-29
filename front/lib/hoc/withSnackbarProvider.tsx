import { SnackbarProvider } from 'notistack';

export function withSnackbarProvider(Component: React.VFC): React.VFC {
  return function WithSnackbarProvider(): JSX.Element {
    return (
      <SnackbarProvider maxSnack={3}>
        <Component />
      </SnackbarProvider>
    );
  };
}
