import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function ExperiencesSection({
  works,
}: {
  works: Array<{
    brief: string;
    name: string;
    role: string;
  }>;
}) {
  return (
    <section title={'Experiences'}>
      <Typography
        component={'header'}
        sx={{
          textAlign: 'center',
        }}
        variant={'h4'}
      >
        Experiences
      </Typography>
      <Box
        sx={{
          overflowY: 'scroll',
          scrollbarWidth: 'none',
        }}
      >
        <Stack
          component={'ul'}
          direction={'row'}
          spacing={0.5}
          sx={{
            marginBottom: 1,
            marginTop: 0.5,
            padding: 0,
            width: 'fit-content',
          }}
        >
          {works.map(work => {
            return (
              <Card
                component={'li'}
                key={work.name}
                sx={{
                  '&:hover': {
                    borderColor: 'action.active',
                  },
                  border: 1,
                  borderColor: 'transparent',
                  width: {
                    lg: '24rem',
                    xs: '100vw',
                  },
                }}
                tabIndex={0}
                title={work.name}
              >
                <Link
                  href={`/portfolio/experiences#${work.name}`}
                  underline="hover"
                >
                  <CardHeader
                    component={'header'}
                    slotProps={{
                      subheader: {
                        variant: 'body2',
                      },
                      title: {
                        color: 'text.primary',
                        variant: 'h5',
                      },
                    }}
                    subheader={work.role}
                    title={work.name}
                  />
                  <CardContent>
                    <Typography
                      component={'p'}
                      sx={{
                        color: 'text.primary',
                      }}
                      variant="body1"
                    >
                      {work.brief}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </section>
  );
}
