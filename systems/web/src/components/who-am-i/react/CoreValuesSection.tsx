import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import cms from '../../../cms.ts';

// eslint-disable-next-line react-refresh/only-export-components
export async function prepareCoreValuesProps(
  values: { brief: string; headline: string; icon: string; name: string }[],
) {
  return Promise.all(
    values.map(async value => {
      await cms.copyAssetToPublicFolder(value.icon);
      return Object.assign(value, {
        icon: `/portfolio/${value.icon}`,
      });
    }),
  );
}

export default function CoreValuesSection({
  heading,
  values,
}: {
  heading: string;
  values: { brief: string; headline: string; icon: string; name: string }[];
}) {
  return (
    <Box component={'section'} title={'Core values'}>
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography component={'p'} variant={'h4'}>
          Core Values
        </Typography>
        <Typography component={'p'} variant={'body1'}>
          {heading}
        </Typography>
      </Box>
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
          {values.map(value => {
            return (
              <Card
                component={'li'}
                key={value.name}
                sx={{
                  maxWidth: '100vw',
                  width: {
                    lg: '24rem',
                    xs: '100vw',
                  },
                }}
                tabIndex={0}
                title={value.name}
              >
                <Link
                  href={`/portfolio/core-values#${value.name}`}
                  underline="hover"
                >
                  <CardHeader
                    avatar={
                      <Box
                        sx={{
                          backgroundColor: 'action.active',
                          height: 40,
                          maskImage: `url(${value.icon})`,
                          maskPosition: 'center',
                          maskRepeat: 'no-repeat',
                          maskSize: 'cover',
                          width: 40,
                        }}
                      />
                    }
                    component={'header'}
                    subheader={value.headline}
                    title={value.name}
                    titleTypographyProps={{
                      sx: {
                        color: 'text.primary',
                      },
                      variant: 'h5',
                    }}
                  />
                  <CardContent>
                    <Typography
                      component={'p'}
                      sx={{
                        color: 'text.primary',
                      }}
                      variant="body1"
                    >
                      {value.brief}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
