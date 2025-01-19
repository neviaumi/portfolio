import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';

import cms from '../../../cms.ts';

function Star({
  action,
  result,
  situation,
  task,
}: {
  action: string;
  result: string;
  situation: string;
  task: string;
}) {
  return (
    <>
      <Typography component={'h6'} variant={'h6'}>
        Situation
      </Typography>
      <Typography component={'p'} variant={'body1'}>
        {situation}
      </Typography>
      <Typography component={'h6'} variant={'h6'}>
        Task
      </Typography>
      <Typography component={'p'} variant={'body1'}>
        {task}
      </Typography>
      <Typography component={'h6'} variant={'h6'}>
        Action
      </Typography>
      <Typography component={'p'} variant={'body1'}>
        {action}
      </Typography>
      <Typography component={'h6'} variant={'h6'}>
        Result
      </Typography>
      <Typography component={'p'} variant={'body1'}>
        {result}
      </Typography>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function prepareCoreValuesProps(
  values: {
    description: string;
    footer: null | string;
    headline: string;
    icon: string;
    name: string;
    star: {
      action: string;
      result: string;
      situation: string;
      task: string;
    } | null;
  }[],
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

export default function ValueSection({
  value,
  variants,
}: {
  value: {
    description: string;
    footer: null | string;
    headline: string;
    icon: string;
    name: string;
    star: {
      action: string;
      result: string;
      situation: string;
      task: string;
    } | null;
  };
  variants: 'left' | 'right';
}) {
  return (
    <Card
      component={'section'}
      id={value.name}
      sx={{
        marginBottom: 1,
        marginTop: 0.5,
      }}
      title={value.name}
    >
      <Box
        component={'header'}
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: 2,
          justifyContent: variants === 'left' ? 'start' : 'end',
          padding: 2,
          textAlign: variants === 'left' ? 'start' : 'end',
        }}
      >
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
        <Box
          component={'header'}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Typography component={'h1'} variant="h5">
            {value.name}
          </Typography>
          <Typography
            component={'h2'}
            sx={{
              color: 'action.active',
            }}
            variant="body2"
          >
            {value.headline}
          </Typography>
        </Box>
      </Box>
      <CardContent
        sx={{
          textAlign: variants === 'left' ? 'start' : 'end',
        }}
      >
        <Typography component={'p'} variant="body1">
          {value.description}
        </Typography>
        {value.star && (
          <Star
            action={value.star.action}
            result={value.star.result}
            situation={value.star.situation}
            task={value.star.task}
          />
        )}
        {value.footer && (
          <Typography component={'p'} variant="body1">
            {value.footer}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
