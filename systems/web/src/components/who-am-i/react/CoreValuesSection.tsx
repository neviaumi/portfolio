import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import cms from '../../../cms.ts';

// eslint-disable-next-line react-refresh/only-export-components
export async function prepareCoreValuesProps(
  values: { brief: string; icon: string; name: string }[],
) {
  return Promise.all(
    values.map(async value => {
      await cms.copyAssetToPublicFolder(value.icon);
      return value;
    }),
  );
}

export default function CoreValuesSection({
  heading,
  values,
}: {
  heading: string;
  values: { brief: string; icon: string; name: string }[];
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
                <CardHeader
                  avatar={
                    <Box
                      sx={{
                        backgroundColor: 'action.active',
                        height: 40,
                        marginRight: 2,
                        maskImage: `url(${value.icon})`,
                        maskPosition: 'center',
                        maskRepeat: 'no-repeat',
                        maskSize: 'cover',
                        width: 40,
                      }}
                    />
                  }
                  component={'header'}
                  title={value.name}
                  titleTypographyProps={{
                    variant: 'h5',
                  }}
                />
                <CardContent>
                  <Typography component={'p'} variant="body1">
                    {value.brief}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
