import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { ComponentProps, PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export function Page(props: PropsWithChildren) {
  const { children } = props;
  return (
    <>
      <CssBaseline />
      <Container disableGutters={true}>{children}</Container>
    </>
  );
}

export function Main(props: Omit<ComponentProps<typeof Box>, 'component'>) {
  const { children, ...rest } = props;
  return (
    <Box {...rest} component={'main'}>
      {children}
    </Box>
  );
}
