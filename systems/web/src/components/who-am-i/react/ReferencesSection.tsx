import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function ReferencesSection({
  references,
}: {
  references: Array<{
    comments: string;
    name: string;
    profilePicture: string;
    relationship: string;
  }>;
}) {
  return (
    <section title={'Recommends from co-workers'}>
      <Typography
        component={'header'}
        sx={{
          textAlign: 'center',
        }}
        variant={'h4'}
      >
        Recommends from co-workers
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
          {references.map(reference => {
            return (
              <Card
                aria-description={reference.comments}
                component={'li'}
                key={reference.name}
                sx={{
                  width: {
                    lg: '24rem',
                    xs: '100vw',
                  },
                }}
                tabIndex={0}
                title={reference.name}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={reference.name}
                      src={reference.profilePicture}
                    />
                  }
                  component={'header'}
                  slotProps={{
                    subheader: {
                      variant: 'body2',
                    },
                    title: {
                      variant: 'h5',
                    },
                  }}
                  slots={{
                    subheader: Typography,
                    title: Typography,
                  }}
                  subheader={reference.relationship}
                  title={reference.name}
                />
                <CardContent>
                  <Typography component={'p'} variant="body1">
                    {reference.comments}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </section>
  );
}
