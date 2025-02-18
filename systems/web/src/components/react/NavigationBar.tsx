import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { type PropsWithoutRef, useState } from 'react';

import GoBackButton from './GoBackButton.tsx';

function GithubIconSvg() {
  return (
    <SvgIcon fontSize="large">
      <svg viewBox="0 0 97.707 97.707" xmlns="http://www.w3.org/2000/svg">
        <Box
          clipRule="evenodd"
          component={'path'}
          d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
          fill="#fff"
          fillRule="evenodd"
        />
      </svg>
    </SvgIcon>
  );
}

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
              size={'small'}
            >
              <MenuOpenIcon fontSize={'large'} />
            </IconButton>
          }
          title={title}
        />
        <List>
          <ListItem>
            <ListItemButton component={'a'} href={'/portfolio/who-am-i'}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon
                  fontSize={'large'}
                  sx={{
                    color: 'action.active',
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
                <WorkOutlinedIcon
                  fontSize={'large'}
                  sx={{
                    color: 'action.active',
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
                  fontSize={'large'}
                  sx={{
                    color: 'action.active',
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
                <WorkHistoryOutlinedIcon
                  fontSize={'large'}
                  sx={{
                    color: 'action.active',
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
                <HomeRepairServiceIcon
                  fontSize={'large'}
                  sx={{
                    color: 'action.active',
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
                  fontSize={'large'}
                  sx={{
                    color: 'action.active',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant={'body1'}>FAQ</Typography>}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={'a'} href={'/portfolio/services'}>
              <ListItemIcon>
                <HandymanOutlinedIcon
                  fontSize={'large'}
                  sx={{
                    color: 'action.active',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant={'body1'}>Services</Typography>}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <IconButton
        aria-label="menu"
        color="inherit"
        onClick={() => setDrawerOpen(true)}
        size={'small'}
      >
        <MenuIcon fontSize={'large'} />
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
        height: 64 + 32,
        justifyContent: 'center',
      }}
      title={title}
    >
      <Toolbar>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: 1,
              }}
            >
              <GoBackButton />
              {drawer}
            </Box>

            <Typography component={'h1'} variant="h4">
              {title}
            </Typography>
          </Box>
          <Box
            component={'a'}
            href={'https://github.com/neviaumi/portfolio'}
            target={'_blank'}
            title={'Source code'}
          >
            <IconButton title={'Navigate to Source code'}>
              <GithubIconSvg />
            </IconButton>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
