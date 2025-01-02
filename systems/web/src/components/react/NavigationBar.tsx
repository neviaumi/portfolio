import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { type PropsWithoutRef, useState } from 'react';

export function DrawerToggleButton({ title }: { title: string }) {
  const [openDrawer, setDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <Drawer
        onClose={() => setDrawerOpen(false)}
        open={openDrawer}
        PaperProps={{
          sx: {
            maxWidth: '30rem',
            width: { lg: '40%', xs: '80%' },
          },
        }}
      >
        <NavigationBar
          drawer={
            <IconButton
              aria-label="menu"
              color="inherit"
              onClick={() => setDrawerOpen(false)}
              size={'large'}
              sx={{
                marginRight: 1,
              }}
            >
              <MenuOpenIcon
                sx={{
                  transform: 'scale(1.5)',
                }}
              />
            </IconButton>
          }
          title={title}
        />
        <List>
          <ListItem>
            <ListItemButton component={'a'} href={'/portfolio/who-am-i'}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon
                  sx={{
                    color: 'action.active',
                    transform: 'scale(1.7)',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant={'body1'}>Who am I</Typography>}
              />
            </ListItemButton>
          </ListItem>
          <List component="div">
            <ListItemButton
              component={'a'}
              href={'/portfolio/resume'}
              sx={{ pl: 8 }}
            >
              <ListItemIcon>
                <WorkHistoryOutlinedIcon
                  sx={{
                    color: 'action.active',
                    transform: 'scale(1.7)',
                  }}
                />{' '}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant={'body1'}>Resume</Typography>}
              />
            </ListItemButton>
          </List>
          <ListItem>
            <ListItemButton component={'a'} href={'/portfolio/core-values'}>
              <ListItemIcon>
                <DiamondOutlinedIcon
                  sx={{
                    color: 'action.active',
                    transform: 'scale(1.7)',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant={'body1'}>Core values</Typography>}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={'a'} href={'/portfolio/experiences'}>
              <ListItemIcon>
                <ScienceOutlinedIcon
                  sx={{
                    color: 'action.active',
                    transform: 'scale(1.7)',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant={'body1'}>Experiences</Typography>}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={'a'} href={'/portfolio/skills'}>
              <ListItemIcon>
                <HandymanOutlinedIcon
                  sx={{
                    color: 'action.active',
                    transform: 'scale(1.7)',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant={'body1'}>Skills</Typography>}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={'a'} href={'/portfolio/faq'}>
              <ListItemIcon>
                <QuizOutlinedIcon
                  sx={{
                    color: 'action.active',
                    transform: 'scale(1.7)',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant={'body1'}>FAQ</Typography>}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <IconButton
        aria-label="menu"
        color="inherit"
        onClick={() => setDrawerOpen(true)}
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
    </>
  );
}

export default function NavigationBar({
  drawer,
  title,
}: PropsWithoutRef<{ drawer?: React.ReactNode; title: string }>) {
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
        {drawer}
        <Typography component={'h1'} variant="h4">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
