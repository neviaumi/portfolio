import Box from '@mui/material/Box';
import React from 'react';

import GoBackButton from './GoBackButton.tsx';
import ScrollToTopButton from './ScrollToTopButton.tsx';

export default function OverlayButtons() {
  return (
    <Box
      sx={{
        bottom: 8,
        display: 'flex',
        justifyContent: 'space-between',
        paddingX: 1,
        position: 'sticky',
      }}
    >
      <GoBackButton />
      <ScrollToTopButton />
    </Box>
  );
}
