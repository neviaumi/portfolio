import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { type PropsWithoutRef } from 'react';

export default function NavigationBar({
  title,
}: PropsWithoutRef<{ title: string }>) {
  return (
    <AppBar
      component={'header'}
      elevation={0}
      position="sticky"
      square={true}
      sx={{
        height: 64,
        justifyContent: 'center',
      }}
      title={title}
    >
      <Toolbar>
        <IconButton
          aria-label="menu"
          color="inherit"
          size={'large'}
          sx={{
            marginRight: 1,
          }}
        >
          <MenuIcon
            sx={{
              transform: 'scale(1.5)',
            }}
          />
        </IconButton>
        <Typography component={'h1'} variant="h4">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
