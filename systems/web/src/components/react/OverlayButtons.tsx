import Box from '@mui/material/Box';
import React from 'react';

import ChatRoomButton from './ChatRoomButton.tsx';
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
      <ScrollToTopButton />
      <ChatRoomButton />
    </Box>
  );
}
